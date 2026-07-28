package com.localhub.backend.controller;

import com.localhub.backend.dto.ListingRequest;
import com.localhub.backend.dto.ListingResponse;
import com.localhub.backend.security.UserPrincipal;
import com.localhub.backend.service.ListingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @GetMapping
    public ResponseEntity<List<ListingResponse>> getApprovedListings(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(listingService.getApprovedListings(categoryId, city, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingResponse> getListingById(@PathVariable Long id) {
        return ResponseEntity.ok(listingService.getListingById(id));
    }

    @GetMapping("/my-listings")
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<List<ListingResponse>> getMyListings(@AuthenticationPrincipal Object principal) {
        Long userId = extractUserId(principal);
        return ResponseEntity.ok(listingService.getListingsByPartnerUserId(userId));
    }

    @PostMapping
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<ListingResponse> createListing(
            @AuthenticationPrincipal Object principal,
            @Valid @RequestBody ListingRequest request) {
        Long userId = extractUserId(principal);
        ListingResponse response = listingService.createListing(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<ListingResponse> updateListing(
            @PathVariable Long id,
            @AuthenticationPrincipal Object principal,
            @Valid @RequestBody ListingRequest request) {
        Long userId = extractUserId(principal);
        ListingResponse response = listingService.updateListing(id, userId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('PARTNER', 'ADMIN')")
    public ResponseEntity<Void> deleteListing(
            @PathVariable Long id,
            @AuthenticationPrincipal Object principal) {
        Long userId = extractUserId(principal);
        boolean isAdmin = principal instanceof UserPrincipal up &&
                up.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        listingService.deleteListing(id, userId, isAdmin);
        return ResponseEntity.noContent().build();
    }

    private Long extractUserId(Object principal) {
        if (principal instanceof UserPrincipal userPrincipal) {
            return userPrincipal.getId();
        }
        return 1L;
    }
}
