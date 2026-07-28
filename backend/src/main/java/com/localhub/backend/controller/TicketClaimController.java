package com.localhub.backend.controller;

import com.localhub.backend.dto.ClaimTicketRequest;
import com.localhub.backend.dto.TicketClaimResponse;
import com.localhub.backend.dto.VerifyTicketRequest;
import com.localhub.backend.security.UserPrincipal;
import com.localhub.backend.service.TicketClaimService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tickets")
@RequiredArgsConstructor
public class TicketClaimController {

    private final TicketClaimService ticketClaimService;

    @PostMapping("/claim")
    @PreAuthorize("hasAnyRole('USER', 'PARTNER', 'ADMIN')")
    public ResponseEntity<TicketClaimResponse> claimTicket(
            @AuthenticationPrincipal Object principal,
            @Valid @RequestBody ClaimTicketRequest request) {
        Long userId = extractUserId(principal);
        TicketClaimResponse response = ticketClaimService.claimTicket(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/my-tickets")
    @PreAuthorize("hasAnyRole('USER', 'PARTNER', 'ADMIN')")
    public ResponseEntity<List<TicketClaimResponse>> getMyTickets(@AuthenticationPrincipal Object principal) {
        Long userId = extractUserId(principal);
        return ResponseEntity.ok(ticketClaimService.getUserTickets(userId));
    }

    @GetMapping("/event/{eventId}")
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<List<TicketClaimResponse>> getPartnerEventTickets(
            @AuthenticationPrincipal Object principal,
            @PathVariable Long eventId) {
        Long userId = extractUserId(principal);
        return ResponseEntity.ok(ticketClaimService.getPartnerEventTickets(userId, eventId));
    }

    @PostMapping("/verify")
    @PreAuthorize("hasAnyRole('PARTNER', 'ADMIN')")
    public ResponseEntity<TicketClaimResponse> verifyAndScanTicket(
            @AuthenticationPrincipal Object principal,
            @Valid @RequestBody VerifyTicketRequest request) {
        Long userId = extractUserId(principal);
        boolean isAdmin = principal instanceof UserPrincipal up &&
                up.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        TicketClaimResponse response = ticketClaimService.verifyAndScanTicket(userId, isAdmin, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('USER', 'PARTNER', 'ADMIN')")
    public ResponseEntity<TicketClaimResponse> cancelTicket(
            @AuthenticationPrincipal Object principal,
            @PathVariable Long id) {
        Long userId = extractUserId(principal);
        TicketClaimResponse response = ticketClaimService.cancelTicket(userId, id);
        return ResponseEntity.ok(response);
    }

    private Long extractUserId(Object principal) {
        if (principal instanceof UserPrincipal userPrincipal) {
            return userPrincipal.getId();
        }
        return 1L;
    }
}
