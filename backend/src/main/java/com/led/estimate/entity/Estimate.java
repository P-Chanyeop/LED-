package com.led.estimate.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "estimates")
@Data
public class Estimate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDate date;
    private String managerName;
    private String department;
    private String companyPhone;
    private String mobilePhone;
    private String email;
    private String companyAddress;
    private String attachmentFile;
    
    private String clientCompanyName;
    private String clientDepartment;
    private String clientManager;
    private String clientPhone;
    private String clientMobile;
    private String clientEmail;
    private String businessCardImage;
    
    private LocalDate installDate;
    private String installPeriod;
    private String installLocation;
    private String installDetailLocation;
    
    @Column(length = 2000)
    private String etcContent;
    
    private String productName;
    private Integer width;
    private Integer height;
    private Integer quantity;
    private String ledSize;
    private String ledResolution;
    private Double totalPower;
    private Integer installPersonnel;
    private String processorModel;
    private Integer processorQuantity;
    
    private Long ledPrice;
    private Long processorPrice;
    private Long installPrice;
    private Long etcPrice;
    private Long travelCost;
    private Long totalPrice;
}
