@echo off
REM Test Runner for Timeout Feature - Windows Batch Script
REM This script helps run the timeout feature tests

setlocal enabledelayedexpansion

REM Colors (simulated with labels)
color 0B
title Timeout Feature Test Runner

echo.
echo ========================================
echo   TIMEOUT FEATURE TEST RUNNER
echo ========================================
echo.

REM Check if we're in the backend directory
if not exist "package.json" (
    color 0C
    echo ERROR: package.json not found!
    echo Please run this script from the backend directory.
    echo.
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Display menu
:menu
cls
color 0B
echo.
echo ========================================
echo   TIMEOUT FEATURE TEST RUNNER
echo ========================================
echo.
echo Select test to run:
echo.
echo 1. Full Automated Test Suite (recommended)
echo 2. Quick Manual Tests
echo 3. Start Server (if not running)
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto automated
if "%choice%"=="2" goto manual
if "%choice%"=="3" goto server
if "%choice%"=="4" goto exit
goto menu

:automated
cls
color 0B
echo.
echo ========================================
echo   Running Full Automated Test Suite
echo ========================================
echo.
echo Starting tests... This may take 1-2 minutes.
echo.

REM Check if server is running
timeout /t 1 /nobreak >nul
node tests/timeout-test.js
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo Tests completed with errors.
    echo Please check the output above.
)
pause
goto menu

:manual
cls
color 0B
echo.
echo ========================================
echo   Running Quick Manual Tests
echo ========================================
echo.
echo Starting tests... This may take 30-60 seconds.
echo.

node tests/manual-test.js
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo Tests completed with errors.
)
pause
goto menu

:server
cls
color 0B
echo.
echo ========================================
echo   Starting Backend Server
echo ========================================
echo.
echo Server starting on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

npm run dev
goto menu

:exit
color 07
exit /b 0
