package com.portfolio.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String bioText;

    @Column(columnDefinition = "TEXT")
    private String stats;

    @Column(columnDefinition = "TEXT")
    private String skills;

    private String profileImageUrl;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBioText() { return bioText; }
    public void setBioText(String bioText) { this.bioText = bioText; }
    public String getStats() { return stats; }
    public void setStats(String stats) { this.stats = stats; }
    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }
}
