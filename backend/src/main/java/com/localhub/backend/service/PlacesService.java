package com.localhub.backend.service;

import com.localhub.backend.dto.PlaceResponse;
import com.localhub.backend.entity.enums.PlaceCategory;
import com.localhub.backend.entity.enums.PlaceSort;

import java.util.List;

public interface PlacesService {

    List<PlaceResponse> getNearbyPlaces(
            Double latitude,
            Double longitude,
            PlaceCategory category,
            Integer radius,
            PlaceSort sort
    );
}
