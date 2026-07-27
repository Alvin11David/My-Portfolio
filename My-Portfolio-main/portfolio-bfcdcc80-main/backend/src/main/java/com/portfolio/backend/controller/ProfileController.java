package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ProfileDTO;
import com.portfolio.backend.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ProfileDTO> get() {
        return ResponseEntity.ok(profileService.get());
    }

    @PutMapping
    public ResponseEntity<ProfileDTO> update(@RequestBody ProfileDTO dto) {
        return ResponseEntity.ok(profileService.update(dto));
    }
}
