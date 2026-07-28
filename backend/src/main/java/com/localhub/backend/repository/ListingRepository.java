package com.localhub.backend.repository;

import com.localhub.backend.entity.Listing;
import com.localhub.backend.entity.enums.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {

    List<Listing> findByCategoryId(Long categoryId);

    List<Listing> findByPartnerId(Long partnerId);

    List<Listing> findByStatus(ListingStatus status);

    List<Listing> findByCityIgnoreCase(String city);

    List<Listing> findByCategoryIdAndStatus(Long categoryId, ListingStatus status);

    @Query("SELECT l FROM Listing l WHERE l.status = :status " +
            "AND (:categoryId IS NULL OR l.category.id = :categoryId) " +
            "AND (:city IS NULL OR LOWER(l.city) = LOWER(:city)) " +
            "AND (:search IS NULL OR LOWER(l.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(l.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Listing> searchApprovedListings(
            @Param("status") ListingStatus status,
            @Param("categoryId") Long categoryId,
            @Param("city") String city,
            @Param("search") String search
    );
}
