package com.portfolio.backend.dto;

import java.util.List;
import java.util.Map;

public class ProfileDTO {
    private Long id;
    private String bioText;
    private List<Map<String, Object>> stats;
    private List<String> skills;
    private String profileImageUrl;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBioText() { return bioText; }
    public void setBioText(String bioText) { this.bioText = bioText; }
    public List<Map<String, Object>> getStats() { return stats; }
    public void setStats(List<Map<String, Object>> stats) { this.stats = stats; }
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }
}
