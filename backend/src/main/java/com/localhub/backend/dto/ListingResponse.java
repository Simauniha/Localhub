package com.localhub.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.localhub.backend.entity.enums.ListingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingResponse {

    private Long id;
    private Long partnerId;
    private String partnerBusinessName;
    private Long categoryId;
    private String categoryName;
    private String title;
    private String description;
    private String address;
    private String city;
    private Double latitude;
    private Double longitude;
    private String phone;
    private String websiteUrl;
    private String imageUrl;
    private String openingHours;
    private String priceRange;
    private ListingStatus status;
    private Double averageRating;
    private Integer reviewCount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;
}
