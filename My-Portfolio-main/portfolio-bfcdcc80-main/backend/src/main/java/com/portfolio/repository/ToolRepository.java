package com.portfolio.repository;

import com.portfolio.entity.Tool;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ToolRepository extends JpaRepository<Tool, Long> {
    List<Tool> findAllByOrderByDisplayOrderAsc();
}
