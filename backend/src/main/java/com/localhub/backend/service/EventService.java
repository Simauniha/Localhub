package com.localhub.backend.service;

import com.localhub.backend.dto.EventRequest;
import com.localhub.backend.dto.EventResponse;
import com.localhub.backend.entity.enums.EventStatus;

import java.util.List;

public interface EventService {

    List<EventResponse> getUpcomingEvents(Long listingId, String city);

    EventResponse getEventById(Long id);

    EventResponse createEvent(Long partnerUserId, EventRequest request);

    EventResponse updateEvent(Long id, Long partnerUserId, EventRequest request);

    void deleteEvent(Long id, Long partnerUserId, boolean isAdmin);

    List<EventResponse> getAllEventsForAdmin(EventStatus status);

    EventResponse updateEventStatus(Long id, EventStatus status);
}
