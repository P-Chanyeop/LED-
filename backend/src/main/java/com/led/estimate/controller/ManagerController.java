package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.entity.Manager;
import com.led.estimate.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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

    @Value("${file.upload-dir}")
    private String uploadDir;

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
            @RequestParam(value = "businessCardImage", required = false) MultipartFile file) throws IOException {
        
        Manager manager = new Manager();
        manager.setName(name);
        manager.setDepartment(department);
        manager.setPhone(phone);
        manager.setMobile(mobile);
        manager.setEmail(email);
        manager.setAddress(address);
        manager.setEmailSubject(emailSubject);
        manager.setEmailBody(emailBody);

        if (file != null && !file.isEmpty()) {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir, filename);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            manager.setBusinessCardImage("/files/" + filename);
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
            @RequestParam(value = "businessCardImage", required = false) MultipartFile file) throws IOException {
        
        Manager manager = managerRepository.findById(id).orElseThrow();
        manager.setName(name);
        manager.setDepartment(department);
        manager.setPhone(phone);
        manager.setMobile(mobile);
        manager.setEmail(email);
        manager.setAddress(address);
        manager.setEmailSubject(emailSubject);
        manager.setEmailBody(emailBody);

        if (file != null && !file.isEmpty()) {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir, filename);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            manager.setBusinessCardImage("/files/" + filename);
        }

        return ApiResponse.success(managerRepository.save(manager));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        managerRepository.deleteById(id);
        return ApiResponse.success(null);
    }
}
