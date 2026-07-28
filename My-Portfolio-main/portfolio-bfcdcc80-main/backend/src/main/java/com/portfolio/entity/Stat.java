package com.portfolio.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class Stat {
    private int number;
    private String suffix;
    private String label;

    public int getNumber() { return number; }
    public void setNumber(int number) { this.number = number; }
    public String getSuffix() { return suffix; }
    public void setSuffix(String suffix) { this.suffix = suffix; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
}
