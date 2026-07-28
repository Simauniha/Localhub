package com.localhub.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.localhub.backend.dto.PartnerProfileRequest;
import com.localhub.backend.dto.PartnerProfileResponse;
import com.localhub.backend.entity.enums.PartnerStatus;
import com.localhub.backend.service.PartnerProfileService;
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
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class PartnerProfileControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private PartnerProfileService partnerProfileService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    @WithMockUser(roles = "PARTNER")
    void testCreateOrUpdatePartnerProfile() throws Exception {
        PartnerProfileRequest request = PartnerProfileRequest.builder()
                .businessName("Acme Co")
                .businessType("Restaurant")
                .city("Chicago")
                .build();

        PartnerProfileResponse response = PartnerProfileResponse.builder()
                .id(1L)
                .businessName("Acme Co")
                .businessType("Restaurant")
                .city("Chicago")
                .status(PartnerStatus.PENDING)
                .build();

        when(partnerProfileService.createOrUpdatePartnerProfile(any(), any(PartnerProfileRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/v1/partners/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.businessName").value("Acme Co"))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testPartnerEndpointForbiddenForUser() throws Exception {
        mockMvc.perform(get("/api/v1/partners/me"))
                .andExpect(status().isForbidden());
    }
}
