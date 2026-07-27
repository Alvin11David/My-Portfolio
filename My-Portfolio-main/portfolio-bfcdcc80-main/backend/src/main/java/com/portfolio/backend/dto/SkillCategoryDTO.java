package com.portfolio.backend.dto;

import java.util.List;
import java.util.Map;

public class SkillCategoryDTO {
    private Long id;
    private String title;
    private String iconName;
    private String color;
    private String shadowColor;
    private Integer displayOrder;
    private List<Map<String, Object>> skills;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getShadowColor() { return shadowColor; }
    public void setShadowColor(String shadowColor) { this.shadowColor = shadowColor; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
    public List<Map<String, Object>> getSkills() { return skills; }
    public void setSkills(List<Map<String, Object>> skills) { this.skills = skills; }
}
