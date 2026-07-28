package com.localhub.backend.repository;

import com.localhub.backend.entity.DealRedemption;
import com.localhub.backend.entity.enums.RedemptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DealRedemptionRepository extends JpaRepository<DealRedemption, Long> {

    List<DealRedemption> findByUserId(Long userId);

    List<DealRedemption> findByDealId(Long dealId);

    Optional<DealRedemption> findByRedemptionCode(String redemptionCode);

    List<DealRedemption> findByUserIdAndStatus(Long userId, RedemptionStatus status);
}
