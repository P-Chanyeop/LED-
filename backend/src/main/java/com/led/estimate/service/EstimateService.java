package com.led.estimate.service;

import com.led.estimate.dto.EstimateRequestDto;
import com.led.estimate.entity.Estimate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EstimateService {
    
    private Map<String, Estimate> estimates = new HashMap<>();
    
    public Estimate createEstimate(EstimateRequestDto request) {
        Estimate estimate = new Estimate();
        String id = UUID.randomUUID().toString();
        
        estimate.setId(id);
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
        
        estimates.put(id, estimate);
        return estimate;
    }
    
    public Estimate getEstimate(String id) {
        return estimates.get(id);
    }
    
    public List<Estimate> getAllEstimates() {
        return new ArrayList<>(estimates.values());
    }
    
    public void deleteEstimate(String id) {
        estimates.remove(id);
    }
}
