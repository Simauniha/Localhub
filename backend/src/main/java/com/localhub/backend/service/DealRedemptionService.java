package com.localhub.backend.service;

import com.localhub.backend.dto.RedemptionResponse;
import com.localhub.backend.dto.VerifyRedemptionRequest;

import java.util.List;

public interface DealRedemptionService {

    RedemptionResponse claimDeal(Long userId, Long dealId);

    List<RedemptionResponse> getUserRedemptions(Long userId);

    List<RedemptionResponse> getPartnerRedemptions(Long partnerUserId);

    RedemptionResponse verifyAndCompleteRedemption(Long partnerUserId, boolean isAdmin, VerifyRedemptionRequest request);
}
