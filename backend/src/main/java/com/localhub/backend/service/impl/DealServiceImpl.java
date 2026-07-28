package com.localhub.backend.service.impl;

import com.localhub.backend.dto.DealRequest;
import com.localhub.backend.dto.DealResponse;
import com.localhub.backend.entity.Deal;
import com.localhub.backend.entity.Listing;
import com.localhub.backend.entity.PartnerProfile;
import com.localhub.backend.entity.enums.DealStatus;
import com.localhub.backend.exception.BadRequestException;
import com.localhub.backend.exception.ForbiddenException;
import com.localhub.backend.exception.ResourceNotFoundException;
import com.localhub.backend.repository.DealRepository;
import com.localhub.backend.repository.ListingRepository;
import com.localhub.backend.repository.PartnerProfileRepository;
import com.localhub.backend.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;
    private final ListingRepository listingRepository;
    private final PartnerProfileRepository partnerProfileRepository;

    @Override
    @Transactional(readOnly = true)
    public List<DealResponse> getActiveDeals(Long listingId) {
        List<Deal> deals;
        if (listingId != null) {
            deals = dealRepository.findByListingIdAndStatus(listingId, DealStatus.ACTIVE);
        } else {
            deals = dealRepository.findByStatus(DealStatus.ACTIVE);
        }
        return deals.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DealResponse getDealById(Long id) {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deal not found with id: " + id));
        return mapToResponse(deal);
    }

    @Override
    @Transactional
    public DealResponse createDeal(Long partnerUserId, DealRequest request) {
        PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                .orElseThrow(() -> new BadRequestException("Partner profile required to create deals."));

        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + request.getListingId()));

        if (!listing.getPartner().getId().equals(partner.getId())) {
            throw new ForbiddenException("You are not authorized to create a deal for this listing.");
        }

        String qrCode = "QR-DEAL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Deal deal = Deal.builder()
                .listing(listing)
                .title(request.getTitle())
                .description(request.getDescription())
                .discountPercentage(request.getDiscountPercentage())
                .discountAmount(request.getDiscountAmount())
                .promoCode(request.getPromoCode())
                .termsAndConditions(request.getTermsAndConditions())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(DealStatus.ACTIVE)
                .qrCode(qrCode)
                .redemptionCount(0)
                .build();

        Deal savedDeal = dealRepository.save(deal);
        return mapToResponse(savedDeal);
    }

    @Override
    @Transactional
    public DealResponse updateDeal(Long id, Long partnerUserId, DealRequest request) {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deal not found with id: " + id));

        PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                .orElseThrow(() -> new ForbiddenException("You are not authorized to edit this deal."));

        if (!deal.getListing().getPartner().getId().equals(partner.getId())) {
            throw new ForbiddenException("You are not authorized to edit this deal.");
        }

        deal.setTitle(request.getTitle());
        deal.setDescription(request.getDescription());
        deal.setDiscountPercentage(request.getDiscountPercentage());
        deal.setDiscountAmount(request.getDiscountAmount());
        deal.setPromoCode(request.getPromoCode());
        deal.setTermsAndConditions(request.getTermsAndConditions());
        deal.setStartDate(request.getStartDate());
        deal.setEndDate(request.getEndDate());

        Deal updatedDeal = dealRepository.save(deal);
        return mapToResponse(updatedDeal);
    }

    @Override
    @Transactional
    public void deleteDeal(Long id, Long partnerUserId, boolean isAdmin) {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deal not found with id: " + id));

        if (!isAdmin) {
            PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                    .orElseThrow(() -> new ForbiddenException("You are not authorized to delete this deal."));

            if (!deal.getListing().getPartner().getId().equals(partner.getId())) {
                throw new ForbiddenException("You are not authorized to delete this deal.");
            }
        }

        dealRepository.delete(deal);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DealResponse> getAllDealsForAdmin(DealStatus status) {
        List<Deal> deals;
        if (status != null) {
            deals = dealRepository.findByStatus(status);
        } else {
            deals = dealRepository.findAll();
        }
        return deals.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DealResponse updateDealStatus(Long id, DealStatus status) {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deal not found with id: " + id));

        deal.setStatus(status);
        Deal updatedDeal = dealRepository.save(deal);
        return mapToResponse(updatedDeal);
    }

    private DealResponse mapToResponse(Deal deal) {
        return DealResponse.builder()
                .id(deal.getId())
                .listingId(deal.getListing().getId())
                .listingTitle(deal.getListing().getTitle())
                .partnerId(deal.getListing().getPartner() != null ? deal.getListing().getPartner().getId() : null)
                .partnerBusinessName(deal.getListing().getPartner() != null ? deal.getListing().getPartner().getBusinessName() : null)
                .title(deal.getTitle())
                .description(deal.getDescription())
                .discountPercentage(deal.getDiscountPercentage())
                .discountAmount(deal.getDiscountAmount())
                .promoCode(deal.getPromoCode())
                .termsAndConditions(deal.getTermsAndConditions())
                .startDate(deal.getStartDate())
                .endDate(deal.getEndDate())
                .status(deal.getStatus())
                .qrCode(deal.getQrCode())
                .redemptionCount(deal.getRedemptionCount())
                .createdAt(deal.getCreatedAt())
                .build();
    }
}
