package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.entity.Product;
import com.led.estimate.entity.VxProduct;
import com.led.estimate.repository.ProductRepository;
import com.led.estimate.repository.VxProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductRepository productRepository;
    private final VxProductRepository vxProductRepository;
    
    private static final String UPLOAD_DIR = "uploads/products/";
    
    @GetMapping("/led")
    public ApiResponse<List<Product>> getLedProducts() {
        return ApiResponse.success(productRepository.findAll());
    }
    
    @PostMapping("/led")
    public ApiResponse<Product> createProduct(@RequestBody Product product) {
        return ApiResponse.success(productRepository.save(product));
    }
    
    @PutMapping("/led/{id}")
    public ApiResponse<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        return ApiResponse.success(productRepository.save(product));
    }
    
    @DeleteMapping("/led/{id}")
    public ApiResponse<Void> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ApiResponse.success(null);
    }

    @PutMapping("/led/prices")
    public ApiResponse<Void> updateLedPrices(@RequestBody Map<Long, Long> prices) {
        prices.forEach((id, price) -> productRepository.findById(id).ifPresent(p -> {
            p.setUnitPrice(price);
            productRepository.save(p);
        }));
        return ApiResponse.success(null);
    }
    
    @PostMapping("/upload")
    public ApiResponse<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) return ApiResponse.error("파일이 없습니다");
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), uploadPath.resolve(fileName));
        return ApiResponse.success("/uploads/products/" + fileName);
    }
    
    @GetMapping("/vx")
    public ApiResponse<List<VxProduct>> getVxProducts() {
        return ApiResponse.success(vxProductRepository.findAll());
    }
    
    @PostMapping("/vx")
    public ApiResponse<VxProduct> createVxProduct(@RequestBody VxProduct vxProduct) {
        return ApiResponse.success(vxProductRepository.save(vxProduct));
    }
    
    @PutMapping("/vx/{id}")
    public ApiResponse<VxProduct> updateVxProduct(@PathVariable Long id, @RequestBody VxProduct vxProduct) {
        vxProduct.setId(id);
        return ApiResponse.success(vxProductRepository.save(vxProduct));
    }
    
    @DeleteMapping("/vx/{id}")
    public ApiResponse<Void> deleteVxProduct(@PathVariable Long id) {
        vxProductRepository.deleteById(id);
        return ApiResponse.success(null);
    }

    @PutMapping("/vx/prices")
    public ApiResponse<Void> updateVxPrices(@RequestBody Map<Long, Long> prices) {
        prices.forEach((id, price) -> vxProductRepository.findById(id).ifPresent(v -> {
            v.setUnitPrice(price);
            vxProductRepository.save(v);
        }));
        return ApiResponse.success(null);
    }
}
