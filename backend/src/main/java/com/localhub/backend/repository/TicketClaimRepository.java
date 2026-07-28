package com.localhub.backend.repository;

import com.localhub.backend.entity.TicketClaim;
import com.localhub.backend.entity.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketClaimRepository extends JpaRepository<TicketClaim, Long> {

    List<TicketClaim> findByUserId(Long userId);

    List<TicketClaim> findByEventId(Long eventId);

    Optional<TicketClaim> findByTicketCode(String ticketCode);

    List<TicketClaim> findByUserIdAndStatus(Long userId, TicketStatus status);
}
