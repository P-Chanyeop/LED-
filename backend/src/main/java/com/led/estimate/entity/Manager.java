package com.led.estimate.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "managers")
@Data
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String department;
    private String phone;
    private String mobile;
    private String email;
    private String address;
    private String businessCardImage;
    
    @Column(length = 500)
    private String emailSubject;
    
    @Column(length = 2000)
    private String emailBody;
    
    @Column(length = 500)
    private String attachmentFile;
    
    private String smtpServer;
    private Integer smtpPort;
    private String smtpAccount;
    @Column(length = 500)
    private String smtpPassword;
}
