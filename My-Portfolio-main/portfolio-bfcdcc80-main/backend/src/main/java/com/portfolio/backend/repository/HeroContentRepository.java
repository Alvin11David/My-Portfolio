package com.portfolio.backend.repository;

import com.portfolio.backend.model.HeroContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroContentRepository extends JpaRepository<HeroContent, Long> {
}
