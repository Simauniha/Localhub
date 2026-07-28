package com.localhub.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.localhub.backend.dto.RedemptionResponse;
import com.localhub.backend.dto.VerifyRedemptionRequest;
import com.localhub.backend.entity.enums.RedemptionStatus;
import com.localhub.backend.service.DealRedemptionService;
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
class DealRedemptionControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private DealRedemptionService dealRedemptionService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    @WithMockUser(roles = "USER")
    void testClaimDealUser() throws Exception {
        RedemptionResponse response = RedemptionResponse.builder()
                .id(100L)
                .dealId(1L)
                .dealTitle("Buy 1 Get 1 Free")
                .redemptionCode("RED-ABCDEF12")
                .status(RedemptionStatus.CLAIMED)
                .build();

        when(dealRedemptionService.claimDeal(any(), eq(1L))).thenReturn(response);

        mockMvc.perform(post("/api/v1/redemptions/claim/1"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.redemptionCode").value("RED-ABCDEF12"))
                .andExpect(jsonPath("$.status").value("CLAIMED"));
    }

    @Test
    @WithMockUser(roles = "PARTNER")
    void testVerifyAndCompleteRedemptionPartner() throws Exception {
        VerifyRedemptionRequest request = VerifyRedemptionRequest.builder()
                .redemptionCode("RED-ABCDEF12")
                .build();

        RedemptionResponse response = RedemptionResponse.builder()
                .id(100L)
                .dealId(1L)
                .redemptionCode("RED-ABCDEF12")
                .status(RedemptionStatus.REDEEMED)
                .build();

        when(dealRedemptionService.verifyAndCompleteRedemption(any(), eq(false), any(VerifyRedemptionRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/v1/redemptions/verify")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("REDEEMED"));
    }
}
