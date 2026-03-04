package com.led.estimate.controller;

import com.led.estimate.dto.ApiResponse;
import com.led.estimate.entity.Account;
import com.led.estimate.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AccountController {

    private final AccountRepository accountRepository;
    private static final String AES_KEY = "LedEstimate2026!";

    @PostMapping("/auth/login")
    public ApiResponse<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        return accountRepository.findByUsername(username)
                .filter(a -> decrypt(a.getPassword()).equals(password))
                .map(a -> ApiResponse.success(Map.<String, Object>of(
                        "id", a.getId(), "username", a.getUsername(),
                        "email", a.getEmail(), "role", a.getRole())))
                .orElse(ApiResponse.error("아이디 또는 비밀번호가 올바르지 않습니다."));
    }

    @PostMapping("/auth/signup")
    public ApiResponse<Void> signup(@RequestBody Map<String, String> body) {
        if (accountRepository.existsByUsername(body.get("username")))
            return ApiResponse.error("이미 존재하는 아이디입니다.");
        Account a = new Account();
        a.setUsername(body.get("username"));
        a.setPassword(encrypt(body.get("password")));
        a.setEmail(body.getOrDefault("email", ""));
        a.setRole("일반");
        a.setCreatedAt(LocalDate.now().toString());
        accountRepository.save(a);
        return ApiResponse.success(null);
    }

    @GetMapping("/accounts")
    public ApiResponse<List<Account>> getAll() {
        List<Account> accounts = accountRepository.findAll();
        accounts.forEach(a -> a.setPassword(null));
        return ApiResponse.success(accounts);
    }

    @PutMapping("/accounts/{id}")
    public ApiResponse<Void> update(@PathVariable Long id, @RequestBody Map<String, String> body) {
        accountRepository.findById(id).ifPresent(a -> {
            if (body.containsKey("username")) a.setUsername(body.get("username"));
            if (body.containsKey("email")) a.setEmail(body.get("email"));
            if (body.containsKey("role")) a.setRole(body.get("role"));
            if (body.containsKey("password") && body.get("password") != null && !body.get("password").isEmpty())
                a.setPassword(encrypt(body.get("password")));
            accountRepository.save(a);
        });
        return ApiResponse.success(null);
    }

    @DeleteMapping("/accounts/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        accountRepository.deleteById(id);
        return ApiResponse.success(null);
    }

    private String encrypt(String data) {
        try {
            Cipher c = Cipher.getInstance("AES");
            c.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(AES_KEY.getBytes(), "AES"));
            return Base64.getEncoder().encodeToString(c.doFinal(data.getBytes()));
        } catch (Exception e) { return data; }
    }

    private String decrypt(String data) {
        try {
            Cipher c = Cipher.getInstance("AES");
            c.init(Cipher.DECRYPT_MODE, new SecretKeySpec(AES_KEY.getBytes(), "AES"));
            return new String(c.doFinal(Base64.getDecoder().decode(data)));
        } catch (Exception e) { return data; }
    }
}
