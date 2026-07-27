package com.portfolio.backend.dto;

import java.util.List;

public class ProjectDTO {
    private Long id;
    private String title;
    private String category;
    private String groupName;
    private String description;
    private String challenge;
    private String solution;
    private List<String> results;
    private String imageUrl;
    private String accentColor;
    private List<String> technologies;
    private String year;
    private String liveUrl;
    private String webUrl;
    private String playStoreUrl;
    private Integer displayOrder;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getGroupName() { return groupName; }
    public void setGroupName(String groupName) { this.groupName = groupName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getChallenge() { return challenge; }
    public void setChallenge(String challenge) { this.challenge = challenge; }
    public String getSolution() { return solution; }
    public void setSolution(String solution) { this.solution = solution; }
    public List<String> getResults() { return results; }
    public void setResults(List<String> results) { this.results = results; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getAccentColor() { return accentColor; }
    public void setAccentColor(String accentColor) { this.accentColor = accentColor; }
    public List<String> getTechnologies() { return technologies; }
    public void setTechnologies(List<String> technologies) { this.technologies = technologies; }
    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }
    public String getWebUrl() { return webUrl; }
    public void setWebUrl(String webUrl) { this.webUrl = webUrl; }
    public String getPlayStoreUrl() { return playStoreUrl; }
    public void setPlayStoreUrl(String playStoreUrl) { this.playStoreUrl = playStoreUrl; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
