package com.localhub.backend.controller;

import com.localhub.backend.dto.PlaceResponse;
import com.localhub.backend.entity.enums.PlaceCategory;
import com.localhub.backend.entity.enums.PlaceSort;
import com.localhub.backend.service.PlacesService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class PlacesControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @MockitoBean
    private PlacesService placesService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    void testGetNearbyPlacesPublicValid() throws Exception {
        PlaceResponse place = PlaceResponse.builder()
                .providerPlaceId("ext_101")
                .name("Grand Cafe")
                .category(PlaceCategory.CAFE)
                .address("Sector 17, Chandigarh")
                .latitude(30.7333)
                .longitude(76.7794)
                .rating(4.6)
                .distance(350.0)
                .build();

        when(placesService.getNearbyPlaces(eq(30.7046), eq(76.7179), eq(PlaceCategory.CAFE), eq(5000), eq(PlaceSort.DISTANCE)))
                .thenReturn(List.of(place));

        mockMvc.perform(get("/api/v1/places/nearby")
                        .param("latitude", "30.7046")
                        .param("longitude", "76.7179")
                        .param("category", "CAFE")
                        .param("radius", "5000")
                        .param("sort", "DISTANCE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Grand Cafe"))
                .andExpect(jsonPath("$[0].category").value("CAFE"))
                .andExpect(jsonPath("$[0].distance").value(350.0));
    }

    @Test
    void testGetNearbyPlacesInvalidLatitude() throws Exception {
        when(placesService.getNearbyPlaces(eq(150.0), eq(76.7179), any(), any(), any()))
                .thenThrow(new com.localhub.backend.exception.BadRequestException("Latitude must be a valid number between -90 and 90."));

        mockMvc.perform(get("/api/v1/places/nearby")
                        .param("latitude", "150.0")
                        .param("longitude", "76.7179"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Latitude must be a valid number between -90 and 90."));
    }
}
