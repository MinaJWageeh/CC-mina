@echo off
chcp 65001 >nul
title Classic Control Studio
cd /d "%~dp0"

echo ====================================================
echo     Classic Control Studio - محاكي الكلاسيك كنترول
echo ====================================================
echo.
echo جاري فحص ملفات التطبيق...

if not exist "dist\index.html" (
    echo [1/2] جاري بناء واجهة التطبيق لأول مرة...
    call npm run build
)

if not exist "dist-electron\main.js" (
    echo [2/2] جاري تجهيز نواة الديسكتوب...
    call npm run build:electron
)

echo جاري فتح البرنامج...
start "" npx electron .
exit
