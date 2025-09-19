@echo off
echo ========================================
echo   Tijaniyah Muslim App - Deploy Script
echo ========================================
echo.

echo [1/6] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/6] Testing build...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo [3/6] Initializing Git repository...
if not exist .git (
    call git init
    call git add .
    call git commit -m "Initial commit: Tijaniyah Muslim App"
    echo Git repository initialized
) else (
    echo Git repository already exists
)

echo.
echo [4/6] Checking Git status...
call git status

echo.
echo [5/6] Ready for deployment!
echo.
echo Next steps:
echo 1. Create a GitHub repository at https://github.com
echo 2. Push your code to GitHub:
echo    git remote add origin https://github.com/YOUR_USERNAME/tijaniyahmuslimapp.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Go to https://vercel.com and import your GitHub repository
echo 4. Deploy!
echo.
echo OR use Vercel CLI:
echo 1. npm install -g vercel
echo 2. vercel login
echo 3. vercel
echo.

echo [6/6] Opening deployment guide...
start DEPLOYMENT_GUIDE.md

echo.
echo Deployment preparation complete!
echo Check DEPLOYMENT_GUIDE.md for detailed instructions.
echo.
pause
