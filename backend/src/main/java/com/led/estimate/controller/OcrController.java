package com.led.estimate.controller;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import com.led.estimate.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.http.*;
import java.util.*;
import java.util.regex.*;

@RestController
@RequestMapping("/api/ocr")
public class OcrController {

    @Value("${google.vision.api-key:}")
    private String apiKey;

    @PostMapping("/business-card")
    public ApiResponse<Map<String, String>> ocrBusinessCard(@RequestParam("file") MultipartFile file) {
        try {
            String base64 = Base64.getEncoder().encodeToString(file.getBytes());
            String json = """
                {"requests":[{"image":{"content":"%s"},"features":[{"type":"TEXT_DETECTION"}]}]}
                """.formatted(base64);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://vision.googleapis.com/v1/images:annotate?key=" + apiKey))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            String body = response.body();

            // fullTextAnnotation.text 추출


            int idx = body.indexOf("\"text\"");
            if (idx == -1) { System.out.println("Vision API Response: " + body); return ApiResponse.error("텍스트를 인식할 수 없습니다. API 키 또는 응답 확인 필요"); }

            // 마지막 "text" 키가 fullTextAnnotation의 text
            int lastIdx = body.lastIndexOf("\"text\"");
            int start = body.indexOf("\"", lastIdx + 6) + 1;
            int end = body.indexOf("\"", start);
            String text = body.substring(start, end).replace("\\n", "\n");

            return ApiResponse.success(parseBusinessCard(text));
        } catch (Exception e) {
            return ApiResponse.error("OCR 처리 중 오류: " + e.getMessage());
        }
    }

    private Map<String, String> parseBusinessCard(String text) {
        Map<String, String> result = new HashMap<>();
        String[] lines = text.split("\n");
        // 직급 키워드 - 이름 찾는 데 활용
        String titlePattern = "(회장|부회장|사장|부사장|전무이사|전무|상무이사|상무|이사대우|대표이사|대표|이사|감사|고문|본부장|부본부장|실장|부실장|국장|부국장|처장|부처장|단장|소장|원장|관장|센터장|지점장|지사장|공장장|부장|차장|과장|계장|대리|주임|사원|인턴|수습|팀장|부팀장|파트장|그룹장|셀장|유닛장|랩장|수석연구원|책임연구원|선임연구원|연구원|수석|책임|선임|전임|위원|자문위원|수석위원|기술위원|전문위원|교수|부교수|조교수|박사|석사|원감|교감|교장|학장|총장|매니저|시니어매니저|디렉터|시니어디렉터|Manager|Director|General Manager|Assistant Manager|Section Chief|Chief)";
        Set<String> usedLines = new HashSet<>();

        // 1. 이메일
        for (String line : lines) {
            line = line.trim();
            Matcher m = Pattern.compile("[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}").matcher(line);
            if (m.find()) { result.put("email", m.group()); usedLines.add(line); break; }
        }

        // 2. 핸드폰 (010)
        for (String line : lines) {
            line = line.trim();
            Matcher m = Pattern.compile("010[-.\\s]?\\d{3,4}[-.\\s]?\\d{4}").matcher(line);
            if (m.find()) { result.put("mobile", m.group().replaceAll("[.\\s]", "-")); usedLines.add(line); break; }
        }

        // 3. 회사 전화 (010 제외, Tel/TEL/T. 키워드 포함 줄 우선)
        for (String line : lines) {
            line = line.trim();
            if (usedLines.contains(line) || line.contains("010")) continue;
            if (line.matches("(?i).*(Tel|TEL|T\\.).*")) {
                Matcher m = Pattern.compile("(0\\d{1,2})[-.\\s]?(\\d{3,4})[-.\\s]?(\\d{4})").matcher(line);
                if (m.find()) { result.put("phone", m.group(1) + "-" + m.group(2) + "-" + m.group(3)); usedLines.add(line); break; }
            }
        }
        if (!result.containsKey("phone")) {
            for (String line : lines) {
                line = line.trim();
                if (usedLines.contains(line) || line.contains("010")) continue;
                Matcher m = Pattern.compile("(0\\d{1,2})[-.\\s]?(\\d{3,4})[-.\\s]?(\\d{4})").matcher(line);
                if (m.find()) { result.put("phone", m.group(1) + "-" + m.group(2) + "-" + m.group(3)); usedLines.add(line); break; }
            }
        }

        // 4. 회사명 - (주), 주식회사 등 키워드가 있는 줄만
        for (String line : lines) {
            line = line.trim();
            if (usedLines.contains(line)) continue;
            if (line.matches(".*((\\(주\\))|주식회사|㈜|Co\\.|Corp|Inc|Ltd|LLC|CORP|INC|LTD).*")) {
                result.put("company", line.trim());
                usedLines.add(line);
                break;
            }
        }
        if (!result.containsKey("company")) {
            for (String line : lines) {
                String l = line.trim();
                if (usedLines.contains(l) || l.isEmpty()) continue;
                if (l.matches(".*\\d{2,}.*") || l.contains("@") || l.contains("www")) continue;
                result.put("company", l);
                usedLines.add(l);
                break;
            }
        }

        // 5. 이름 - 직급 키워드와 함께 있는 한글 이름 우선
        for (String line : lines) {
            line = line.trim();
            if (usedLines.contains(line)) continue;
            Matcher titleM = Pattern.compile(titlePattern).matcher(line);
            if (titleM.find()) {
                // 직급 제거 후 남은 텍스트에서 한글 2~4자 이름 추출
                String remaining = line.replaceAll(titlePattern, "").replaceAll("[^가-힣]", " ").trim();
                Matcher nameM = Pattern.compile("[가-힣]{2,4}").matcher(remaining);
                if (nameM.find()) { result.put("name", nameM.group()); usedLines.add(line); break; }
            }
        }
        // 직급 없이 단독 한글 2~4자 줄 (전화/이메일/회사/부서 아닌 줄)
        if (!result.containsKey("name")) {
            for (String line : lines) {
                line = line.trim();
                if (usedLines.contains(line)) continue;
                if (line.matches(".*\\d{3,}.*") || line.contains("@") || line.contains("www")) continue;
                Matcher nameM = Pattern.compile("^[가-힣]{2,4}$").matcher(line);
                if (nameM.find()) {
                    result.put("name", nameM.group());
                    usedLines.add(line);
                    break;
                }
            }
        }

        // 6. 부서명 - ~부/팀/실/과/센터
        for (String line : lines) {
            line = line.trim();
            if (usedLines.contains(line)) continue;
            Matcher m = Pattern.compile("(\\S*(?:부|팀|실|과|센터))").matcher(line);
            if (m.find()) {
                String dept = m.group(1);
                if (dept.length() >= 2) { result.put("department", dept); break; }
            }
        }

        return result;
    }
}
