package com.localhub.backend.repository;

import com.localhub.backend.entity.PartnerProfile;
import com.localhub.backend.entity.enums.PartnerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PartnerProfileRepository extends JpaRepository<PartnerProfile, Long> {

    Optional<PartnerProfile> findByUserId(Long userId);

    List<PartnerProfile> findByStatus(PartnerStatus status);

    boolean existsByUserId(Long userId);
}
