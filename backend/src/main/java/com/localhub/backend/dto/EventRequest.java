package com.localhub.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class EventRequest {

    private Long listingId;

    @NotBlank(message = "Event title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    private String description;

    @Size(max = 255, message = "Venue must not exceed 255 characters")
    private String venue;

    @Size(max = 100, message = "City must not exceed 100 characters")
    private String city;

    @NotNull(message = "Event date is required")
    private LocalDateTime eventDate;

    @NotNull(message = "Total tickets count is required")
    @Min(value = 1, message = "Total tickets must be at least 1")
    private Integer totalTickets;

    private BigDecimal ticketPrice;

    private String imageUrl;
}
