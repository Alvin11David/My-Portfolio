@echo off
echo Starting auto-commit watcher...
powershell -ExecutionPolicy Bypass -File "%~dp0auto-commit.ps1"
pause
