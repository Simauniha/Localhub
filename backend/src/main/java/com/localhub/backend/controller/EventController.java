package com.localhub.backend.controller;

import com.localhub.backend.dto.EventRequest;
import com.localhub.backend.dto.EventResponse;
import com.localhub.backend.dto.EventStatusUpdateRequest;
import com.localhub.backend.security.UserPrincipal;
import com.localhub.backend.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventResponse>> getUpcomingEvents(
            @RequestParam(required = false) Long listingId,
            @RequestParam(required = false) String city) {
        return ResponseEntity.ok(eventService.getUpcomingEvents(listingId, city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<EventResponse> createEvent(
            @AuthenticationPrincipal Object principal,
            @Valid @RequestBody EventRequest request) {
        Long userId = extractUserId(principal);
        EventResponse response = eventService.createEvent(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PARTNER')")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Long id,
            @AuthenticationPrincipal Object principal,
            @Valid @RequestBody EventRequest request) {
        Long userId = extractUserId(principal);
        EventResponse response = eventService.updateEvent(id, userId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('PARTNER', 'ADMIN')")
    public ResponseEntity<Void> deleteEvent(
            @PathVariable Long id,
            @AuthenticationPrincipal Object principal) {
        Long userId = extractUserId(principal);
        boolean isAdmin = principal instanceof UserPrincipal up &&
                up.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        eventService.deleteEvent(id, userId, isAdmin);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('PARTNER', 'ADMIN')")
    public ResponseEntity<EventResponse> updateEventStatus(
            @PathVariable Long id,
            @Valid @RequestBody EventStatusUpdateRequest request) {
        return ResponseEntity.ok(eventService.updateEventStatus(id, request.getStatus()));
    }

    private Long extractUserId(Object principal) {
        if (principal instanceof UserPrincipal userPrincipal) {
            return userPrincipal.getId();
        }
        return 1L;
    }
}
