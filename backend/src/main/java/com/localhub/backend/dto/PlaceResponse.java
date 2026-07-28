package com.localhub.backend.dto;

import com.localhub.backend.entity.enums.PlaceCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceResponse {

    private String providerPlaceId;
    private String name;
    private PlaceCategory category;
    private String address;
    private Double latitude;
    private Double longitude;
    private Double rating;
    private Integer ratingCount;
    private Integer priceLevel;
    private Double distance;
    private Boolean openNow;
    private String phone;
    private String website;
    private String photoUrl;
    private String mapUrl;
}
