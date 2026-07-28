package com.localhub.backend.service;

import com.localhub.backend.dto.DealRequest;
import com.localhub.backend.dto.DealResponse;
import com.localhub.backend.entity.enums.DealStatus;

import java.util.List;

public interface DealService {

    List<DealResponse> getActiveDeals(Long listingId);

    DealResponse getDealById(Long id);

    DealResponse createDeal(Long partnerUserId, DealRequest request);

    DealResponse updateDeal(Long id, Long partnerUserId, DealRequest request);

    void deleteDeal(Long id, Long partnerUserId, boolean isAdmin);

    List<DealResponse> getAllDealsForAdmin(DealStatus status);

    DealResponse updateDealStatus(Long id, DealStatus status);
}
