package com.localhub.backend.service;

import com.localhub.backend.dto.AuthResponse;
import com.localhub.backend.dto.LoginRequest;
import com.localhub.backend.dto.RegisterRequest;
import com.localhub.backend.dto.UserResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserResponse getCurrentUser(String email);
}
