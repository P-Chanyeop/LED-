package com.led.estimate.config;

import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@Profile("!prod") // 운영환경에서는 실행 안 함
public class FrontendAutoRunner implements ApplicationRunner {

    @Value("${frontend.auto-start:true}")
    private boolean autoStart;

    @Value("${frontend.project-root:..}")
    private String projectRoot;

    private final List<Process> processes = new ArrayList<>();

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!autoStart) {
            log.info("Frontend auto-start is disabled");
            return;
        }

        String rootPath = new File(projectRoot).getAbsolutePath();
        log.info("Starting frontend dev server from: {}", rootPath);

        // Frontend Web (PC/Tablet + Admin 통합)
        startFrontend("Web", rootPath + "/frontend-web", 5173);

        // 종료 훅 등록
        Runtime.getRuntime().addShutdownHook(new Thread(this::stopAll));

        // 잠시 대기 (서버 시작 시간)
        Thread.sleep(3000);
        
        log.info("");
        log.info("========================================");
        log.info("  🚀 Frontend Service Started!");
        log.info("========================================");
        log.info("  Web: http://localhost:5173");
        log.info("  Admin: http://localhost:5173/admin");
        log.info("========================================");
        log.info("");
    }

    private void startFrontend(String name, String path, int port) {
        try {
            File dir = new File(path);
            if (!dir.exists()) {
                log.warn("Frontend {} directory not found: {}", name, path);
                return;
            }

            // OS 확인
            boolean isWindows = System.getProperty("os.name").toLowerCase().contains("win");
            
            ProcessBuilder pb;
            if (isWindows) {
                pb = new ProcessBuilder("cmd", "/c", "npm", "run", "dev");
            } else {
                pb = new ProcessBuilder("npm", "run", "dev");
            }
            
            pb.directory(dir);
            pb.inheritIO(); // 콘솔 출력 상속
            
            Process process = pb.start();
            processes.add(process);
            
            log.info("Started Frontend {} on port {}", name, port);
            
        } catch (Exception e) {
            log.error("Failed to start Frontend {}: {}", name, e.getMessage());
        }
    }

    @PreDestroy
    public void stopAll() {
        log.info("Stopping frontend process...");
        for (Process process : processes) {
            if (process != null && process.isAlive()) {
                process.destroyForcibly();
            }
        }
        processes.clear();
    }
}
