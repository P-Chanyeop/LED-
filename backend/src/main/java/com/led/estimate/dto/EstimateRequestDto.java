package com.led.estimate.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EstimateRequestDto {
    private LocalDate date;
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
    
    private LocalDate installDate;
    private String installPeriod;
    private String installLocation;
    private String installDetailLocation;
    private String etcContent;
    
    private String productName;
    private int width;
    private int height;
    private int installPersonnel;
    private String processorModel;
}
