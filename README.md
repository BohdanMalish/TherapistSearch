# Therapists Search App

Full-stack application for searching therapists with filters and infinite scroll.

**Stack:**
- **Frontend:** Ionic + React + TypeScript + Redux Toolkit + RTK Query
- **Backend:** NestJS + TypeScript + LowDB
- **Mobile:** iOS (Capacitor)

---

## 📋 Requirements

Before you begin, ensure you have installed:

- **Node.js** version 20+ ([check](https://nodejs.org/): `node --version`)
- **npm** (comes with Node.js)
- **Xcode** (for iOS development, macOS only)
- **CocoaPods** for iOS dependencies: `brew install cocoapods`

---

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd pet-projects

# Install backend dependencies
cd myApp-backend
npm install
cd ..

# Install frontend dependencies
cd myApp
npm install
cd ..
```

---

## 🖥️ Running Backend (Step 1)

Backend API runs on `http://localhost:3001`

```bash
# Navigate to backend folder
cd myApp-backend

# Start in development mode (with hot-reload)
npm run start:dev

# Or regular start
npm start
```

**Verification:** Open http://localhost:3001/api/specialists — should return JSON with therapists.

### Backend Commands:

```bash
npm run start:dev    # Development mode with auto-restart
npm run start        # Regular start
npm run build        # Build production version
npm run start:prod   # Run production build
```

### Database

Backend uses **LowDB** (JSON file `db.json`). On first run, the file is created automatically with test data.

---

## 🌐 Running Frontend (Step 2)

Frontend runs on `http://localhost:5173`

**Important:** Backend must be running before starting frontend!

### Option A: Run in Browser (fastest way)

```bash
# Navigate to frontend folder
cd myApp

# Start dev server
npm run dev
```

**Opens:** http://localhost:5173

**For mobile view:**
1. Press `F12` (Chrome DevTools)
2. Click phone icon (Toggle device toolbar)
3. Select iPhone from device list

### Option B: Run on iOS Simulator

#### Step 1: Build web assets

```bash
cd myApp
npm run build
```

#### Step 2: Sync with iOS

```bash
npx cap sync ios
```

This command:
- Copies generated files to `ios/App/App/public`
- Syncs Capacitor plugins
- Updates configuration

#### Step 3: Install iOS dependencies (first time only)

```bash
cd ios/App
pod install
cd ../..
```

#### Step 4: Open project in Xcode

```bash
npx cap open ios
```

Or manually:
```bash
open ios/App/App.xcworkspace
```

#### Step 5: Run on simulator

In Xcode:
1. Select iPhone simulator at the top (e.g., **iPhone 15 Pro**)
2. Click **▶️ Play** button or press `Cmd + R`
3. Wait for the app to compile and launch

---

## 🔄 Live Reload on iOS (for development)

To see code changes instantly on simulator:

### Method 1: Via dev server (recommended)

**Terminal 1: Backend**
```bash
cd myApp-backend
npm run start:dev
```

**Terminal 2: Frontend dev server**
```bash
cd myApp
npm run dev
```

**Terminal 3: iOS**
```bash
cd myApp

# Sync and open Xcode
npx cap sync ios
npx cap open ios
```

**In Xcode:** Run the app (▶️)

The app will connect to dev server at `http://localhost:5173`, and all changes will appear automatically! ⚡

**Important:** After development, make sure to remove `server.url` from `capacitor.config.ts` before production build.

### Method 2: Via Capacitor CLI

```bash
cd myApp
npx cap run ios --livereload --external
```

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env file in `myApp-backend/`)

```env
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:8100
```

#### Frontend (.env.local file in `myApp/`)

```env
VITE_API_URL=http://localhost:3001/api
```