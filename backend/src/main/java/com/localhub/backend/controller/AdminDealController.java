package com.localhub.backend.controller;

import com.localhub.backend.dto.DealResponse;
import com.localhub.backend.dto.DealStatusUpdateRequest;
import com.localhub.backend.entity.enums.DealStatus;
import com.localhub.backend.service.DealService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/deals")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminDealController {

    private final DealService dealService;

    @GetMapping
    public ResponseEntity<List<DealResponse>> getAllDeals(@RequestParam(required = false) DealStatus status) {
        return ResponseEntity.ok(dealService.getAllDealsForAdmin(status));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<DealResponse> updateDealStatus(
            @PathVariable Long id,
            @Valid @RequestBody DealStatusUpdateRequest request) {
        return ResponseEntity.ok(dealService.updateDealStatus(id, request.getStatus()));
    }
}
