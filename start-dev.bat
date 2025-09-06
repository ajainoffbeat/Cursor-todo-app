@echo off
echo Starting Todo App in Development Mode...
echo.

echo Building and starting services with hot reload...
docker-compose -f docker-compose.dev.yml up --build

pause

