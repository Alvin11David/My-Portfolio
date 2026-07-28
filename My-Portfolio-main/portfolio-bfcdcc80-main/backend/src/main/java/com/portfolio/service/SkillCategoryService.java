package com.portfolio.service;

import com.portfolio.entity.SkillCategory;
import com.portfolio.repository.SkillCategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SkillCategoryService {
    private final SkillCategoryRepository repository;

    public SkillCategoryService(SkillCategoryRepository repository) {
        this.repository = repository;
    }

    public List<SkillCategory> findAll() {
        return repository.findAllByOrderByDisplayOrderAsc();
    }

    public SkillCategory create(SkillCategory category) {
        return repository.save(category);
    }

    public SkillCategory update(Long id, SkillCategory updated) {
        SkillCategory existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("SkillCategory not found: " + id));
        existing.setTitle(updated.getTitle());
        existing.setIconName(updated.getIconName());
        existing.setColor(updated.getColor());
        existing.setShadowColor(updated.getShadowColor());
        existing.setDisplayOrder(updated.getDisplayOrder());
        existing.setSkills(updated.getSkills());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
