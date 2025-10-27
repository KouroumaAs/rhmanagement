@echo off
echo Building Next.js application...
call npm run build

echo Copying public folder to standalone...
xcopy /E /I /Y public .next\standalone\public

echo Copying static folder to standalone...
xcopy /E /I /Y .next\static .next\standalone\.next\static

echo Build completed successfully!
echo Standalone application is ready in .next\standalone\
