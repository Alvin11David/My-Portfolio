package com.portfolio.controller;

import com.portfolio.entity.Tool;
import com.portfolio.service.ToolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tools")
public class ToolController {

    private final ToolService service;

    public ToolController(ToolService service) {
        this.service = service;
    }

    @GetMapping
    public List<Tool> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Tool create(@RequestBody Tool tool) {
        return service.create(tool);
    }

    @PutMapping("/{id}")
    public Tool update(@PathVariable Long id, @RequestBody Tool tool) {
        return service.update(id, tool);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
