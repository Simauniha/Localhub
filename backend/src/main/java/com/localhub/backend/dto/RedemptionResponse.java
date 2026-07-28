package com.localhub.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.localhub.backend.entity.enums.RedemptionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RedemptionResponse {

    private Long id;
    private Long dealId;
    private String dealTitle;
    private Long listingId;
    private String listingTitle;
    private String partnerBusinessName;
    private Long userId;
    private String userEmail;
    private String redemptionCode;
    private String qrCodePayload;
    private RedemptionStatus status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime redeemedAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
}
