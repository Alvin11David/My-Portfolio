package com.portfolio.service;

import com.portfolio.entity.Tool;
import com.portfolio.repository.ToolRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ToolService {
    private final ToolRepository repository;

    public ToolService(ToolRepository repository) {
        this.repository = repository;
    }

    public List<Tool> findAll() {
        return repository.findAllByOrderByDisplayOrderAsc();
    }

    public Tool create(Tool tool) {
        return repository.save(tool);
    }

    public Tool update(Long id, Tool updated) {
        Tool existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tool not found: " + id));
        existing.setName(updated.getName());
        existing.setIconName(updated.getIconName());
        existing.setDisplayOrder(updated.getDisplayOrder());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
