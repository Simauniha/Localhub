package com.localhub.backend.dto;

import com.localhub.backend.entity.enums.PartnerStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartnerStatusUpdateRequest {

    @NotNull(message = "Partner status is required")
    private PartnerStatus status;
}
