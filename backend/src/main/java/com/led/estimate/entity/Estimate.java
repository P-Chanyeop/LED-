package com.led.estimate.entity;

import lombok.Data;
import java.time.LocalDate;

@Data
public class Estimate {
    private String id;
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
    private String etcContent;
    
    private String productName;
    private int width;
    private int height;
    private int quantity;
    private String ledSize;
    private String ledResolution;
    private double totalPower;
    private int installPersonnel;
    private String processorModel;
    private int processorQuantity;
    
    private long ledPrice;
    private long processorPrice;
    private long installPrice;
    private long etcPrice;
    private long totalPrice;
}
