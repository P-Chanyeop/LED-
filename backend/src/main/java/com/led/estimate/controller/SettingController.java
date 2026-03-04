package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.entity.Setting;
import com.led.estimate.repository.SettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingController {

    private final SettingRepository settingRepository;

    @GetMapping
    public ApiResponse<Map<String, String>> getAll() {
        Map<String, String> map = settingRepository.findAll().stream()
                .collect(Collectors.toMap(Setting::getSettingKey, Setting::getSettingValue));
        return ApiResponse.success(map);
    }

    @PutMapping
    public ApiResponse<Void> saveAll(@RequestBody Map<String, String> settings) {
        settings.forEach((key, value) -> {
            Setting s = new Setting();
            s.setSettingKey(key);
            s.setSettingValue(value);
            settingRepository.save(s);
        });
        return ApiResponse.success(null);
    }
}
