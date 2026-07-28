package com.localhub.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.localhub.backend.entity.enums.EventStatus;
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
public class EventResponse {

    private Long id;
    private Long listingId;
    private String listingTitle;
    private Long partnerId;
    private String partnerBusinessName;
    private String title;
    private String description;
    private String venue;
    private String city;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime eventDate;

    private Integer totalTickets;
    private Integer availableTickets;
    private BigDecimal ticketPrice;
    private String imageUrl;
    private EventStatus status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
}
