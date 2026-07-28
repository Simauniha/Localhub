package com.localhub.backend.controller;

import com.localhub.backend.dto.DealRequest;
import com.localhub.backend.dto.DealResponse;
import com.localhub.backend.dto.DealStatusUpdateRequest;
import com.localhub.backend.security.UserPrincipal;
import com.localhub.backend.service.DealService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/deals")
@RequiredArgsConstructor
public class DealController {

    private final DealService dealService;

    @GetMapping
    public ResponseEntity<List<DealResponse>> getActiveDeals(@RequestParam(required = false) Long listingId) {
        return ResponseEntity.ok(dealService.getActiveDeals(listingId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DealResponse> getDealById(@PathVariable Long id) {
        return ResponseEntity.ok(dealService.getDealById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<DealResponse> createDeal(
            @AuthenticationPrincipal Object principal,
            @Valid @RequestBody DealRequest request) {
        Long userId = extractUserId(principal);
        DealResponse response = dealService.createDeal(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<DealResponse> updateDeal(
            @PathVariable Long id,
            @AuthenticationPrincipal Object principal,
            @Valid @RequestBody DealRequest request) {
        Long userId = extractUserId(principal);
        DealResponse response = dealService.updateDeal(id, userId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('PARTNER', 'ADMIN')")
    public ResponseEntity<Void> deleteDeal(
            @PathVariable Long id,
            @AuthenticationPrincipal Object principal) {
        Long userId = extractUserId(principal);
        boolean isAdmin = principal instanceof UserPrincipal up &&
                up.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        dealService.deleteDeal(id, userId, isAdmin);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('PARTNER', 'ADMIN')")
    public ResponseEntity<DealResponse> updateDealStatus(
            @PathVariable Long id,
            @Valid @RequestBody DealStatusUpdateRequest request) {
        return ResponseEntity.ok(dealService.updateDealStatus(id, request.getStatus()));
    }

    private Long extractUserId(Object principal) {
        if (principal instanceof UserPrincipal userPrincipal) {
            return userPrincipal.getId();
        }
        return 1L;
    }
}
