package com.localhub.backend.service.impl;

import com.localhub.backend.dto.AuthResponse;
import com.localhub.backend.dto.LoginRequest;
import com.localhub.backend.dto.RegisterRequest;
import com.localhub.backend.dto.UserResponse;
import com.localhub.backend.entity.PartnerProfile;
import com.localhub.backend.entity.User;
import com.localhub.backend.entity.enums.PartnerStatus;
import com.localhub.backend.entity.enums.UserRole;
import com.localhub.backend.exception.EmailAlreadyExistsException;
import com.localhub.backend.exception.ResourceNotFoundException;
import com.localhub.backend.repository.PartnerProfileRepository;
import com.localhub.backend.repository.UserRepository;
import com.localhub.backend.security.jwt.JwtTokenProvider;
import com.localhub.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PartnerProfileRepository partnerProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already registered: " + request.getEmail());
        }

        UserRole role = request.getRole() != null ? request.getRole() : UserRole.USER;

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(role)
                .city(request.getCity())
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);

        if (role == UserRole.PARTNER) {
            String businessName = (request.getBusinessName() != null && !request.getBusinessName().isBlank())
                    ? request.getBusinessName()
                    : request.getName() + " Business";

            PartnerProfile partnerProfile = PartnerProfile.builder()
                    .user(savedUser)
                    .businessName(businessName)
                    .contactEmail(savedUser.getEmail())
                    .contactPhone(savedUser.getPhone())
                    .city(savedUser.getCity())
                    .status(PartnerStatus.PENDING)
                    .build();

            partnerProfileRepository.save(partnerProfile);
        }

        String token = tokenProvider.generateTokenFromUser(savedUser.getEmail(), savedUser.getId(), savedUser.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(UserResponse.fromEntity(savedUser))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        String token = tokenProvider.generateToken(authentication);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(UserResponse.fromEntity(user))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return UserResponse.fromEntity(user);
    }
}
