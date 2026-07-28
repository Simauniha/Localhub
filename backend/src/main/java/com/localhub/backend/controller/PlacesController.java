package com.localhub.backend.controller;

import com.localhub.backend.dto.PlaceResponse;
import com.localhub.backend.entity.enums.PlaceCategory;
import com.localhub.backend.entity.enums.PlaceSort;
import com.localhub.backend.service.PlacesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/places")
@RequiredArgsConstructor
public class PlacesController {

    private final PlacesService placesService;

    @GetMapping("/nearby")
    public ResponseEntity<List<PlaceResponse>> getNearbyPlaces(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(required = false) PlaceCategory category,
            @RequestParam(required = false) Integer radius,
            @RequestParam(required = false) PlaceSort sort) {

        List<PlaceResponse> places = placesService.getNearbyPlaces(latitude, longitude, category, radius, sort);
        return ResponseEntity.ok(places);
    }
}
