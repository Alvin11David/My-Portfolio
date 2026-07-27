package com.portfolio.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.backend.dto.SkillCategoryDTO;
import com.portfolio.backend.model.SkillCategory;
import com.portfolio.backend.repository.SkillCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SkillCategoryService {

    private final SkillCategoryRepository repository;
    private final ObjectMapper objectMapper;

    public SkillCategoryService(SkillCategoryRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    public List<SkillCategoryDTO> getAll() {
        return repository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public SkillCategoryDTO create(SkillCategoryDTO dto) {
        SkillCategory entity = toEntity(dto);
        entity = repository.save(entity);
        return toDTO(entity);
    }

    public SkillCategoryDTO update(Long id, SkillCategoryDTO dto) {
        SkillCategory entity = toEntity(dto);
        entity.setId(id);
        entity = repository.save(entity);
        return toDTO(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private SkillCategoryDTO toDTO(SkillCategory sc) {
        SkillCategoryDTO dto = new SkillCategoryDTO();
        dto.setId(sc.getId());
        dto.setTitle(sc.getTitle());
        dto.setIconName(sc.getIconName());
        dto.setColor(sc.getColor());
        dto.setShadowColor(sc.getShadowColor());
        dto.setDisplayOrder(sc.getDisplayOrder());
        dto.setSkills(parseJsonMapList(sc.getSkills()));
        return dto;
    }

    private SkillCategory toEntity(SkillCategoryDTO dto) {
        SkillCategory sc = new SkillCategory();
        sc.setTitle(dto.getTitle());
        sc.setIconName(dto.getIconName());
        sc.setColor(dto.getColor());
        sc.setShadowColor(dto.getShadowColor());
        sc.setDisplayOrder(dto.getDisplayOrder());
        sc.setSkills(toJsonString(dto.getSkills()));
        return sc;
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
