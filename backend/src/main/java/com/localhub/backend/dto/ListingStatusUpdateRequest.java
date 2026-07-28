package com.localhub.backend.dto;

import com.localhub.backend.entity.enums.ListingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingStatusUpdateRequest {

    @NotNull(message = "Listing status is required")
    private ListingStatus status;
}
