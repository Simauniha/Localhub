package com.localhub.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.localhub.backend.dto.ListingRequest;
import com.localhub.backend.dto.ListingResponse;
import com.localhub.backend.entity.enums.ListingStatus;
import com.localhub.backend.service.ListingService;
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

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class ListingControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ListingService listingService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    void testGetApprovedListingsPublic() throws Exception {
        ListingResponse listing = ListingResponse.builder()
                .id(10L)
                .title("Downtown Pizza")
                .city("New York")
                .status(ListingStatus.APPROVED)
                .build();

        when(listingService.getApprovedListings(null, null, null)).thenReturn(List.of(listing));

        mockMvc.perform(get("/api/v1/listings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Downtown Pizza"));
    }

    @Test
    @WithMockUser(roles = "PARTNER")
    void testCreateListingPartner() throws Exception {
        ListingRequest request = ListingRequest.builder()
                .categoryId(1L)
                .title("New Cafe")
                .city("Boston")
                .address("123 Main St")
                .build();

        ListingResponse response = ListingResponse.builder()
                .id(11L)
                .title("New Cafe")
                .city("Boston")
                .status(ListingStatus.PENDING)
                .build();

        when(listingService.createListing(any(), any(ListingRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/listings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("New Cafe"))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }
}
