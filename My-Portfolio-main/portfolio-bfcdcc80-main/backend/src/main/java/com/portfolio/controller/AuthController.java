package com.portfolio.controller;

import com.portfolio.dto.LoginRequest;
import com.portfolio.dto.LoginResponse;
import com.portfolio.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD_HASH = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

    public AuthController(JwtTokenProvider tokenProvider, PasswordEncoder passwordEncoder) {
        this.tokenProvider = tokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (!ADMIN_USERNAME.equals(request.getUsername()) ||
                !passwordEncoder.matches(request.getPassword(), ADMIN_PASSWORD_HASH)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
        String token = tokenProvider.createToken(request.getUsername());
        return ResponseEntity.ok(new LoginResponse(token, request.getUsername()));
    }
}
