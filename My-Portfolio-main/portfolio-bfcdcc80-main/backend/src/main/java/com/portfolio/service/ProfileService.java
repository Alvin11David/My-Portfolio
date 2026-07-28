package com.portfolio.service;

import com.portfolio.entity.Profile;
import com.portfolio.repository.ProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final ProfileRepository repository;

    public ProfileService(ProfileRepository repository) {
        this.repository = repository;
    }

    public Profile get() {
        return repository.findAll().stream().findFirst()
                .orElseGet(() -> repository.save(new Profile()));
    }

    public Profile update(Profile updated) {
        Profile existing = get();
        existing.setBioText(updated.getBioText());
        existing.setStats(updated.getStats());
        existing.setSkills(updated.getSkills());
        existing.setProfileImageUrl(updated.getProfileImageUrl());
        return repository.save(existing);
    }
}
