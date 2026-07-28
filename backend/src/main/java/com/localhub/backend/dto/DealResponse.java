package com.localhub.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.localhub.backend.entity.enums.DealStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealResponse {

    private Long id;
    private Long listingId;
    private String listingTitle;
    private Long partnerId;
    private String partnerBusinessName;
    private String title;
    private String description;
    private Integer discountPercentage;
    private BigDecimal discountAmount;
    private String promoCode;
    private String termsAndConditions;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;

    private DealStatus status;
    private String qrCode;
    private Integer redemptionCount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
}
