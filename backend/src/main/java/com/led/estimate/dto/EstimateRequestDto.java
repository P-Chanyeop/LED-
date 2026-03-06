package com.led.estimate.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EstimateRequestDto {
    private String date;
    private String managerName;
    private String department;
    private String companyPhone;
    private String mobilePhone;
    private String email;
    private String companyAddress;
    
    private String clientCompanyName;
    private String clientDepartment;
    private String clientManager;
    private String clientPhone;
    private String clientMobile;
    private String clientEmail;
    
    private String installDate;
    private String installPeriod;
    private String installLocation;
    private String installDetailLocation;
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
