package com.localhub.backend.service;

import com.localhub.backend.dto.PartnerProfileRequest;
import com.localhub.backend.dto.PartnerProfileResponse;
import com.localhub.backend.entity.enums.PartnerStatus;

import java.util.List;

public interface PartnerProfileService {

    PartnerProfileResponse getPartnerProfileByUserId(Long userId);

    PartnerProfileResponse createOrUpdatePartnerProfile(Long userId, PartnerProfileRequest request);

    List<PartnerProfileResponse> getAllPartnerProfilesForAdmin(PartnerStatus status);

    PartnerProfileResponse updatePartnerStatus(Long partnerId, PartnerStatus status);
}
