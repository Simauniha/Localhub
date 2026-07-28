package com.localhub.backend.controller;

import com.localhub.backend.dto.PartnerProfileRequest;
import com.localhub.backend.dto.PartnerProfileResponse;
import com.localhub.backend.security.UserPrincipal;
import com.localhub.backend.service.PartnerProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/partners")
@RequiredArgsConstructor
public class PartnerProfileController {

    private final PartnerProfileService partnerProfileService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<PartnerProfileResponse> getMyPartnerProfile(@AuthenticationPrincipal Object principal) {
        Long userId = extractUserId(principal);
        return ResponseEntity.ok(partnerProfileService.getPartnerProfileByUserId(userId));
    }

    @PostMapping("/me")
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<PartnerProfileResponse> createOrUpdatePartnerProfile(
            @AuthenticationPrincipal Object principal,
            @Valid @RequestBody PartnerProfileRequest request) {
        Long userId = extractUserId(principal);
        PartnerProfileResponse response = partnerProfileService.createOrUpdatePartnerProfile(userId, request);
        return ResponseEntity.ok(response);
    }

    private Long extractUserId(Object principal) {
        if (principal instanceof UserPrincipal userPrincipal) {
            return userPrincipal.getId();
        }
        return 1L;
    }
}
