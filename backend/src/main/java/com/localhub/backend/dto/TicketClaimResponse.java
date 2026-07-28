package com.localhub.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.localhub.backend.entity.enums.TicketStatus;
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
public class TicketClaimResponse {

    private Long id;
    private Long eventId;
    private String eventTitle;
    private String venue;
    private String city;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime eventDate;

    private BigDecimal ticketPrice;
    private String partnerBusinessName;
    private Long userId;
    private String userEmail;
    private String ticketCode;
    private String qrCodeData;
    private Integer quantity;
    private TicketStatus status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime claimedAt;
}
