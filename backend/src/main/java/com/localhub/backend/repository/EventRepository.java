package com.localhub.backend.repository;

import com.localhub.backend.entity.Event;
import com.localhub.backend.entity.enums.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByListingId(Long listingId);

    List<Event> findByStatus(EventStatus status);

    List<Event> findByCityIgnoreCase(String city);

    List<Event> findByListingIdAndStatus(Long listingId, EventStatus status);
}
