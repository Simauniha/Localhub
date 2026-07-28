package com.localhub.backend.service.impl;

import com.localhub.backend.dto.ListingRequest;
import com.localhub.backend.dto.ListingResponse;
import com.localhub.backend.entity.Category;
import com.localhub.backend.entity.Listing;
import com.localhub.backend.entity.PartnerProfile;
import com.localhub.backend.entity.enums.ListingStatus;
import com.localhub.backend.exception.BadRequestException;
import com.localhub.backend.exception.ForbiddenException;
import com.localhub.backend.exception.ResourceNotFoundException;
import com.localhub.backend.repository.CategoryRepository;
import com.localhub.backend.repository.ListingRepository;
import com.localhub.backend.repository.PartnerProfileRepository;
import com.localhub.backend.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListingServiceImpl implements ListingService {

    private final ListingRepository listingRepository;
    private final CategoryRepository categoryRepository;
    private final PartnerProfileRepository partnerProfileRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ListingResponse> getApprovedListings(Long categoryId, String city, String search) {
        List<Listing> listings = listingRepository.searchApprovedListings(ListingStatus.APPROVED, categoryId, city, search);
        return listings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ListingResponse getListingById(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));
        return mapToResponse(listing);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListingResponse> getListingsByPartnerUserId(Long userId) {
        PartnerProfile partner = partnerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Partner profile not found for user id: " + userId));

        return listingRepository.findByPartnerId(partner.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ListingResponse createListing(Long partnerUserId, ListingRequest request) {
        PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                .orElseThrow(() -> new BadRequestException("You must create a partner profile before creating a listing."));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        Listing listing = Listing.builder()
                .partner(partner)
                .category(category)
                .title(request.getTitle())
                .description(request.getDescription())
                .address(request.getAddress())
                .city(request.getCity())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .phone(request.getPhone())
                .websiteUrl(request.getWebsiteUrl())
                .imageUrl(request.getImageUrl())
                .openingHours(request.getOpeningHours())
                .priceRange(request.getPriceRange())
                .status(ListingStatus.PENDING)
                .averageRating(0.0)
                .reviewCount(0)
                .build();

        Listing savedListing = listingRepository.save(listing);
        return mapToResponse(savedListing);
    }

    @Override
    @Transactional
    public ListingResponse updateListing(Long listingId, Long partnerUserId, ListingRequest request) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + listingId));

        PartnerProfile partner = partnerProfileRepository.findByUserId(partnerUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Partner profile not found for user id: " + partnerUserId));

        if (!listing.getPartner().getId().equals(partner.getId())) {
            throw new ForbiddenException("You are not authorized to update this listing.");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        listing.setCategory(category);
        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setAddress(request.getAddress());
        listing.setCity(request.getCity());
        listing.setLatitude(request.getLatitude());
        listing.setLongitude(request.getLongitude());
        listing.setPhone(request.getPhone());
        listing.setWebsiteUrl(request.getWebsiteUrl());
        listing.setImageUrl(request.getImageUrl());
        listing.setOpeningHours(request.getOpeningHours());
        listing.setPriceRange(request.getPriceRange());

        Listing updatedListing = listingRepository.save(listing);
        return mapToResponse(updatedListing);
    }

    @Override
    @Transactional
    public void deleteListing(Long listingId, Long userId, boolean isAdmin) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + listingId));

        if (!isAdmin) {
            PartnerProfile partner = partnerProfileRepository.findByUserId(userId)
                    .orElseThrow(() -> new ForbiddenException("You are not authorized to delete this listing."));
            if (!listing.getPartner().getId().equals(partner.getId())) {
                throw new ForbiddenException("You are not authorized to delete this listing.");
            }
        }

        listingRepository.delete(listing);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListingResponse> getAllListingsForAdmin(ListingStatus status) {
        List<Listing> listings;
        if (status != null) {
            listings = listingRepository.findByStatus(status);
        } else {
            listings = listingRepository.findAll();
        }
        return listings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ListingResponse updateListingStatus(Long listingId, ListingStatus status) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + listingId));

        listing.setStatus(status);
        Listing updatedListing = listingRepository.save(listing);
        return mapToResponse(updatedListing);
    }

    private ListingResponse mapToResponse(Listing listing) {
        return ListingResponse.builder()
                .id(listing.getId())
                .partnerId(listing.getPartner() != null ? listing.getPartner().getId() : null)
                .partnerBusinessName(listing.getPartner() != null ? listing.getPartner().getBusinessName() : null)
                .categoryId(listing.getCategory().getId())
                .categoryName(listing.getCategory().getName())
                .title(listing.getTitle())
                .description(listing.getDescription())
                .address(listing.getAddress())
                .city(listing.getCity())
                .latitude(listing.getLatitude())
                .longitude(listing.getLongitude())
                .phone(listing.getPhone())
                .websiteUrl(listing.getWebsiteUrl())
                .imageUrl(listing.getImageUrl())
                .openingHours(listing.getOpeningHours())
                .priceRange(listing.getPriceRange())
                .status(listing.getStatus())
                .averageRating(listing.getAverageRating())
                .reviewCount(listing.getReviewCount())
                .createdAt(listing.getCreatedAt())
                .updatedAt(listing.getUpdatedAt())
                .build();
    }
}
