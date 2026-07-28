package com.localhub.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class TestProtectedController {

    @GetMapping("/user/test")
    @PreAuthorize("hasAnyRole('USER', 'PARTNER', 'ADMIN')")
    public ResponseEntity<Map<String, String>> userEndpoint() {
        return ResponseEntity.ok(Map.of("message", "User endpoint accessed successfully"));
    }

    @GetMapping("/partner/test")
    @PreAuthorize("hasAnyRole('PARTNER', 'ADMIN')")
    public ResponseEntity<Map<String, String>> partnerEndpoint() {
        return ResponseEntity.ok(Map.of("message", "Partner endpoint accessed successfully"));
    }

    @GetMapping("/admin/test")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> adminEndpoint() {
        return ResponseEntity.ok(Map.of("message", "Admin endpoint accessed successfully"));
    }
}
