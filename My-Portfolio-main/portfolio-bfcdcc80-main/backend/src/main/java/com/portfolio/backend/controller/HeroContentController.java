package com.portfolio.backend.controller;

import com.portfolio.backend.dto.HeroContentDTO;
import com.portfolio.backend.service.HeroContentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hero")
public class HeroContentController {

    private final HeroContentService service;

    public HeroContentController(HeroContentService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<HeroContentDTO> get() {
        return ResponseEntity.ok(service.get());
    }

    @PutMapping
    public ResponseEntity<HeroContentDTO> update(@RequestBody HeroContentDTO dto) {
        return ResponseEntity.ok(service.update(dto));
    }
}
