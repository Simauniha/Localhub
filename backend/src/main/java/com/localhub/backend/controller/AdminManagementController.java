package com.localhub.backend.controller;

import com.localhub.backend.dto.ListingResponse;
import com.localhub.backend.dto.ListingStatusUpdateRequest;
import com.localhub.backend.dto.PartnerProfileResponse;
import com.localhub.backend.dto.PartnerStatusUpdateRequest;
import com.localhub.backend.dto.UserResponse;
import com.localhub.backend.entity.enums.ListingStatus;
import com.localhub.backend.entity.enums.PartnerStatus;
import com.localhub.backend.repository.UserRepository;
import com.localhub.backend.service.ListingService;
import com.localhub.backend.service.PartnerProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminManagementController {

    private final ListingService listingService;
    private final PartnerProfileService partnerProfileService;
    private final UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userRepository.findAll().stream()
                .map(UserResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/listings")
    public ResponseEntity<List<ListingResponse>> getAllListings(@RequestParam(required = false) ListingStatus status) {
        return ResponseEntity.ok(listingService.getAllListingsForAdmin(status));
    }

    @PatchMapping("/listings/{id}/status")
    public ResponseEntity<ListingResponse> updateListingStatus(
            @PathVariable Long id,
            @Valid @RequestBody ListingStatusUpdateRequest request) {
        return ResponseEntity.ok(listingService.updateListingStatus(id, request.getStatus()));
    }

    @GetMapping("/partners")
    public ResponseEntity<List<PartnerProfileResponse>> getAllPartners(@RequestParam(required = false) PartnerStatus status) {
        return ResponseEntity.ok(partnerProfileService.getAllPartnerProfilesForAdmin(status));
    }

    @PatchMapping("/partners/{id}/status")
    public ResponseEntity<PartnerProfileResponse> updatePartnerStatus(
            @PathVariable Long id,
            @Valid @RequestBody PartnerStatusUpdateRequest request) {
        return ResponseEntity.ok(partnerProfileService.updatePartnerStatus(id, request.getStatus()));
    }
}
