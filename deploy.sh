#!/bin/bash

echo "========================================"
echo "  Tijaniyah Muslim App - Deploy Script"
echo "========================================"
echo

echo "[1/6] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo
echo "[2/6] Testing build..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed"
    exit 1
fi

echo
echo "[3/6] Initializing Git repository..."
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "Initial commit: Tijaniyah Muslim App"
    echo "Git repository initialized"
else
    echo "Git repository already exists"
fi

echo
echo "[4/6] Checking Git status..."
git status

echo
echo "[5/6] Ready for deployment!"
echo
echo "Next steps:"
echo "1. Create a GitHub repository at https://github.com"
echo "2. Push your code to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/tijaniyahmuslimapp.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo
echo "3. Go to https://vercel.com and import your GitHub repository"
echo "4. Deploy!"
echo
echo "OR use Vercel CLI:"
echo "1. npm install -g vercel"
echo "2. vercel login"
echo "3. vercel"
echo

echo "[6/6] Opening deployment guide..."
if command -v xdg-open > /dev/null; then
    xdg-open DEPLOYMENT_GUIDE.md
elif command -v open > /dev/null; then
    open DEPLOYMENT_GUIDE.md
else
    echo "Please open DEPLOYMENT_GUIDE.md for detailed instructions"
fi

echo
echo "Deployment preparation complete!"
echo "Check DEPLOYMENT_GUIDE.md for detailed instructions."
echo
