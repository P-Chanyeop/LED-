package com.led.estimate.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "settings")
@Data
public class Setting {
    @Id
    private String settingKey;
    private String settingValue;
}
