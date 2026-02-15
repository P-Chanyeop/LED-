package com.led.estimate.entity;

import lombok.Data;

@Data
public class Product {
    private String id;
    private String name;
    private String size;
    private String pixel;
    private String brightness;
    private String power;
    private String resolution;
    private long unitPrice;
    private String imageUrl;
}
