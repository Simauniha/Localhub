package com.localhub.backend.repository;

import com.localhub.backend.entity.ReferralClick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReferralClickRepository extends JpaRepository<ReferralClick, Long> {

    List<ReferralClick> findByUserId(Long userId);

    List<ReferralClick> findByListingId(Long listingId);

    List<ReferralClick> findByTargetService(String targetService);
}
