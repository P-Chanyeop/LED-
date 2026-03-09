package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.entity.Setting;
import com.led.estimate.repository.SettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import jakarta.mail.internet.MimeMessage;
import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final SettingRepository settingRepository;
    private static final String AES_KEY = "LedEstimate2026!";
    private static final String ENCRYPT_PREFIX = "ENC:";

    @PostMapping("/send")
    public ApiResponse<String> sendEmail(
            @RequestParam String to,
            @RequestParam(defaultValue = "LED 견적서") String subject,
            @RequestParam(defaultValue = "") String body,
            @RequestParam(required = false) String businessCardImage,
            @RequestParam(required = false) MultipartFile file) {
        try {
            Map<String, String> settings = settingRepository.findAll().stream()
                    .collect(Collectors.toMap(Setting::getSettingKey, Setting::getSettingValue));

            String password = settings.getOrDefault("emailPassword", "");
            if (password.startsWith(ENCRYPT_PREFIX)) {
                password = decrypt(password.substring(ENCRYPT_PREFIX.length()));
            }

            JavaMailSenderImpl sender = new JavaMailSenderImpl();
            sender.setHost(settings.getOrDefault("smtpServer", "smtp.gmail.com"));
            sender.setPort(Integer.parseInt(settings.getOrDefault("smtpPort", "587")));
            sender.setUsername(settings.get("emailAccount"));
            sender.setPassword(password);

            Properties props = sender.getJavaMailProperties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.timeout", "10000");

            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(settings.get("emailAccount"));
            helper.setTo(to);
            helper.setSubject(subject);
            
            // HTML 본문 생성
            String htmlBody = body.replace("\n", "<br>");
            if (businessCardImage != null && !businessCardImage.isEmpty()) {
                String baseUrl = "http://localhost:8080";
                htmlBody += "<br><br><img src='" + baseUrl + businessCardImage + "' style='max-width: 500px; height: auto;' />";
            }
            helper.setText(htmlBody, true);

            if (file != null && !file.isEmpty()) {
                helper.addAttachment(file.getOriginalFilename(), file);
            }

            String defaultAttachment = settings.get("defaultAttachment");
            if (defaultAttachment != null && !defaultAttachment.isEmpty()) {
                File attachFile = new File(defaultAttachment.startsWith("/") ? defaultAttachment.substring(1) : defaultAttachment);
                if (attachFile.exists()) {
                    helper.addAttachment(attachFile.getName().replaceFirst("^[^_]*_", ""), attachFile);
                }
            }

            sender.send(message);
            return ApiResponse.success("메일이 발송되었습니다.");
        } catch (Exception e) {
            return ApiResponse.error("메일 발송 실패: " + e.getMessage());
        }
    }

    private String decrypt(String data) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(AES_KEY.getBytes(), "AES"));
        return new String(cipher.doFinal(Base64.getDecoder().decode(data)));
    }
}
