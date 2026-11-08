@echo off
chcp 65001 >nul
title Classic Control Studio
cd /d "%~dp0"

echo ====================================================
echo     Classic Control Studio - محاكي الكلاسيك كنترول
echo ====================================================
echo.

if not exist "dist\index.html" (
    echo جاري بناء ملفات التطبيق لأول مرة...
    call npm run build
)

echo جاري فتح البرنامج في نافذة ديسكتوب مستقلة...
start "" node desktop-runner.js
exit
