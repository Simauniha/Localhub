package com.localhub.backend.dto;

import com.localhub.backend.entity.enums.DealStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealStatusUpdateRequest {

    @NotNull(message = "Deal status is required")
    private DealStatus status;
}
