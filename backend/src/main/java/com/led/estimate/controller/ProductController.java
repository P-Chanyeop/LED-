package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.entity.Product;
import com.led.estimate.entity.VxProduct;
import com.led.estimate.repository.ProductRepository;
import com.led.estimate.repository.VxProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductRepository productRepository;
    private final VxProductRepository vxProductRepository;
    
    @GetMapping("/led")
    public ApiResponse<List<Product>> getLedProducts() {
        return ApiResponse.success(productRepository.findAll());
    }
    
    @GetMapping("/vx")
    public ApiResponse<List<VxProduct>> getVxProducts() {
        return ApiResponse.success(vxProductRepository.findAll());
    }
    
    @DeleteMapping("/led/{id}")
    public ApiResponse<Void> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ApiResponse.success(null);
    }
    
    @DeleteMapping("/vx/{id}")
    public ApiResponse<Void> deleteVxProduct(@PathVariable Long id) {
        vxProductRepository.deleteById(id);
        return ApiResponse.success(null);
    }
}
