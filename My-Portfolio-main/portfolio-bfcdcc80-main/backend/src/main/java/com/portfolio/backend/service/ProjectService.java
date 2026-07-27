package com.portfolio.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.backend.dto.ProjectDTO;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ObjectMapper objectMapper;

    public ProjectService(ProjectRepository projectRepository, ObjectMapper objectMapper) {
        this.projectRepository = projectRepository;
        this.objectMapper = objectMapper;
    }

    public List<ProjectDTO> getAll() {
        return projectRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ProjectDTO getById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return toDTO(project);
    }

    public ProjectDTO create(ProjectDTO dto) {
        Project project = toEntity(dto);
        if (project.getDisplayOrder() == null) {
            project.setDisplayOrder((int) projectRepository.count() + 1);
        }
        project = projectRepository.save(project);
        return toDTO(project);
    }

    public ProjectDTO update(Long id, ProjectDTO dto) {
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        Project updated = toEntity(dto);
        updated.setId(id);
        updated.setCreatedAt(existing.getCreatedAt());
        updated = projectRepository.save(updated);
        return toDTO(updated);
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }

    private ProjectDTO toDTO(Project p) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(p.getId());
        dto.setTitle(p.getTitle());
        dto.setCategory(p.getCategory());
        dto.setGroupName(p.getGroupName());
        dto.setDescription(p.getDescription());
        dto.setChallenge(p.getChallenge());
        dto.setSolution(p.getSolution());
        dto.setResults(parseJsonList(p.getResults()));
        dto.setImageUrl(p.getImageUrl());
        dto.setAccentColor(p.getAccentColor());
        dto.setTechnologies(parseJsonList(p.getTechnologies()));
        dto.setYear(p.getYear());
        dto.setLiveUrl(p.getLiveUrl());
        dto.setWebUrl(p.getWebUrl());
        dto.setPlayStoreUrl(p.getPlayStoreUrl());
        dto.setDisplayOrder(p.getDisplayOrder());
        return dto;
    }

    private Project toEntity(ProjectDTO dto) {
        Project p = new Project();
        p.setTitle(dto.getTitle());
        p.setCategory(dto.getCategory());
        p.setGroupName(dto.getGroupName());
        p.setDescription(dto.getDescription());
        p.setChallenge(dto.getChallenge());
        p.setSolution(dto.getSolution());
        p.setResults(toJsonString(dto.getResults()));
        p.setImageUrl(dto.getImageUrl());
        p.setAccentColor(dto.getAccentColor());
        p.setTechnologies(toJsonString(dto.getTechnologies()));
        p.setYear(dto.getYear());
        p.setLiveUrl(dto.getLiveUrl());
        p.setWebUrl(dto.getWebUrl());
        p.setPlayStoreUrl(dto.getPlayStoreUrl());
        p.setDisplayOrder(dto.getDisplayOrder());
        return p;
    }

    private List<String> parseJsonList(String json) {
        if (json == null || json.isBlank()) return List.of();
        try {
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (JsonProcessingException e) {
            return List.of();
        }
    }

    private String toJsonString(List<String> list) {
        if (list == null || list.isEmpty()) return "[]";
        try {
            return objectMapper.writeValueAsString(list);
        } catch (JsonProcessingException e) {
            return "[]";
        }
    }
}
