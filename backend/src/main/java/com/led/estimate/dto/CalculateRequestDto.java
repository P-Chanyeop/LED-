package com.led.estimate.dto;

import lombok.Data;

@Data
public class CalculateRequestDto {
    private int width;
    private int height;
    private String productId;
}
