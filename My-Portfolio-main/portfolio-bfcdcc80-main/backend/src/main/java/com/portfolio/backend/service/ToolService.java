package com.portfolio.backend.service;

import com.portfolio.backend.dto.ToolDTO;
import com.portfolio.backend.model.Tool;
import com.portfolio.backend.repository.ToolRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ToolService {

    private final ToolRepository repository;

    public ToolService(ToolRepository repository) {
        this.repository = repository;
    }

    public List<ToolDTO> getAll() {
        return repository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ToolDTO create(ToolDTO dto) {
        Tool entity = toEntity(dto);
        entity = repository.save(entity);
        return toDTO(entity);
    }

    public ToolDTO update(Long id, ToolDTO dto) {
        Tool entity = toEntity(dto);
        entity.setId(id);
        entity = repository.save(entity);
        return toDTO(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private ToolDTO toDTO(Tool t) {
        ToolDTO dto = new ToolDTO();
        dto.setId(t.getId());
        dto.setName(t.getName());
        dto.setIconName(t.getIconName());
        dto.setDisplayOrder(t.getDisplayOrder());
        return dto;
    }

    private Tool toEntity(ToolDTO dto) {
        Tool t = new Tool();
        t.setName(dto.getName());
        t.setIconName(dto.getIconName());
        t.setDisplayOrder(dto.getDisplayOrder());
        return t;
    }
}
