package com.led.estimate.repository;

import com.led.estimate.entity.Setting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingRepository extends JpaRepository<Setting, String> {
}
