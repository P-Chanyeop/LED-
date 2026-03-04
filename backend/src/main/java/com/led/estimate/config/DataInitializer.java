package com.led.estimate.config;

import com.led.estimate.entity.Account;
import com.led.estimate.entity.Manager;
import com.led.estimate.entity.Product;
import com.led.estimate.entity.VxProduct;
import com.led.estimate.repository.AccountRepository;
import com.led.estimate.repository.ManagerRepository;
import com.led.estimate.repository.ProductRepository;
import com.led.estimate.repository.VxProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDate;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final ProductRepository productRepository;
    private final VxProductRepository vxProductRepository;
    private final AccountRepository accountRepository;
    private final ManagerRepository managerRepository;
    
    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            Product p1 = new Product();
            p1.setName("ETK-COB1.2");
            p1.setSize("600x337.5");
            p1.setPixel("1.2");
            p1.setBrightness("800");
            p1.setPower("75/25");
            p1.setResolution("480x270");
            p1.setUnitPrice(950000L);
            productRepository.save(p1);
            
            Product p2 = new Product();
            p2.setName("ETK-COB1.5");
            p2.setSize("600x337.5");
            p2.setPixel("1.5");
            p2.setBrightness("800");
            p2.setPower("70/25");
            p2.setResolution("384x216");
            p2.setUnitPrice(850000L);
            productRepository.save(p2);
        }
        
        if (vxProductRepository.count() == 0) {
            saveVx("VX400", "260만 화소", 4, 2000000L);
            saveVx("VX600", "390만 화소", 6, 3000000L);
            saveVx("VX1000", "650만 화소", 10, 5000000L);
            saveVx("VX2000", "1300만 화소", 20, 8000000L);
        }

        if (accountRepository.count() == 0) {
            Account admin = new Account();
            admin.setUsername("admin");
            admin.setPassword(encrypt("admin123"));
            admin.setEmail("admin@iztec.co.kr");
            admin.setRole("마스터");
            admin.setCreatedAt(LocalDate.now().toString());
            accountRepository.save(admin);
        }

        if (managerRepository.count() == 0) {
            Manager m = new Manager();
            m.setName("기영길");
            m.setDepartment("기획팀");
            m.setPhone("02-6258-1600");
            m.setMobile("010-1234-5678");
            m.setEmail("ky@iztec.co.kr");
            m.setAddress("경기도 남양주시 화도읍 재재기로 190번길 32");
            managerRepository.save(m);
        }
    }
    
    private void saveVx(String model, String resolution, int ports, long price) {
        VxProduct vx = new VxProduct();
        vx.setModelName(model);
        vx.setSupportResolution(resolution);
        vx.setLanPortCount(ports);
        vx.setUnitPrice(price);
        vxProductRepository.save(vx);
    }

    private String encrypt(String data) {
        try {
            Cipher c = Cipher.getInstance("AES");
            c.init(Cipher.ENCRYPT_MODE, new SecretKeySpec("LedEstimate2026!".getBytes(), "AES"));
            return Base64.getEncoder().encodeToString(c.doFinal(data.getBytes()));
        } catch (Exception e) { return data; }
    }
}
