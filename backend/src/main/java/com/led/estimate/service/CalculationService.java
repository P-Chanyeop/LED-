package com.led.estimate.service;

import com.led.estimate.dto.CalculateRequestDto;
import com.led.estimate.dto.CalculateResponseDto;
import org.springframework.stereotype.Service;

@Service
public class CalculationService {
    
    private static final double PANEL_WIDTH = 600.0;
    private static final double PANEL_HEIGHT = 337.5;
    private static final int RESOLUTION_WIDTH = 480;
    private static final int RESOLUTION_HEIGHT = 270;
    private static final double POWER_PER_PANEL = 75.0;
    private static final int CABINET_RESOLUTION = 82944;
    private static final int MAX_CABLE_RESOLUTION = 600000;
    
    public CalculateResponseDto calculate(CalculateRequestDto request) {
        CalculateResponseDto response = new CalculateResponseDto();
        
        int w = request.getWidth();
        int h = request.getHeight();
        int totalPanels = w * h;
        
        double totalWidth = w * PANEL_WIDTH;
        double totalHeight = h * PANEL_HEIGHT;
        String ledSize = String.format("%.0f x %.0f", totalWidth, totalHeight);
        
        int totalResW = w * RESOLUTION_WIDTH;
        int totalResH = h * RESOLUTION_HEIGHT;
        String ledResolution = String.format("%d x %d", totalResW, totalResH);
        
        double totalPower = (totalPanels * POWER_PER_PANEL) / 1000.0;
        
        int totalResolution = totalResW * totalResH;
        int cabinetsPerPort = MAX_CABLE_RESOLUTION / CABINET_RESOLUTION;
        int neededPorts = (int) Math.ceil((double) totalResolution / (cabinetsPerPort * CABINET_RESOLUTION));
        
        String vxRecommendation;
        int vxCount;
        if (neededPorts <= 4) {
            vxRecommendation = "VX400";
            vxCount = 1;
        } else if (neededPorts <= 6) {
            vxRecommendation = "VX600";
            vxCount = 1;
        } else if (neededPorts <= 10) {
            vxRecommendation = "VX1000";
            vxCount = 1;
        } else {
            vxRecommendation = "VX2000";
            vxCount = (int) Math.ceil((double) neededPorts / 20);
        }
        
        long ledPrice = totalPanels * 950000L;
        long vxPrice = vxCount * 3000000L;
        long totalPrice = ledPrice + vxPrice;
        
        response.setWidth(w);
        response.setHeight(h);
        response.setTotalPanels(totalPanels);
        response.setLedSize(ledSize);
        response.setLedResolution(ledResolution);
        response.setTotalPower(totalPower);
        response.setVxRecommendation(vxRecommendation);
        response.setVxCount(vxCount);
        response.setLedPrice(ledPrice);
        response.setVxPrice(vxPrice);
        response.setTotalPrice(totalPrice);
        
        return response;
    }
}
