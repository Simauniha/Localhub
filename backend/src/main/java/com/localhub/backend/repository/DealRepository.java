package com.localhub.backend.repository;

import com.localhub.backend.entity.Deal;
import com.localhub.backend.entity.enums.DealStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {

    List<Deal> findByListingId(Long listingId);

    List<Deal> findByStatus(DealStatus status);

    List<Deal> findByListingIdAndStatus(Long listingId, DealStatus status);

    Optional<Deal> findByQrCode(String qrCode);
}
