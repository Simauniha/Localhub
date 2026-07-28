package com.localhub.backend.service;

import com.localhub.backend.dto.ClaimTicketRequest;
import com.localhub.backend.dto.TicketClaimResponse;
import com.localhub.backend.dto.VerifyTicketRequest;

import java.util.List;

public interface TicketClaimService {

    TicketClaimResponse claimTicket(Long userId, ClaimTicketRequest request);

    List<TicketClaimResponse> getUserTickets(Long userId);

    List<TicketClaimResponse> getPartnerEventTickets(Long partnerUserId, Long eventId);

    TicketClaimResponse verifyAndScanTicket(Long partnerUserId, boolean isAdmin, VerifyTicketRequest request);

    TicketClaimResponse cancelTicket(Long userId, Long ticketClaimId);
}
