package com.localhub.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClaimTicketRequest {

    @NotNull(message = "Event ID is required")
    private Long eventId;

    @Builder.Default
    @Min(value = 1, message = "Ticket quantity must be at least 1")
    private Integer quantity = 1;
}
