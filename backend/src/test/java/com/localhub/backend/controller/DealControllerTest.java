package com.localhub.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.localhub.backend.dto.DealRequest;
import com.localhub.backend.dto.DealResponse;
import com.localhub.backend.entity.enums.DealStatus;
import com.localhub.backend.service.DealService;
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

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class DealControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private DealService dealService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    void testGetActiveDealsPublic() throws Exception {
        DealResponse deal = DealResponse.builder()
                .id(1L)
                .title("20% Off All Pizzas")
                .discountPercentage(20)
                .status(DealStatus.ACTIVE)
                .build();

        when(dealService.getActiveDeals(null)).thenReturn(List.of(deal));

        mockMvc.perform(get("/api/v1/deals"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("20% Off All Pizzas"));
    }

    @Test
    @WithMockUser(roles = "PARTNER")
    void testCreateDealPartner() throws Exception {
        DealRequest request = DealRequest.builder()
                .listingId(10L)
                .title("50% Off Happy Hour")
                .discountPercentage(50)
                .discountAmount(BigDecimal.valueOf(15.00))
                .build();

        DealResponse response = DealResponse.builder()
                .id(2L)
                .title("50% Off Happy Hour")
                .discountPercentage(50)
                .status(DealStatus.ACTIVE)
                .qrCode("QR-DEAL-12345678")
                .build();

        when(dealService.createDeal(any(), any(DealRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/deals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("50% Off Happy Hour"))
                .andExpect(jsonPath("$.qrCode").value("QR-DEAL-12345678"));
    }
}
