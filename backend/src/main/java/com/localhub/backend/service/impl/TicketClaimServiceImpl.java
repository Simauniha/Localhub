package com.localhub.backend.service.impl;

import com.localhub.backend.dto.ClaimTicketRequest;
import com.localhub.backend.dto.TicketClaimResponse;
import com.localhub.backend.dto.VerifyTicketRequest;
import com.localhub.backend.entity.Event;
import com.localhub.backend.entity.PartnerProfile;
import com.localhub.backend.entity.TicketClaim;
import com.localhub.backend.entity.User;
import com.localhub.backend.entity.enums.EventStatus;
import com.localhub.backend.entity.enums.TicketStatus;
import com.localhub.backend.exception.BadRequestException;
import com.localhub.backend.exception.ForbiddenException;
import com.localhub.backend.exception.ResourceNotFoundException;
import com.localhub.backend.repository.EventRepository;
import com.localhub.backend.repository.PartnerProfileRepository;
import com.localhub.backend.repository.TicketClaimRepository;
import com.localhub.backend.repository.UserRepository;
import com.localhub.backend.service.TicketClaimService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketClaimServiceImpl implements TicketClaimService {

    private final TicketClaimRepository ticketClaimRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final PartnerProfileRepository partnerProfileRepository;

    @Override
    @Transactional
    public synchronized TicketClaimResponse claimTicket(Long userId, ClaimTicketRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + request.getEventId()));

        if (event.getStatus() != EventStatus.UPCOMING && event.getStatus() != EventStatus.ONGOING) {
            throw new BadRequestException("Tickets cannot be claimed for an event that is not active.");
        }

        if (event.getEventDate() != null && event.getEventDate().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("This event has already ended.");
        }

        int requestedQty = request.getQuantity() != null ? request.getQuantity() : 1;
        if (event.getAvailableTickets() < requestedQty) {
            throw new BadRequestException("Only " + event.getAvailableTickets() + " tickets available for this event.");
        }

        event.setAvailableTickets(event.getAvailableTickets() - requestedQty);
        eventRepository.save(event);

        String ticketCode = "TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String qrCodeData = "QR-TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        TicketClaim claim = TicketClaim.builder()
                .event(event)
                .user(user)
                .ticketCode(ticketCode)
                .qrCodeData(qrCodeData)
                .quantity(requestedQty)
                .status(TicketStatus.CONFIRMED)
                .build();

        TicketClaim savedClaim = ticketClaimRepository.save(claim);
        return mapToResponse(savedClaim);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TicketClaimResponse> getUserTickets(Long userId) {
        return ticketClaimRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TicketClaimResponse> getPartnerEventTickets(Long partnerUserId, Long eventId) {
        PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Partner profile not found for user id: " + partnerUserId));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (event.getListing() != null && !event.getListing().getPartner().getId().equals(partner.getId())) {
            throw new ForbiddenException("You are not authorized to view tickets for this event.");
        }

        return ticketClaimRepository.findByEventId(eventId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public TicketClaimResponse verifyAndScanTicket(Long partnerUserId, boolean isAdmin, VerifyTicketRequest request) {
        TicketClaim claim = ticketClaimRepository.findByTicketCode(request.getTicketCode())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid ticket code: " + request.getTicketCode()));

        if (claim.getStatus() == TicketStatus.USED) {
            throw new BadRequestException("This ticket has already been scanned/used.");
        }

        if (claim.getStatus() == TicketStatus.CANCELLED) {
            throw new BadRequestException("This ticket was cancelled.");
        }

        if (!isAdmin) {
            PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                    .orElseThrow(() -> new ForbiddenException("You are not authorized to verify this ticket."));

            Event event = claim.getEvent();
            if (event.getListing() != null && !event.getListing().getPartner().getId().equals(partner.getId())) {
                throw new ForbiddenException("This ticket does not belong to your business event.");
            }
        }

        claim.setStatus(TicketStatus.USED);
        TicketClaim updatedClaim = ticketClaimRepository.save(claim);
        return mapToResponse(updatedClaim);
    }

    @Override
    @Transactional
    public synchronized TicketClaimResponse cancelTicket(Long userId, Long ticketClaimId) {
        TicketClaim claim = ticketClaimRepository.findById(ticketClaimId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket claim not found with id: " + ticketClaimId));

        if (!claim.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You are not authorized to cancel this ticket.");
        }

        if (claim.getStatus() == TicketStatus.CANCELLED) {
            throw new BadRequestException("This ticket has already been cancelled.");
        }

        if (claim.getStatus() == TicketStatus.USED) {
            throw new BadRequestException("Used tickets cannot be cancelled.");
        }

        claim.setStatus(TicketStatus.CANCELLED);

        Event event = claim.getEvent();
        event.setAvailableTickets(event.getAvailableTickets() + claim.getQuantity());
        eventRepository.save(event);

        TicketClaim updatedClaim = ticketClaimRepository.save(claim);
        return mapToResponse(updatedClaim);
    }

    private TicketClaimResponse mapToResponse(TicketClaim claim) {
        return TicketClaimResponse.builder()
                .id(claim.getId())
                .eventId(claim.getEvent().getId())
                .eventTitle(claim.getEvent().getTitle())
                .venue(claim.getEvent().getVenue())
                .city(claim.getEvent().getCity())
                .eventDate(claim.getEvent().getEventDate())
                .ticketPrice(claim.getEvent().getTicketPrice())
                .partnerBusinessName(claim.getEvent().getListing() != null && claim.getEvent().getListing().getPartner() != null ?
                        claim.getEvent().getListing().getPartner().getBusinessName() : null)
                .userId(claim.getUser().getId())
                .userEmail(claim.getUser().getEmail())
                .ticketCode(claim.getTicketCode())
                .qrCodeData(claim.getQrCodeData())
                .quantity(claim.getQuantity())
                .status(claim.getStatus())
                .claimedAt(claim.getClaimedAt())
                .build();
    }
}
