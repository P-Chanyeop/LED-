package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.entity.Manager;
import com.led.estimate.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/managers")
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerRepository managerRepository;

    @GetMapping
    public ApiResponse<List<Manager>> getAll() {
        return ApiResponse.success(managerRepository.findAll());
    }

    @PostMapping
    public ApiResponse<Manager> create(@RequestBody Manager manager) {
        return ApiResponse.success(managerRepository.save(manager));
    }

    @PutMapping("/{id}")
    public ApiResponse<Manager> update(@PathVariable Long id, @RequestBody Manager manager) {
        manager.setId(id);
        return ApiResponse.success(managerRepository.save(manager));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        managerRepository.deleteById(id);
        return ApiResponse.success(null);
    }
}
