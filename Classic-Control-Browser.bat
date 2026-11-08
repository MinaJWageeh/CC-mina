@echo off
chcp 65001 >nul
title Classic Control Studio - Browser Mode
cd /d "%~dp0"

echo ====================================================
echo     Classic Control Studio - وضع المتصفح (Browser)
echo ====================================================
echo.
echo جاري تشغيل خادم التطبيق وفتح المتصفح تلقائياً...

start "" powershell -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:5173'"
call npm run dev
