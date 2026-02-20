package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.dto.CalculateRequestDto;
import com.led.estimate.dto.CalculateResponseDto;
import com.led.estimate.service.CalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculate")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CalculationController {
    
    private final CalculationService calculationService;
    
    @PostMapping
    public ApiResponse<CalculateResponseDto> calculate(@RequestBody CalculateRequestDto request) {
        try {
            CalculateResponseDto result = calculationService.calculate(request);
            return ApiResponse.success(result);
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage());
        }
    }
}
