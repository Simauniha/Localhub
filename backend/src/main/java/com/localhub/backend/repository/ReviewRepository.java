package com.localhub.backend.repository;

import com.localhub.backend.entity.Review;
import com.localhub.backend.entity.enums.ReviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByListingId(Long listingId);

    List<Review> findByUserId(Long userId);

    List<Review> findByListingIdAndStatus(Long listingId, ReviewStatus status);

    List<Review> findByStatus(ReviewStatus status);
}
