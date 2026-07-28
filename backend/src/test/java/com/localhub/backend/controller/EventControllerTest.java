package com.localhub.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.localhub.backend.dto.EventRequest;
import com.localhub.backend.dto.EventResponse;
import com.localhub.backend.entity.enums.EventStatus;
import com.localhub.backend.service.EventService;
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
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class EventControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private EventService eventService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    void testGetUpcomingEventsPublic() throws Exception {
        EventResponse event = EventResponse.builder()
                .id(1L)
                .title("Summer Music Festival")
                .city("Chicago")
                .totalTickets(100)
                .availableTickets(80)
                .status(EventStatus.UPCOMING)
                .build();

        when(eventService.getUpcomingEvents(null, null)).thenReturn(List.of(event));

        mockMvc.perform(get("/api/v1/events"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Summer Music Festival"))
                .andExpect(jsonPath("$[0].availableTickets").value(80));
    }

    @Test
    @WithMockUser(roles = "PARTNER")
    void testCreateEventPartner() throws Exception {
        EventRequest request = EventRequest.builder()
                .title("Tech Workshop")
                .city("New York")
                .eventDate(LocalDateTime.now().plusDays(10))
                .totalTickets(50)
                .ticketPrice(BigDecimal.valueOf(25.00))
                .build();

        EventResponse response = EventResponse.builder()
                .id(2L)
                .title("Tech Workshop")
                .totalTickets(50)
                .availableTickets(50)
                .status(EventStatus.UPCOMING)
                .build();

        when(eventService.createEvent(any(), any(EventRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Tech Workshop"))
                .andExpect(jsonPath("$.availableTickets").value(50));
    }
}
