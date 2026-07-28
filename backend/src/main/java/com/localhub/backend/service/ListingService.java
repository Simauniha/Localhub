package com.localhub.backend.service;

import com.localhub.backend.dto.ListingRequest;
import com.localhub.backend.dto.ListingResponse;
import com.localhub.backend.entity.enums.ListingStatus;

import java.util.List;

public interface ListingService {

    List<ListingResponse> getApprovedListings(Long categoryId, String city, String search);

    ListingResponse getListingById(Long id);

    List<ListingResponse> getListingsByPartnerUserId(Long userId);

    ListingResponse createListing(Long partnerUserId, ListingRequest request);

    ListingResponse updateListing(Long listingId, Long partnerUserId, ListingRequest request);

    void deleteListing(Long listingId, Long userId, boolean isAdmin);

    List<ListingResponse> getAllListingsForAdmin(ListingStatus status);

    ListingResponse updateListingStatus(Long listingId, ListingStatus status);
}
