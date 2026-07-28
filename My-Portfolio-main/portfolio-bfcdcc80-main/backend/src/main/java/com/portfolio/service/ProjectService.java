package com.portfolio.service;

import com.portfolio.entity.Project;
import com.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> findAll() {
        return repository.findAllByOrderByDisplayOrderAsc();
    }

    public Project findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
    }

    public Project create(Project project) {
        return repository.save(project);
    }

    public Project update(Long id, Project updated) {
        Project existing = findById(id);
        existing.setTitle(updated.getTitle());
        existing.setCategory(updated.getCategory());
        existing.setGroupName(updated.getGroupName());
        existing.setDescription(updated.getDescription());
        existing.setChallenge(updated.getChallenge());
        existing.setSolution(updated.getSolution());
        existing.setResults(updated.getResults());
        existing.setImageUrl(updated.getImageUrl());
        existing.setAccentColor(updated.getAccentColor());
        existing.setTechnologies(updated.getTechnologies());
        existing.setYear(updated.getYear());
        existing.setLiveUrl(updated.getLiveUrl());
        existing.setWebUrl(updated.getWebUrl());
        existing.setPlayStoreUrl(updated.getPlayStoreUrl());
        existing.setDisplayOrder(updated.getDisplayOrder());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
