package com.portfolio.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skill_categories")
public class SkillCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String iconName;
    private String color;
    private String shadowColor;
    private int displayOrder;

    @ElementCollection
    @CollectionTable(name = "category_skills", joinColumns = @JoinColumn(name = "category_id"))
    private List<Skill> skills = new ArrayList<>();

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
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
    public List<Skill> getSkills() { return skills; }
    public void setSkills(List<Skill> skills) { this.skills = skills; }
}
