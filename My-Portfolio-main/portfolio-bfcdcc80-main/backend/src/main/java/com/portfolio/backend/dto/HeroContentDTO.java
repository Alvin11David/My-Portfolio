package com.portfolio.backend.dto;

import java.util.List;
import java.util.Map;

public class HeroContentDTO {
    private Long id;
    private List<Map<String, Object>> headline;
    private String subtitle;
    private String description;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public List<Map<String, Object>> getHeadline() { return headline; }
    public void setHeadline(List<Map<String, Object>> headline) { this.headline = headline; }
    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
