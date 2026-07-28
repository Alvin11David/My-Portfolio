package com.portfolio.controller;

import com.portfolio.entity.Hero;
import com.portfolio.service.HeroService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hero")
public class HeroController {

    private final HeroService service;

    public HeroController(HeroService service) {
        this.service = service;
    }

    @GetMapping
    public Hero get() {
        return service.get();
    }

    @PutMapping
    public Hero update(@RequestBody Hero hero) {
        return service.update(hero);
    }
}
