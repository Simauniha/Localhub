package com.localhub.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.localhub.backend.dto.ClaimTicketRequest;
import com.localhub.backend.dto.TicketClaimResponse;
import com.localhub.backend.dto.VerifyTicketRequest;
import com.localhub.backend.entity.enums.TicketStatus;
import com.localhub.backend.service.TicketClaimService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class TicketClaimControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TicketClaimService ticketClaimService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    @WithMockUser(roles = "USER")
    void testClaimTicketUser() throws Exception {
        ClaimTicketRequest request = ClaimTicketRequest.builder()
                .eventId(1L)
                .quantity(2)
                .build();

        TicketClaimResponse response = TicketClaimResponse.builder()
                .id(10L)
                .eventId(1L)
                .eventTitle("Summer Concert")
                .ticketCode("TKT-12345678")
                .quantity(2)
                .status(TicketStatus.CONFIRMED)
                .build();

        when(ticketClaimService.claimTicket(any(), any(ClaimTicketRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/tickets/claim")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.ticketCode").value("TKT-12345678"))
                .andExpect(jsonPath("$.quantity").value(2));
    }

    @Test
    @WithMockUser(roles = "PARTNER")
    void testVerifyAndScanTicketPartner() throws Exception {
        VerifyTicketRequest request = VerifyTicketRequest.builder()
                .ticketCode("TKT-12345678")
                .build();

        TicketClaimResponse response = TicketClaimResponse.builder()
                .id(10L)
                .ticketCode("TKT-12345678")
                .status(TicketStatus.USED)
                .build();

        when(ticketClaimService.verifyAndScanTicket(any(), eq(false), any(VerifyTicketRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/v1/tickets/verify")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("USED"));
    }
}
