package com.portfolio.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.backend.dto.ProfileDTO;
import com.portfolio.backend.model.Profile;
import com.portfolio.backend.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final ObjectMapper objectMapper;

    public ProfileService(ProfileRepository profileRepository, ObjectMapper objectMapper) {
        this.profileRepository = profileRepository;
        this.objectMapper = objectMapper;
    }

    public ProfileDTO get() {
        Profile profile = profileRepository.findAll().stream().findFirst().orElse(new Profile());
        return toDTO(profile);
    }

    public ProfileDTO update(ProfileDTO dto) {
        Profile profile = profileRepository.findAll().stream().findFirst().orElse(new Profile());
        profile.setBioText(dto.getBioText());
        profile.setStats(toJsonString(dto.getStats()));
        profile.setSkills(toJsonString(dto.getSkills()));
        profile.setProfileImageUrl(dto.getProfileImageUrl());
        profile = profileRepository.save(profile);
        return toDTO(profile);
    }

    private ProfileDTO toDTO(Profile p) {
        ProfileDTO dto = new ProfileDTO();
        dto.setId(p.getId());
        dto.setBioText(p.getBioText());
        dto.setStats(parseJsonMapList(p.getStats()));
        dto.setSkills(parseJsonList(p.getSkills()));
        dto.setProfileImageUrl(p.getProfileImageUrl());
        return dto;
    }

    private List<Map<String, Object>> parseJsonMapList(String json) {
        if (json == null || json.isBlank()) return List.of();
        try {
            return objectMapper.readValue(json, new TypeReference<List<Map<String, Object>>>() {});
        } catch (JsonProcessingException e) {
            return List.of();
        }
    }

    private List<String> parseJsonList(String json) {
        if (json == null || json.isBlank()) return List.of();
        try {
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (JsonProcessingException e) {
            return List.of();
        }
    }

    private String toJsonString(Object obj) {
        if (obj == null) return "[]";
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            return "[]";
        }
    }
}
