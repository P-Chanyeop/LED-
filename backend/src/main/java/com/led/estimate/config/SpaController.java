package com.led.estimate.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {
    @GetMapping(value = {"/", "/admin", "/login", "/signup"})
    public String forward() {
        return "forward:/index.html";
    }
}
