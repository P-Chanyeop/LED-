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
            @RequestParam(required = false) String managerAttachment,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) List<MultipartFile> extraFiles,
            @RequestParam(required = false) List<String> extraAttachPaths) {
        try {
            Map<String, String> settings = settingRepository.findAll().stream()
                    .collect(Collectors.toMap(Setting::getSettingKey, Setting::getSettingValue));

            String password = settings.getOrDefault("emailPassword", "");
            if (password.startsWith(ENCRYPT_PREFIX)) {
                password = decrypt(password.substring(ENCRYPT_PREFIX.length()));
            }

            JavaMailSenderImpl sender = new JavaMailSenderImpl();
            sender.setHost(settings.getOrDefault("smtpServer", "smtp.gmail.com"));
            int port = Integer.parseInt(settings.getOrDefault("smtpPort", "587"));
            sender.setPort(port);
            sender.setUsername(settings.get("emailAccount"));
            sender.setPassword(password);

            Properties props = sender.getJavaMailProperties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.timeout", "10000");
            props.put("mail.smtp.connectiontimeout", "10000");
            
            // 포트에 따라 SSL/TLS 설정
            if (port == 465) {
                props.put("mail.smtp.ssl.enable", "true");
                props.put("mail.smtp.ssl.trust", "*");
            } else {
                props.put("mail.smtp.starttls.enable", "true");
            }

            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(settings.get("emailAccount"));
            helper.setTo(to);
            helper.setSubject(subject);
            
            // HTML 본문 생성
            String htmlBody = "<html><body>" + body.replace("\n", "<br>");
            
            // 명함 이미지를 인라인으로 첨부
            if (businessCardImage != null && !businessCardImage.isEmpty()) {
                try {
                    String imagePath = businessCardImage.replace("/uploads/", "uploads/");
                    File imageFile = new File(imagePath);
                    if (imageFile.exists()) {
                        htmlBody += "<br><br><img src='cid:businessCard' style='max-width: 500px; height: auto;' />";
                        helper.setText(htmlBody + "</body></html>", true);
                        helper.addInline("businessCard", imageFile);
                    } else {
                        helper.setText(htmlBody + "</body></html>", true);
                    }
                } catch (Exception e) {
                    helper.setText(htmlBody + "</body></html>", true);
                }
            } else {
                helper.setText(htmlBody + "</body></html>", true);
            }

            if (file != null && !file.isEmpty()) {
                helper.addAttachment(file.getOriginalFilename(), file);
            }

            // 담당자별 첨부파일
            if (managerAttachment != null && !managerAttachment.isEmpty()) {
                File mFile = new File(managerAttachment.startsWith("/") ? managerAttachment.substring(1) : managerAttachment);
                if (mFile.exists()) {
                    helper.addAttachment(mFile.getName().replaceFirst("^[^_]*_", ""), mFile);
                }
            }

            // 추가 첨부파일 (MultipartFile)
            if (extraFiles != null) {
                for (MultipartFile ef : extraFiles) {
                    if (ef != null && !ef.isEmpty()) {
                        helper.addAttachment(ef.getOriginalFilename(), ef);
                    }
                }
            }

            // 추가 첨부파일 (서버 경로)
            if (extraAttachPaths != null) {
                for (String path : extraAttachPaths) {
                    if (path != null && !path.isEmpty()) {
                        File ef = new File(path.startsWith("/") ? path.substring(1) : path);
                        if (ef.exists()) {
                            helper.addAttachment(ef.getName().replaceFirst("^[^_]*_", ""), ef);
                        }
                    }
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
