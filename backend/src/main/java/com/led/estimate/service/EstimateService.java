package com.led.estimate.service;

import com.led.estimate.dto.EstimateRequestDto;
import com.led.estimate.entity.Estimate;
import com.led.estimate.repository.EstimateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EstimateService {
    
    private final EstimateRepository estimateRepository;
    
    public Estimate createEstimate(EstimateRequestDto request) {
        Estimate estimate = new Estimate();
        estimate.setDate(request.getDate());
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
        
        estimate.setInstallDate(request.getInstallDate());
        estimate.setInstallPeriod(request.getInstallPeriod());
        estimate.setInstallLocation(request.getInstallLocation());
        estimate.setInstallDetailLocation(request.getInstallDetailLocation());
        estimate.setEtcContent(request.getEtcContent());
        
        estimate.setProductName(request.getProductName());
        estimate.setWidth(request.getWidth());
        estimate.setHeight(request.getHeight());
        estimate.setInstallPersonnel(request.getInstallPersonnel());
        estimate.setProcessorModel(request.getProcessorModel());
        
        int totalPanels = request.getWidth() * request.getHeight();
        estimate.setQuantity(totalPanels);
        estimate.setLedSize(String.format("%.0f x %.0f", request.getWidth() * 600.0, request.getHeight() * 337.5));
        estimate.setLedResolution(String.format("%d x %d", request.getWidth() * 480, request.getHeight() * 270));
        estimate.setTotalPower((totalPanels * 75.0) / 1000.0);
        
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
