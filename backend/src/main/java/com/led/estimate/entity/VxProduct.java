package com.led.estimate.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "vx_products")
@Data
public class VxProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String modelName;
    private String supportResolution;
    private Integer lanPortCount;
    private Long unitPrice;
    private String imageUrl;
}
