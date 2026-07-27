package com.portfolio.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.backend.dto.HeroContentDTO;
import com.portfolio.backend.model.HeroContent;
import com.portfolio.backend.repository.HeroContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class HeroContentService {

    private final HeroContentRepository repository;
    private final ObjectMapper objectMapper;

    public HeroContentService(HeroContentRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    public HeroContentDTO get() {
        HeroContent hc = repository.findAll().stream().findFirst().orElse(new HeroContent());
        return toDTO(hc);
    }

    public HeroContentDTO update(HeroContentDTO dto) {
        HeroContent hc = repository.findAll().stream().findFirst().orElse(new HeroContent());
        hc.setHeadline(toJsonString(dto.getHeadline()));
        hc.setSubtitle(dto.getSubtitle());
        hc.setDescription(dto.getDescription());
        hc = repository.save(hc);
        return toDTO(hc);
    }

    private HeroContentDTO toDTO(HeroContent hc) {
        HeroContentDTO dto = new HeroContentDTO();
        dto.setId(hc.getId());
        dto.setHeadline(parseJsonMapList(hc.getHeadline()));
        dto.setSubtitle(hc.getSubtitle());
        dto.setDescription(hc.getDescription());
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

    private String toJsonString(Object obj) {
        if (obj == null) return "[]";
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            return "[]";
        }
    }
}
