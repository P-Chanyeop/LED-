package com.led.estimate.service;

import com.led.estimate.dto.EstimateRequestDto;
import com.led.estimate.entity.Estimate;
import com.led.estimate.repository.EstimateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EstimateService {
    
    private final EstimateRepository estimateRepository;
    
    private LocalDate parseDate(String s) {
        if (s == null || s.isBlank()) return null;
        try { return LocalDate.parse(s); } catch (Exception e) {}
        try { return LocalDate.parse(s, DateTimeFormatter.ofPattern("yyyy.MM.dd")); } catch (Exception e) {}
        return null;
    }
    
    public Estimate createEstimate(EstimateRequestDto request) {
        Estimate estimate = new Estimate();
        estimate.setDate(parseDate(request.getDate()));
        estimate.setManagerName(request.getManagerName());
        estimate.setDepartment(request.getDepartment());
        estimate.setCompanyPhone(request.getCompanyPhone());
        estimate.setMobilePhone(request.getMobilePhone());
        estimate.setEmail(request.getEmail());
        estimate.setCompanyAddress(request.getCompanyAddress());
        
        estimate.setClientCompanyName(request.getClientCompanyName());
        estimate.setClientDepartment(request.getClientDepartment());
        estimate.setClientManager(request.getClientManager());
        estimate.setClientPhone(request.getClientPhone());
        estimate.setClientMobile(request.getClientMobile());
        estimate.setClientEmail(request.getClientEmail());
        
        estimate.setInstallDate(parseDate(request.getInstallDate()));
        estimate.setInstallPeriod(request.getInstallPeriod());
        estimate.setInstallLocation(request.getInstallLocation());
        estimate.setInstallDetailLocation(request.getInstallDetailLocation());
        estimate.setEtcContent(request.getEtcContent());
        
        estimate.setProductName(request.getProductName());
        estimate.setWidth(request.getWidth());
        estimate.setHeight(request.getHeight());
        estimate.setInstallPersonnel(request.getInstallPersonnel());
        estimate.setProcessorModel(request.getProcessorModel());
        
        estimate.setQuantity(request.getQuantity());
        estimate.setLedSize(request.getLedSize());
        estimate.setLedResolution(request.getLedResolution());
        estimate.setTotalPower(request.getTotalPower());
        estimate.setProcessorQuantity(request.getProcessorQuantity());
        estimate.setLedPrice(request.getLedPrice());
        estimate.setProcessorPrice(request.getProcessorPrice());
        estimate.setInstallPrice(request.getInstallPrice());
        estimate.setEtcPrice(request.getEtcPrice());
        estimate.setTravelCost(request.getTravelCost());
        estimate.setTotalPrice(request.getTotalPrice());
        
        return estimateRepository.save(estimate);
    }
    
    public Estimate getEstimate(Long id) {
        return estimateRepository.findById(id).orElse(null);
    }
    
    public List<Estimate> getAllEstimates() {
        return estimateRepository.findAll();
    }
    
    public void deleteEstimate(Long id) {
        estimateRepository.deleteById(id);
    }
}
