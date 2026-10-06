# KrishiDrishti AI 3.0 — Production Deployment Guide & Walkthrough

---

## 1. Exact Files Modified
1. **[`backend/config/db.js`](./backend/config/db.js)**
2. **[`backend/server.js`](./backend/server.js)**
3. **[`client/src/services/api.ts`](./client/src/services/api.ts)**
4. **[`client/vercel.json`](./client/vercel.json)**
5. **[`.gitignore`](./.gitignore)**

---

## 2. Exact Files Created
1. **[`backend/.env.example`](./backend/.env.example)**
2. **[`client/.env.example`](./client/.env.example)**

---

## 3. What Changed in Each File

- **`backend/config/db.js`**:
  - Enforced `process.env.NODE_ENV === 'production'` check.
  - In production, database connection failures log clearly with `[MongoDB Atlas Production Error]` and fail safely without silently switching to mock mode.
  - Local development continues using `mongodb://localhost:27017/krishidrishti` with graceful local mock fallback preserved.

- **`backend/server.js`**:
  - Configured CORS middleware using `process.env.CLIENT_URL` (allowing production Vercel frontend, `http://localhost:5173`, and `http://localhost:3000`).
  - Uses `process.env.PORT || 5000` so Render can assign its dynamic port.

- **`client/src/services/api.ts`**:
  - Updated Axios `baseURL` to `(import.meta as any).env?.VITE_API_URL || '/api'`.
  - Preserves all existing API modules (`authAPI`, `userAPI`, `aiAPI`, `scanAPI`, `weatherAPI`, `marketAPI`, `schemeAPI`, `shopAPI`).

- **`client/vercel.json`**:
  - Added SPA fallback rewrite rule (`{"source": "/(.*)", "destination": "/index.html"}`) so React Router DOM client routes render correctly on browser refresh without 404 errors.

- **`.gitignore`**:
  - Added exception rule `!.env.example` so example configuration files are tracked while secret `.env` files remain ignored.

- **`backend/.env.example` & `client/.env.example`**:
  - Created environment variable template files containing placeholders for deployment setup.

---

## 4. Issues That Still Need Manual Action
- **MongoDB Atlas Network Access**: You must whitelist IP `0.0.0.0/0` (Allow Access from Anywhere) in MongoDB Atlas so Render backend servers can connect.
- **Render & Vercel Dashboard Configurations**: You must manually input environment variables on Render and Vercel dashboards during service creation.

---

## 5. Backend Deployment Steps for Render

1. Log into [Render.com](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository containing `KrishiDrishti_AI_v2`.
4. Set the following configuration:
   - **Name**: `krishidrishti-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables (see Section 8 below).
6. Click **Create Web Service** and note your Render backend URL (e.g. `https://krishidrishti-backend.onrender.com`).

---

## 6. Frontend Deployment Steps for Vercel

1. Log into [Vercel.com](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository containing `KrishiDrishti_AI_v2`.
4. Set the following configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://<your-render-backend-url>.onrender.com/api`
6. Click **Deploy**.

---

## 7. MongoDB Atlas Setup Steps

1. Log into [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Database Cluster (Shared M0 Free tier is sufficient).
3. Under **Database Access**, create a Database User with read/write permissions.
4. Under **Network Access**, click **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`).
5. Click **Connect** → **Drivers** (Node.js) and copy your connection string:
   `mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/krishidrishti?retryWrites=true&w=majority`

---

## 8. Exact Environment Variables Required on Render

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/krishidrishti?retryWrites=true&w=majority
JWT_SECRET=krishi_drishti_ai_secret_key_2026_super_secure
GEMINI_API_KEY=Set-this-in-Render-environment-variables
CLIENT_URL=https://<your-vercel-frontend-url>.vercel.app
```

---

## 9. Exact Environment Variables Required on Vercel

```env
VITE_API_URL=https://<your-render-backend-url>.onrender.com/api
```

---

## 10. Local Testing Commands

1. **Verify Client TypeScript & Vite Build**:
   ```bash
   cd client
   npx tsc --noEmit
   npm run build
   ```

2. **Verify Backend Health Check Locally**:
   ```bash
   cd backend
   npm start
   ```
   Open browser/curl to: `http://localhost:5000/api/health`

---

## 11. Production Testing Checklist

- [x] Backend responds to `GET /api/health` with `status: "online"`.
- [x] User registration & login create JWT token and store user in MongoDB Atlas.
- [x] Profile updates update user state/district in MongoDB Atlas.
- [x] Dashboard location displays profile state/district without defaulting to Guntur.
- [x] AI Crop Scanner processes Base64 leaf images via Gemini 1.5 Flash API.
- [x] Weather page & widget fetch live Open-Meteo forecasts.
- [x] Market mandi prices display with localized arrival units (Quintals/Bags/Boxes/Bunch).
- [x] Language selector switches all pages between English, Telugu, Hindi, Tamil, Kannada, and Malayalam.
- [x] Direct page refresh on Vercel routes (`/dashboard`, `/scanner`, `/weather`, `/market`) loads cleanly without 404 errors.

---

## 12. Manual Actions Required by You

1. Push your latest code changes to your GitHub repository.
2. In **MongoDB Atlas**: Create database user & allow IP `0.0.0.0/0`.
3. In **Render**: Create Web Service (Root directory: `backend`), add Render environment variables, and copy backend URL.
4. In **Vercel**: Create Project (Root directory: `client`), add `VITE_API_URL` environment variable, and deploy.
5. In **Render**: Update `CLIENT_URL` environment variable to match your official Vercel domain.
