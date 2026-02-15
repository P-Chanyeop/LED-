# LED Estimate System

LED 자동견적 시스템 - Spring Boot + React Vite

## 프로젝트 구조

```
led-estimate-system/
├── backend/              # Spring Boot (Java 17)
│   ├── src/main/java/    # Java 소스
│   └── pom.xml          # Maven 설정
└── frontend-web/        # React + Vite (Port: 5173)
```

## 기술 스택

- **Backend**: Spring Boot 3.2.0, Java 17
- **Frontend**: React 19, Vite 7, React Router 7
- **Build Tool**: Maven (Wrapper 포함)
- **Package Manager**: npm

## 사전 요구사항

- Java 17 이상
- Node.js 18 이상
- npm 9 이상

## 실행 방법

### 방법 1: IntelliJ IDEA (권장)

1. 프로젝트 열기
2. Run Configurations에서 **`▶️ All Services`** 선택
3. Run 버튼 클릭

### 방법 2: 자동 실행 스크립트

#### macOS / Linux
```bash
./start.sh
```

#### Windows
```cmd
start.bat
```

### 방법 3: 수동 실행

```bash
# 1. Backend (Terminal 1)
cd backend && ./mvnw spring-boot:run

# 2. Frontend (Terminal 2)
cd frontend-web && npm install && npm run dev
```

### 방법 4: IDE에서 main()만 실행

```bash
cd backend && ./mvnw spring-boot:run
```
→ 백엔드 시작 + 프론트엔드 자동 실행

## 접속 URL

| 페이지 | URL | 설명 |
|--------|-----|------|
| **견적 작성** | http://localhost:5173 | 메인 페이지 (PC/태블릿 반응형) |
| **관리자 페이지** | http://localhost:5173/admin | 관리자 기능 |
| **Backend API** | http://localhost:8080 | API 서버 |

## 반응형 디자인

`/` 경로는 화면 크기에 따라 자동으로 레이아웃이 변경됩니다:

- **PC (1024px+)**: 2컬럼 레이아웃
- **태블릿/모바일 (<1024px)**: 1컬럼 레이아웃

## API 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/estimates | 견적 목록 조회 |
| POST | /api/estimates | 견적 생성 |
| GET | /api/estimates/{id} | 견적 상세 조회 |
| DELETE | /api/estimates/{id} | 견적 삭제 |
| GET | /api/products | 제품 목록 조회 |
| POST | /api/calculate | 계산 수행 |

## 문제 해결

### 포트 충돌

#### macOS / Linux
```bash
lsof -ti:8080 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

#### Windows
```cmd
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Maven Wrapper 실행 권한 (macOS/Linux)

```bash
chmod +x backend/mvnw
chmod +x start.sh
```

## 라이선스

Copyright © 2024 LED Estimate System
