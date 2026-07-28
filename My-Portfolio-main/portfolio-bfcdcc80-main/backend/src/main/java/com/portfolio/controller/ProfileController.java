package com.portfolio.controller;

import com.portfolio.entity.Profile;
import com.portfolio.service.ProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping
    public Profile get() {
        return service.get();
    }

    @PutMapping
    public Profile update(@RequestBody Profile profile) {
        return service.update(profile);
    }
}
