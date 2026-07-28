package com.localhub.backend.service.impl;

import com.localhub.backend.dto.RedemptionResponse;
import com.localhub.backend.dto.VerifyRedemptionRequest;
import com.localhub.backend.entity.Deal;
import com.localhub.backend.entity.DealRedemption;
import com.localhub.backend.entity.PartnerProfile;
import com.localhub.backend.entity.User;
import com.localhub.backend.entity.enums.DealStatus;
import com.localhub.backend.entity.enums.RedemptionStatus;
import com.localhub.backend.exception.BadRequestException;
import com.localhub.backend.exception.ForbiddenException;
import com.localhub.backend.exception.ResourceNotFoundException;
import com.localhub.backend.repository.DealRedemptionRepository;
import com.localhub.backend.repository.DealRepository;
import com.localhub.backend.repository.PartnerProfileRepository;
import com.localhub.backend.repository.UserRepository;
import com.localhub.backend.service.DealRedemptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DealRedemptionServiceImpl implements DealRedemptionService {

    private final DealRedemptionRepository dealRedemptionRepository;
    private final DealRepository dealRepository;
    private final UserRepository userRepository;
    private final PartnerProfileRepository partnerProfileRepository;

    @Override
    @Transactional
    public RedemptionResponse claimDeal(Long userId, Long dealId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new ResourceNotFoundException("Deal not found with id: " + dealId));

        if (deal.getStatus() != DealStatus.ACTIVE) {
            throw new BadRequestException("This deal is not active.");
        }

        if (deal.getEndDate() != null && deal.getEndDate().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("This deal has expired.");
        }

        String redemptionCode = "RED-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        DealRedemption redemption = DealRedemption.builder()
                .deal(deal)
                .user(user)
                .redemptionCode(redemptionCode)
                .status(RedemptionStatus.CLAIMED)
                .build();

        DealRedemption savedRedemption = dealRedemptionRepository.save(redemption);
        return mapToResponse(savedRedemption);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RedemptionResponse> getUserRedemptions(Long userId) {
        return dealRedemptionRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<RedemptionResponse> getPartnerRedemptions(Long partnerUserId) {
        PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Partner profile not found for user id: " + partnerUserId));

        return dealRedemptionRepository.findAll().stream()
                .filter(r -> r.getDeal().getListing().getPartner() != null &&
                        r.getDeal().getListing().getPartner().getId().equals(partner.getId()))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RedemptionResponse verifyAndCompleteRedemption(Long partnerUserId, boolean isAdmin, VerifyRedemptionRequest request) {
        DealRedemption redemption = dealRedemptionRepository.findByRedemptionCode(request.getRedemptionCode())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid redemption code: " + request.getRedemptionCode()));

        if (redemption.getStatus() == RedemptionStatus.REDEEMED) {
            throw new BadRequestException("This redemption code has already been used.");
        }

        if (redemption.getStatus() == RedemptionStatus.EXPIRED) {
            throw new BadRequestException("This redemption code has expired.");
        }

        if (!isAdmin) {
            PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                    .orElseThrow(() -> new ForbiddenException("You are not authorized to verify this deal."));

            Deal deal = redemption.getDeal();
            if (!deal.getListing().getPartner().getId().equals(partner.getId())) {
                throw new ForbiddenException("This redemption code does not belong to your business listing.");
            }
        }

        redemption.setStatus(RedemptionStatus.REDEEMED);
        redemption.setRedeemedAt(LocalDateTime.now());

        Deal deal = redemption.getDeal();
        deal.setRedemptionCount(deal.getRedemptionCount() + 1);
        dealRepository.save(deal);

        DealRedemption updatedRedemption = dealRedemptionRepository.save(redemption);
        return mapToResponse(updatedRedemption);
    }

    private RedemptionResponse mapToResponse(DealRedemption redemption) {
        return RedemptionResponse.builder()
                .id(redemption.getId())
                .dealId(redemption.getDeal().getId())
                .dealTitle(redemption.getDeal().getTitle())
                .listingId(redemption.getDeal().getListing().getId())
                .listingTitle(redemption.getDeal().getListing().getTitle())
                .partnerBusinessName(redemption.getDeal().getListing().getPartner() != null ?
                        redemption.getDeal().getListing().getPartner().getBusinessName() : null)
                .userId(redemption.getUser().getId())
                .userEmail(redemption.getUser().getEmail())
                .redemptionCode(redemption.getRedemptionCode())
                .qrCodePayload(redemption.getDeal().getQrCode())
                .status(redemption.getStatus())
                .redeemedAt(redemption.getRedeemedAt())
                .createdAt(redemption.getCreatedAt())
                .build();
    }
}
