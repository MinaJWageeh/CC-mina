@echo off
chcp 65001 >nul
title Classic Control Studio
cd /d "%~dp0"

echo ===================================================================
echo     Classic Control Studio - محاكي دوائر التحكم الكلاسيكي
echo ===================================================================
echo.

:: 1. Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH!
    echo [خطأ] برنامج Node.js غير مثبت على جهازك.
    echo.
    echo Please download and install Node.js (LTS version) from:
    echo برجاء تحميل وتثبيت Node.js من الرابط التالي:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: 2. Check and install dependencies if needed
if not exist "node_modules\" (
    echo [1/2] Installing dependencies for the first time...
    echo [1/2] جاري تثبيت الحزم والمكتبات لأول مرة (قد يستغرق دقيقة واحدة)...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Failed to install dependencies. Check your internet connection.
        echo [خطأ] فشل تثبيت المكتبات. يرجى التأكد من اتصال الإنترنت.
        pause
        exit /b 1
    )
)

:: 3. Check and build production bundle if missing
if not exist "dist\index.html" (
    echo.
    echo [2/2] Building production bundle...
    echo [2/2] جاري تجهيز وبناء ملفات التطبيق...
    call npm run build
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Build failed.
        pause
        exit /b 1
    )
)

:: 4. Launch Desktop Studio
echo.
echo ===================================================================
echo  جاري فتح البرنامج في نافذة سطح مكتب مستقلة...
echo  Launching Classic Control Studio in native desktop window...
echo ===================================================================
start "" node desktop-runner.js
exit
