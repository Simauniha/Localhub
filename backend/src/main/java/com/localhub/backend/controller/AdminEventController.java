package com.localhub.backend.controller;

import com.localhub.backend.dto.EventResponse;
import com.localhub.backend.dto.EventStatusUpdateRequest;
import com.localhub.backend.entity.enums.EventStatus;
import com.localhub.backend.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/events")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminEventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents(@RequestParam(required = false) EventStatus status) {
        return ResponseEntity.ok(eventService.getAllEventsForAdmin(status));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<EventResponse> updateEventStatus(
            @PathVariable Long id,
            @Valid @RequestBody EventStatusUpdateRequest request) {
        return ResponseEntity.ok(eventService.updateEventStatus(id, request.getStatus()));
    }
}
