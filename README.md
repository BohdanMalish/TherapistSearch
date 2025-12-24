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

### 2. Setup Environment Variables

Create environment files from examples:

```bash
# Backend environment (optional - uses defaults if not created)
cd myApp-backend
cp .env.example .env
cd ..

# Frontend environment (optional - uses defaults if not created)
cd myApp
cp .env.example .env
cd ..
```

**Note:** If you don't create these files, default values will be used (`http://localhost:3001` for backend, `http://localhost:3001/api` for frontend API URL).

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

**Note:** For development, use dev server for hot-reload.

#### Step 1: Start backend (if not running)

```bash
cd myApp-backend
npm run start:dev
```

Keep this terminal running!

#### Step 2: Start frontend dev server (in new terminal)

```bash
cd myApp
npm run dev
```

Keep this terminal running! Frontend will be at `http://localhost:5173`

#### Step 3: Sync with iOS (first time only or after config changes)

```bash
# In myApp folder
npx cap sync ios
```

This command:
- Copies generated files to `ios/App/App/public`
- Syncs Capacitor plugins
- Updates configuration

#### Step 4: Install iOS dependencies (first time only)

```bash
cd ios/App
pod install
cd ../..
```

#### Step 5: Run on iOS Simulator

**⚠️ IMPORTANT:** Make sure both backend (`npm run start:dev`) and frontend (`npm run dev`) are running before this step!

**Option A: Quick run (recommended)**

```bash
# In myApp folder (make sure npm run dev is running!)
npx cap run ios
```

This will automatically build and launch the app on iOS simulator. The app will connect to your running dev server.

**Option B: Via Xcode**

```bash
npx cap open ios
```

Or manually:
```bash
open ios/App/App.xcworkspace
```

Then in Xcode:
1. Select iPhone simulator at the top (e.g., **iPhone 15 Pro**)
2. Click **▶️ Play** button or press `Cmd + R`
3. Wait for the app to compile and launch

**Important:** 
- Backend must be running on `http://localhost:3001`
- Frontend dev server must be running on `http://localhost:5173`
- The app will connect to your local servers automatically
- Changes in code will hot-reload in the simulator!

---

## 🔄 Development Workflow

When developing with iOS simulator:

1. **Keep both servers running:**
   - Terminal 1: `cd myApp-backend && npm run start:dev` (backend)
   - Terminal 2: `cd myApp && npm run dev` (frontend)

2. **Make changes to code** - they will hot-reload automatically in the simulator!

3. **If you change Capacitor config or add plugins:**
   ```bash
   cd myApp
   npx cap sync ios
   ```
   Then rebuild in Xcode.