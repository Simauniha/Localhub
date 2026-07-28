package com.localhub.backend.service.impl;

import com.localhub.backend.dto.EventRequest;
import com.localhub.backend.dto.EventResponse;
import com.localhub.backend.entity.Event;
import com.localhub.backend.entity.Listing;
import com.localhub.backend.entity.PartnerProfile;
import com.localhub.backend.entity.enums.EventStatus;
import com.localhub.backend.exception.BadRequestException;
import com.localhub.backend.exception.ForbiddenException;
import com.localhub.backend.exception.ResourceNotFoundException;
import com.localhub.backend.repository.EventRepository;
import com.localhub.backend.repository.ListingRepository;
import com.localhub.backend.repository.PartnerProfileRepository;
import com.localhub.backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final ListingRepository listingRepository;
    private final PartnerProfileRepository partnerProfileRepository;

    @Override
    @Transactional(readOnly = true)
    public List<EventResponse> getUpcomingEvents(Long listingId, String city) {
        List<Event> events;
        if (listingId != null) {
            events = eventRepository.findByListingIdAndStatus(listingId, EventStatus.UPCOMING);
        } else {
            events = eventRepository.findByStatus(EventStatus.UPCOMING);
        }

        if (city != null && !city.isBlank()) {
            events = events.stream()
                    .filter(e -> e.getCity() != null && e.getCity().equalsIgnoreCase(city))
                    .collect(Collectors.toList());
        }

        return events.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public EventResponse getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return mapToResponse(event);
    }

    @Override
    @Transactional
    public EventResponse createEvent(Long partnerUserId, EventRequest request) {
        PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                .orElseThrow(() -> new BadRequestException("Partner profile required to create events."));

        Listing listing = null;
        if (request.getListingId() != null) {
            listing = listingRepository.findById(request.getListingId())
                    .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + request.getListingId()));

            if (!listing.getPartner().getId().equals(partner.getId())) {
                throw new ForbiddenException("You are not authorized to create an event for this listing.");
            }
        }

        Event event = Event.builder()
                .listing(listing)
                .title(request.getTitle())
                .description(request.getDescription())
                .venue(request.getVenue())
                .city(request.getCity())
                .eventDate(request.getEventDate())
                .totalTickets(request.getTotalTickets())
                .availableTickets(request.getTotalTickets())
                .ticketPrice(request.getTicketPrice())
                .imageUrl(request.getImageUrl())
                .status(EventStatus.UPCOMING)
                .build();

        Event savedEvent = eventRepository.save(event);
        return mapToResponse(savedEvent);
    }

    @Override
    @Transactional
    public EventResponse updateEvent(Long id, Long partnerUserId, EventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                .orElseThrow(() -> new ForbiddenException("You are not authorized to edit this event."));

        if (event.getListing() != null && !event.getListing().getPartner().getId().equals(partner.getId())) {
            throw new ForbiddenException("You are not authorized to edit this event.");
        }

        int ticketsDifference = request.getTotalTickets() - event.getTotalTickets();
        int newAvailable = event.getAvailableTickets() + ticketsDifference;
        if (newAvailable < 0) {
            throw new BadRequestException("Cannot decrease total tickets below already claimed tickets count.");
        }

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setVenue(request.getVenue());
        event.setCity(request.getCity());
        event.setEventDate(request.getEventDate());
        event.setTotalTickets(request.getTotalTickets());
        event.setAvailableTickets(newAvailable);
        event.setTicketPrice(request.getTicketPrice());
        event.setImageUrl(request.getImageUrl());

        Event updatedEvent = eventRepository.save(event);
        return mapToResponse(updatedEvent);
    }

    @Override
    @Transactional
    public void deleteEvent(Long id, Long partnerUserId, boolean isAdmin) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        if (!isAdmin) {
            PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                    .orElseThrow(() -> new ForbiddenException("You are not authorized to delete this event."));

            if (event.getListing() != null && !event.getListing().getPartner().getId().equals(partner.getId())) {
                throw new ForbiddenException("You are not authorized to delete this event.");
            }
        }

        eventRepository.delete(event);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventResponse> getAllEventsForAdmin(EventStatus status) {
        List<Event> events;
        if (status != null) {
            events = eventRepository.findByStatus(status);
        } else {
            events = eventRepository.findAll();
        }
        return events.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EventResponse updateEventStatus(Long id, EventStatus status) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        event.setStatus(status);
        Event updatedEvent = eventRepository.save(event);
        return mapToResponse(updatedEvent);
    }

    private EventResponse mapToResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .listingId(event.getListing() != null ? event.getListing().getId() : null)
                .listingTitle(event.getListing() != null ? event.getListing().getTitle() : null)
                .partnerId(event.getListing() != null && event.getListing().getPartner() != null ?
                        event.getListing().getPartner().getId() : null)
                .partnerBusinessName(event.getListing() != null && event.getListing().getPartner() != null ?
                        event.getListing().getPartner().getBusinessName() : null)
                .title(event.getTitle())
                .description(event.getDescription())
                .venue(event.getVenue())
                .city(event.getCity())
                .eventDate(event.getEventDate())
                .totalTickets(event.getTotalTickets())
                .availableTickets(event.getAvailableTickets())
                .ticketPrice(event.getTicketPrice())
                .imageUrl(event.getImageUrl())
                .status(event.getStatus())
                .createdAt(event.getCreatedAt())
                .build();
    }
}
