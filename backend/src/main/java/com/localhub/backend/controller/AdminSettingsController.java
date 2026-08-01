package com.localhub.backend.controller;

import com.localhub.backend.entity.AppSetting;
import com.localhub.backend.repository.AppSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/settings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminSettingsController {

    private final AppSettingRepository appSettingRepository;

    @GetMapping
    public ResponseEntity<Map<String, String>> getSettings() {
        Map<String, String> settingsMap = new HashMap<>();
        appSettingRepository.findAll().forEach(s -> settingsMap.put(s.getKey(), s.getValue()));

        settingsMap.putIfAbsent("google_places_api_key", "");
        settingsMap.putIfAbsent("search_radius", "5000");

        return ResponseEntity.ok(settingsMap);
    }

    @PutMapping
    public ResponseEntity<Map<String, String>> updateSettings(@RequestBody Map<String, String> settings) {
        if (settings != null) {
            settings.forEach((key, value) -> {
                AppSetting setting = appSettingRepository.findByKey(key)
                        .orElseGet(() -> AppSetting.builder().key(key).build());
                setting.setValue(value != null ? value : "");
                appSettingRepository.save(setting);
            });
        }
        return getSettings();
    }

    @PostMapping("/test-google-places")
    public ResponseEntity<Map<String, Object>> testGooglePlacesConnection(@RequestBody(required = false) Map<String, String> body) {
        Map<String, Object> result = new HashMap<>();
        String apiKey = null;

        if (body != null && body.containsKey("google_places_api_key")) {
            apiKey = body.get("google_places_api_key");
        }
        if (apiKey == null || apiKey.isBlank()) {
            apiKey = appSettingRepository.findByKey("google_places_api_key")
                    .map(AppSetting::getValue)
                    .orElse("");
        }

        if (apiKey.isBlank()) {
            result.put("success", false);
            result.put("message", "Google Places API Key is empty.");
            return ResponseEntity.ok(result);
        }

        try {
            HttpClient client = HttpClient.newBuilder()
                    .connectTimeout(Duration.ofSeconds(5))
                    .build();
            String testUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurant&inputtype=textquery&key=" + apiKey;
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(testUrl))
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();

            if (response.statusCode() == 200 && (responseBody.contains("\"status\" : \"OK\"") || responseBody.contains("\"status\" : \"ZERO_RESULTS\""))) {
                result.put("success", true);
                result.put("message", "Connection successful! Google Places API Key is valid.");
            } else if (responseBody.contains("REQUEST_DENIED") || responseBody.contains("API_KEY_INVALID") || responseBody.contains("INVALID_REQUEST")) {
                result.put("success", false);
                result.put("message", "API Key Rejected by Google: " + extractGoogleErrorMessage(responseBody));
            } else {
                result.put("success", false);
                result.put("message", "Google response: " + extractGoogleErrorMessage(responseBody));
            }
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Failed to connect to Google Places API: " + e.getMessage());
        }

        return ResponseEntity.ok(result);
    }

    private String extractGoogleErrorMessage(String body) {
        if (body != null && body.contains("error_message")) {
            int start = body.indexOf("\"error_message\" : \"") + 18;
            int end = body.indexOf("\"", start);
            if (start > 17 && end > start) {
                return body.substring(start, end);
            }
        }
        return "Invalid API Key or unauthorized request.";
    }
}
