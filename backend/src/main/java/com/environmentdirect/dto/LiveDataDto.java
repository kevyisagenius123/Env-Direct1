package com.environmentdirect.dto;

public class LiveDataDto {
    private String value;
    private String unit;
    private String details;

    public LiveDataDto() {}

    public LiveDataDto(String value, String unit, String details) {
        this.value = value;
        this.unit = unit;
        this.details = details;
    }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
} 