package com.localhub.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyRedemptionRequest {

    @NotBlank(message = "Redemption code or QR code payload is required")
    private String redemptionCode;
}
