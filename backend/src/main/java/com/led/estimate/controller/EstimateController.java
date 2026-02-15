package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.dto.EstimateRequestDto;
import com.led.estimate.entity.Estimate;
import com.led.estimate.service.EstimateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estimates")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EstimateController {
    
    private final EstimateService estimateService;
    
    @PostMapping
    public ApiResponse<Estimate> createEstimate(@RequestBody EstimateRequestDto request) {
        try {
            Estimate estimate = estimateService.createEstimate(request);
            return ApiResponse.success(estimate);
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage());
        }
    }
    
    @GetMapping
    public ApiResponse<List<Estimate>> getAllEstimates() {
        return ApiResponse.success(estimateService.getAllEstimates());
    }
    
    @GetMapping("/{id}")
    public ApiResponse<Estimate> getEstimate(@PathVariable String id) {
        Estimate estimate = estimateService.getEstimate(id);
        if (estimate == null) {
            return ApiResponse.error("Estimate not found");
        }
        return ApiResponse.success(estimate);
    }
    
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteEstimate(@PathVariable String id) {
        estimateService.deleteEstimate(id);
        return ApiResponse.success(null);
    }
}
