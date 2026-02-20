package com.led.estimate.dto;

import lombok.Data;

@Data
public class CalculateResponseDto {
    private int width;
    private int height;
    private int totalPanels;
    private String ledSize;
    private String ledResolution;
    private double totalPower;
    private String vxRecommendation;
    private int vxCount;
    private long ledPrice;
    private long vxPrice;
    private long totalPrice;
}
