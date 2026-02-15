#!/bin/bash

# LED Estimate System - Start Script
# Spring Boot + React Vite

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend-web"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  LED Estimate System - Start Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    if check_port $port; then
        echo -e "${YELLOW}Port $port is already in use. Stopping existing process...${NC}"
        lsof -Pi :$port -sTCP:LISTEN -t | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
}

# Kill existing processes on required ports
echo -e "${YELLOW}Checking for existing processes...${NC}"
kill_port 8080
kill_port 5173

echo ""

# ============================================
# Install Dependencies
# ============================================

# Backend - Install dependencies
echo -e "${BLUE}[1/2] Installing Backend Dependencies...${NC}"
cd "$BACKEND_DIR"
if [ ! -d "$HOME/.m2/repository" ] || [ ! -d "target" ]; then
    echo "Downloading Maven dependencies (first time may take a while)..."
fi
./mvnw clean compile -q
echo -e "${GREEN}✓ Backend dependencies ready${NC}"
echo ""

# Frontend - Install dependencies
echo -e "${BLUE}[2/2] Installing Frontend Dependencies...${NC}"
cd "$FRONTEND_DIR"
if [ ! -d "node_modules" ]; then
    echo "Installing npm packages (first time may take a while)..."
    npm install
else
    echo "node_modules already exists, skipping npm install"
fi
echo -e "${GREEN}✓ Frontend dependencies ready${NC}"
echo ""

# ============================================
# Start Services
# ============================================

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Starting Services...${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Start Backend
echo -e "${GREEN}Starting Spring Boot Backend on port 8080...${NC}"
cd "$BACKEND_DIR"
./mvnw spring-boot:run -q &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
echo ""

# Wait for backend to be ready
echo -e "${YELLOW}Waiting for backend to start...${NC}"
for i in {1..60}; do
    if curl -s http://localhost:8080/actuator/health >/dev/null 2>&1 || curl -s http://localhost:8080/api/estimates >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Backend is ready!${NC}"
        break
    fi
    sleep 1
    if [ $i -eq 60 ]; then
        echo -e "${YELLOW}Backend may still be starting...${NC}"
    fi
done
echo ""

# Start Frontend
echo -e "${GREEN}Starting Frontend on port 5173...${NC}"
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo ""

# ============================================
# Summary
# ============================================

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}  All Services Started Successfully!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Access URLs:${NC}"
echo -e "  ${GREEN}• Frontend (견적 작성):${NC} http://localhost:5173"
echo -e "  ${GREEN}• Admin (관리자):${NC}      http://localhost:5173/admin"
echo -e "  ${GREEN}• Backend API:${NC}         http://localhost:8080"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Trap to kill all processes on exit
trap "echo ''; echo -e '${RED}Stopping all services...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true; exit 0" INT

# Wait for all processes
wait
