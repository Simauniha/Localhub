package com.localhub.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.localhub.backend.entity.enums.PartnerStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartnerProfileResponse {

    private Long id;
    private Long userId;
    private String userEmail;
    private String businessName;
    private String businessType;
    private String contactEmail;
    private String contactPhone;
    private String address;
    private String city;
    private PartnerStatus status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;
}
