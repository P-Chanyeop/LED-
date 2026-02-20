package com.led.estimate.entity;

import lombok.Data;

@Data
public class VxProduct {
    private String id;
    private String modelName;
    private String supportResolution;
    private int lanPortCount;
    private long unitPrice;
    private String imageUrl;
}
