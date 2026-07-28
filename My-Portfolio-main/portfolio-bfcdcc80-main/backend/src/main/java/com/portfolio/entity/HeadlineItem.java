package com.portfolio.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class HeadlineItem {
    private String text;
    private String style;

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }
}
