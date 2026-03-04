package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.entity.Setting;
import com.led.estimate.repository.SettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingController {

    private final SettingRepository settingRepository;

    private static final String AES_KEY = "LedEstimate2026!";
    private static final String ENCRYPT_PREFIX = "ENC:";

    @GetMapping
    public ApiResponse<Map<String, String>> getAll() {
        Map<String, String> map = settingRepository.findAll().stream()
                .collect(Collectors.toMap(Setting::getSettingKey, s -> {
                    if (s.getSettingKey().equals("emailPassword") && s.getSettingValue().startsWith(ENCRYPT_PREFIX)) {
                        try {
                            return decrypt(s.getSettingValue().substring(ENCRYPT_PREFIX.length()));
                        } catch (Exception e) { return ""; }
                    }
                    return s.getSettingValue();
                }));
        return ApiResponse.success(map);
    }

    @PutMapping
    public ApiResponse<Void> saveAll(@RequestBody Map<String, String> settings) {
        settings.forEach((key, value) -> {
            Setting s = new Setting();
            s.setSettingKey(key);
            if (key.equals("emailPassword") && value != null && !value.isEmpty()) {
                try { s.setSettingValue(ENCRYPT_PREFIX + encrypt(value)); }
                catch (Exception e) { s.setSettingValue(value); }
            } else {
                s.setSettingValue(value);
            }
            settingRepository.save(s);
        });
        return ApiResponse.success(null);
    }

    private String encrypt(String data) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(AES_KEY.getBytes(), "AES"));
        return Base64.getEncoder().encodeToString(cipher.doFinal(data.getBytes()));
    }

    private String decrypt(String data) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(AES_KEY.getBytes(), "AES"));
        return new String(cipher.doFinal(Base64.getDecoder().decode(data)));
    }
}
