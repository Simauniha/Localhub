package com.localhub.backend.dto;

import com.localhub.backend.entity.enums.EventStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventStatusUpdateRequest {

    @NotNull(message = "Event status is required")
    private EventStatus status;
}
