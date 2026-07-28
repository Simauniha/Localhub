package com.localhub.backend.service.impl;

import com.localhub.backend.dto.PartnerProfileRequest;
import com.localhub.backend.dto.PartnerProfileResponse;
import com.localhub.backend.entity.PartnerProfile;
import com.localhub.backend.entity.User;
import com.localhub.backend.entity.enums.PartnerStatus;
import com.localhub.backend.exception.ResourceNotFoundException;
import com.localhub.backend.repository.PartnerProfileRepository;
import com.localhub.backend.repository.UserRepository;
import com.localhub.backend.service.PartnerProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartnerProfileServiceImpl implements PartnerProfileService {

    private final PartnerProfileRepository partnerProfileRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public PartnerProfileResponse getPartnerProfileByUserId(Long userId) {
        PartnerProfile profile = partnerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Partner profile not found for user id: " + userId));
        return mapToResponse(profile);
    }

    @Override
    @Transactional
    public PartnerProfileResponse createOrUpdatePartnerProfile(Long userId, PartnerProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Optional<PartnerProfile> existingProfile = partnerProfileRepository.findByUserId(userId);

        PartnerProfile profile;
        if (existingProfile.isPresent()) {
            profile = existingProfile.get();
            profile.setBusinessName(request.getBusinessName());
            profile.setBusinessType(request.getBusinessType());
            profile.setContactEmail(request.getContactEmail());
            profile.setContactPhone(request.getContactPhone());
            profile.setAddress(request.getAddress());
            profile.setCity(request.getCity());
        } else {
            profile = PartnerProfile.builder()
                    .user(user)
                    .businessName(request.getBusinessName())
                    .businessType(request.getBusinessType())
                    .contactEmail(request.getContactEmail())
                    .contactPhone(request.getContactPhone())
                    .address(request.getAddress())
                    .city(request.getCity())
                    .status(PartnerStatus.PENDING)
                    .build();
        }

        PartnerProfile savedProfile = partnerProfileRepository.save(profile);
        return mapToResponse(savedProfile);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PartnerProfileResponse> getAllPartnerProfilesForAdmin(PartnerStatus status) {
        List<PartnerProfile> profiles;
        if (status != null) {
            profiles = partnerProfileRepository.findByStatus(status);
        } else {
            profiles = partnerProfileRepository.findAll();
        }
        return profiles.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PartnerProfileResponse updatePartnerStatus(Long partnerId, PartnerStatus status) {
        PartnerProfile profile = partnerProfileRepository.findById(partnerId)
                .orElseThrow(() -> new ResourceNotFoundException("Partner profile not found with id: " + partnerId));

        profile.setStatus(status);
        PartnerProfile updatedProfile = partnerProfileRepository.save(profile);
        return mapToResponse(updatedProfile);
    }

    private PartnerProfileResponse mapToResponse(PartnerProfile profile) {
        return PartnerProfileResponse.builder()
                .id(profile.getId())
                .userId(profile.getUser().getId())
                .userEmail(profile.getUser().getEmail())
                .businessName(profile.getBusinessName())
                .businessType(profile.getBusinessType())
                .contactEmail(profile.getContactEmail())
                .contactPhone(profile.getContactPhone())
                .address(profile.getAddress())
                .city(profile.getCity())
                .status(profile.getStatus())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}
