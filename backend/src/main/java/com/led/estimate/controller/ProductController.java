package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.entity.Product;
import com.led.estimate.entity.VxProduct;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    
    private List<Product> products = new ArrayList<>();
    private List<VxProduct> vxProducts = new ArrayList<>();
    
    public ProductController() {
        Product product1 = new Product();
        product1.setId("1");
        product1.setName("ETK-COB1.2");
        product1.setSize("600x337.5");
        product1.setPixel("1.2");
        product1.setBrightness("800");
        product1.setPower("75/25");
        product1.setResolution("480x270");
        product1.setUnitPrice(950000);
        products.add(product1);
        
        Product product2 = new Product();
        product2.setId("2");
        product2.setName("ETK-COB1.5");
        product2.setSize("600x337.5");
        product2.setPixel("1.5");
        product2.setBrightness("800");
        product2.setPower("70/25");
        product2.setResolution("384x216");
        product2.setUnitPrice(850000);
        products.add(product2);
        
        VxProduct vx1 = new VxProduct();
        vx1.setId("1");
        vx1.setModelName("VX400");
        vx1.setSupportResolution("260만 화소");
        vx1.setLanPortCount(4);
        vx1.setUnitPrice(2000000);
        vxProducts.add(vx1);
        
        VxProduct vx2 = new VxProduct();
        vx2.setId("2");
        vx2.setModelName("VX600");
        vx2.setSupportResolution("390만 화소");
        vx2.setLanPortCount(6);
        vx2.setUnitPrice(3000000);
        vxProducts.add(vx2);
        
        VxProduct vx3 = new VxProduct();
        vx3.setId("3");
        vx3.setModelName("VX1000");
        vx3.setSupportResolution("650만 화소");
        vx3.setLanPortCount(10);
        vx3.setUnitPrice(5000000);
        vxProducts.add(vx3);
        
        VxProduct vx4 = new VxProduct();
        vx4.setId("4");
        vx4.setModelName("VX2000");
        vx4.setSupportResolution("1300만 화소");
        vx4.setLanPortCount(20);
        vx4.setUnitPrice(8000000);
        vxProducts.add(vx4);
    }
    
    @GetMapping("/led")
    public ApiResponse<List<Product>> getLedProducts() {
        return ApiResponse.success(products);
    }
    
    @GetMapping("/vx")
    public ApiResponse<List<VxProduct>> getVxProducts() {
        return ApiResponse.success(vxProducts);
    }
}
