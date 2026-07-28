package com.portfolio.service;

import com.portfolio.entity.Hero;
import com.portfolio.repository.HeroRepository;
import org.springframework.stereotype.Service;

@Service
public class HeroService {
    private final HeroRepository repository;

    public HeroService(HeroRepository repository) {
        this.repository = repository;
    }

    public Hero get() {
        return repository.findAll().stream().findFirst()
                .orElseGet(() -> repository.save(new Hero()));
    }

    public Hero update(Hero updated) {
        Hero existing = get();
        existing.setHeadline(updated.getHeadline());
        existing.setDescription(updated.getDescription());
        return repository.save(existing);
    }
}
