package com.localhub.backend.controller;

import com.localhub.backend.dto.RedemptionResponse;
import com.localhub.backend.dto.VerifyRedemptionRequest;
import com.localhub.backend.security.UserPrincipal;
import com.localhub.backend.service.DealRedemptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/redemptions")
@RequiredArgsConstructor
public class DealRedemptionController {

    private final DealRedemptionService dealRedemptionService;

    @PostMapping("/claim/{dealId}")
    @PreAuthorize("hasAnyRole('USER', 'PARTNER', 'ADMIN')")
    public ResponseEntity<RedemptionResponse> claimDeal(
            @AuthenticationPrincipal Object principal,
            @PathVariable Long dealId) {
        Long userId = extractUserId(principal);
        RedemptionResponse response = dealRedemptionService.claimDeal(userId, dealId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/my-history")
    @PreAuthorize("hasAnyRole('USER', 'PARTNER', 'ADMIN')")
    public ResponseEntity<List<RedemptionResponse>> getMyRedemptions(@AuthenticationPrincipal Object principal) {
        Long userId = extractUserId(principal);
        return ResponseEntity.ok(dealRedemptionService.getUserRedemptions(userId));
    }

    @GetMapping("/partner-history")
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<List<RedemptionResponse>> getPartnerRedemptions(@AuthenticationPrincipal Object principal) {
        Long userId = extractUserId(principal);
        return ResponseEntity.ok(dealRedemptionService.getPartnerRedemptions(userId));
    }

    @PostMapping("/verify")
    @PreAuthorize("hasAnyRole('PARTNER', 'ADMIN')")
    public ResponseEntity<RedemptionResponse> verifyAndCompleteRedemption(
            @AuthenticationPrincipal Object principal,
            @Valid @RequestBody VerifyRedemptionRequest request) {
        Long userId = extractUserId(principal);
        boolean isAdmin = principal instanceof UserPrincipal up &&
                up.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        RedemptionResponse response = dealRedemptionService.verifyAndCompleteRedemption(userId, isAdmin, request);
        return ResponseEntity.ok(response);
    }

    private Long extractUserId(Object principal) {
        if (principal instanceof UserPrincipal userPrincipal) {
            return userPrincipal.getId();
        }
        return 1L;
    }
}
