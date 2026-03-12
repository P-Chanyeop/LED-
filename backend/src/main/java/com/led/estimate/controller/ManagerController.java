package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.entity.Manager;
import com.led.estimate.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/managers")
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerRepository managerRepository;

    private static final String UPLOAD_DIR = "uploads/business-cards/";
    private static final String ATTACH_DIR = "uploads/manager-attachments/";

    @GetMapping
    public ApiResponse<List<Manager>> getAll() {
        return ApiResponse.success(managerRepository.findAll());
    }

    @PostMapping
    public ApiResponse<Manager> create(@RequestBody Manager manager) {
        return ApiResponse.success(managerRepository.save(manager));
    }

    @PostMapping("/with-image")
    public ApiResponse<Manager> createWithImage(
            @RequestParam("name") String name,
            @RequestParam("department") String department,
            @RequestParam("phone") String phone,
            @RequestParam("mobile") String mobile,
            @RequestParam("email") String email,
            @RequestParam("address") String address,
            @RequestParam(value = "emailSubject", required = false) String emailSubject,
            @RequestParam(value = "emailBody", required = false) String emailBody,
            @RequestParam(value = "smtpServer", required = false) String smtpServer,
            @RequestParam(value = "smtpPort", required = false) Integer smtpPort,
            @RequestParam(value = "smtpAccount", required = false) String smtpAccount,
            @RequestParam(value = "smtpPassword", required = false) String smtpPassword,
            @RequestParam(value = "businessCardImage", required = false) MultipartFile file,
            @RequestParam(value = "attachmentFile", required = false) MultipartFile attachFile) throws IOException {
        
        Manager manager = new Manager();
        manager.setName(name);
        manager.setDepartment(department);
        manager.setPhone(phone);
        manager.setMobile(mobile);
        manager.setEmail(email);
        manager.setAddress(address);
        manager.setEmailSubject(emailSubject);
        manager.setEmailBody(emailBody);
        manager.setSmtpServer(smtpServer);
        manager.setSmtpPort(smtpPort);
        manager.setSmtpAccount(smtpAccount);
        manager.setSmtpPassword(smtpPassword);

        if (file != null && !file.isEmpty()) {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), uploadPath.resolve(filename));
            manager.setBusinessCardImage("/uploads/business-cards/" + filename);
        }

        if (attachFile != null && !attachFile.isEmpty()) {
            Path attachPath = Paths.get(ATTACH_DIR);
            if (!Files.exists(attachPath)) Files.createDirectories(attachPath);
            String filename = UUID.randomUUID() + "_" + attachFile.getOriginalFilename();
            Files.copy(attachFile.getInputStream(), attachPath.resolve(filename));
            manager.setAttachmentFile("/uploads/manager-attachments/" + filename);
        }

        return ApiResponse.success(managerRepository.save(manager));
    }

    @PutMapping("/{id}")
    public ApiResponse<Manager> update(@PathVariable Long id, @RequestBody Manager manager) {
        manager.setId(id);
        return ApiResponse.success(managerRepository.save(manager));
    }

    @PutMapping("/{id}/with-image")
    public ApiResponse<Manager> updateWithImage(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("department") String department,
            @RequestParam("phone") String phone,
            @RequestParam("mobile") String mobile,
            @RequestParam("email") String email,
            @RequestParam("address") String address,
            @RequestParam(value = "emailSubject", required = false) String emailSubject,
            @RequestParam(value = "emailBody", required = false) String emailBody,
            @RequestParam(value = "smtpServer", required = false) String smtpServer,
            @RequestParam(value = "smtpPort", required = false) Integer smtpPort,
            @RequestParam(value = "smtpAccount", required = false) String smtpAccount,
            @RequestParam(value = "smtpPassword", required = false) String smtpPassword,
            @RequestParam(value = "businessCardImage", required = false) MultipartFile file,
            @RequestParam(value = "attachmentFile", required = false) MultipartFile attachFile) throws IOException {
        
        Manager manager = managerRepository.findById(id).orElseThrow();
        manager.setName(name);
        manager.setDepartment(department);
        manager.setPhone(phone);
        manager.setMobile(mobile);
        manager.setEmail(email);
        manager.setAddress(address);
        manager.setEmailSubject(emailSubject);
        manager.setEmailBody(emailBody);
        manager.setSmtpServer(smtpServer);
        manager.setSmtpPort(smtpPort);
        manager.setSmtpAccount(smtpAccount);
        manager.setSmtpPassword(smtpPassword);

        if (file != null && !file.isEmpty()) {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), uploadPath.resolve(filename));
            manager.setBusinessCardImage("/uploads/business-cards/" + filename);
        }

        if (attachFile != null && !attachFile.isEmpty()) {
            Path attachPath = Paths.get(ATTACH_DIR);
            if (!Files.exists(attachPath)) Files.createDirectories(attachPath);
            String filename = UUID.randomUUID() + "_" + attachFile.getOriginalFilename();
            Files.copy(attachFile.getInputStream(), attachPath.resolve(filename));
            manager.setAttachmentFile("/uploads/manager-attachments/" + filename);
        }

        return ApiResponse.success(managerRepository.save(manager));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        managerRepository.deleteById(id);
        return ApiResponse.success(null);
    }
}
