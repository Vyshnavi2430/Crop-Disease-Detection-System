# KrishiDrishti AI – Smart Farming Assistant
## Comprehensive Project Understanding & Architectural Report

---

### 1. Project Overview
**KrishiDrishti AI** is a full-stack, multilingual smart farming assistant web application tailored for Indian farmers. The application brings together AI-driven crop disease detection, live weather forecasting, market mandis price tracking, government scheme discoverability, nearby agricultural store locators, voice interaction, and multi-language accessibility across 6 major Indian languages.

---

### 2. Problem Statement
Indian farmers face challenges including crop disease loss, fragmented mandi price information, unpredictable micro-weather conditions, literacy and language barriers in accessing complex government portals, and limited access to local agronomic expertise. KrishiDrishti AI addresses this by providing a unified, localized, voice-enabled assistant accessible in their native language.

---

### 3. Target Users
- **Smallholder & Marginal Farmers**: Requiring immediate crop disease diagnosis and organic/chemical remedy recommendations.
- **Commercial Farmers**: Seeking real-time mandi prices and regional weather forecasts to plan harvests and sales.
- **Agricultural Extension Workers & Farmers**: Seeking assistance on government support schemes and certified pesticide/fertilizer retail outlets.

---

### 4. Main Objectives
- **Multilingual Native Interaction**: Provide complete, frictionless translation and voice interaction in English (`en`), Telugu (`te`), Hindi (`hi`), Tamil (`ta`), Kannada (`kn`), and Malayalam (`ml`).
- **AI-Powered Crop Diagnostics**: Leverage Google Gemini Vision AI (`gemini-1.5-flash`) for instant leaf scan analysis, disease classification, severity scoring, and remedial recommendations.
- **Location-Aware Services**: Deliver regional weather forecasts, market mandi prices, and nearby shop listings tailored to the farmer's profile or detected GPS location.
- **Voice & Accessibility**: Support Speech Recognition, Speech Synthesis (TTS), Read Page, Dark Mode, and Large Text accessibility.

---

### 5. Major Features
1. **Personalized Dashboard**: Displays localized welcome greetings, profile/GPS weather forecasts, recent disease scan history, mandi price trends, nearby shops, and government scheme recommendations.
2. **AI Crop Leaf Scanner**: Allows photo uploads or live camera capture for leaf disease analysis, generating detailed reports (causes, symptoms, chemical/organic treatment, fertilizer, prevention).
3. **Multilingual AI Voice & Text Chatbot**: Interactive Q&A powered by Gemini API for agricultural queries in 6 languages.
4. **Weather Forecast Center**: Open-Meteo API integration providing current weather, 24-hour hourly forecast, 7-day weekly forecast, UV index, humidity, wind speed, sunrise/sunset, and agronomic farming advice.
5. **Market Mandi Prices**: Real-time arrival rates, daily price trends (up/down/stable), state/district/market/crop filters, and arrival quantity tracking.
6. **Government Schemes Portal**: Categorized directory of central & state agricultural support programs (PM-KISAN, PMFBY, KCC) with official portal application links.
7. **Nearby Agricultural Shops**: Locator for certified fertilizer, seed, and pesticide dealers with distance, ratings, contact numbers, and location filters.
8. **Emergency Helplines**: One-click dialer directory for Kisan Call Center (1800-180-1551), PM-KISAN, PMFBY, and state disaster helplines.
9. **User Authentication & Profile Management**: JWT-backed registration, login, state/district location preferences, and accessibility settings.
10. **Scan History**: Persistent MongoDB scan storage allowing farmers to review past crop scan reports anytime.

---

### 6. Technology Stack

#### Frontend
- **Framework & Language**: React 18.3.1 + TypeScript 5.2.2
- **Build Tool & Dev Server**: Vite 5.2.11
- **Styling & Icons**: Tailwind CSS 3.4.4 + Lucide React 0.383.0 + React Icons 5.2.1
- **Routing**: React Router DOM 6.23.1
- **Internationalization**: i18next 23.11.5 + react-i18next 14.1.2 + i18next-browser-languagedetector 8.2.1
- **Animation**: Framer Motion 11.2.10
- **HTTP Client**: Axios 1.7.2

#### Backend
- **Runtime & Framework**: Node.js + Express 4.19.2 (CommonJS)
- **Database & ORM**: MongoDB + Mongoose 8.4.1
- **AI Service**: Google Generative AI SDK (`@google/generative-ai` 0.21.0 using `gemini-1.5-flash`)
- **Authentication & Security**: JSON Web Tokens (`jsonwebtoken` 9.0.2) + Passwords Hashing (`bcryptjs` 2.4.3) + CORS 2.8.5
- **File Uploads**: Multer 1.4.5-lts.1
- **Validation**: express-validator 7.1.0

---

### 7. Folder Structure & Architecture Explanation

```
KrishiDristi_AI_v2/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic using mongoose
│   ├── controllers/
│   │   ├── aiController.js       # Handles /api/ai endpoints (analyze crop, chat)
│   │   ├── authController.js     # Handles registration, login, password reset
│   │   ├── marketController.js   # Handles /api/market endpoint
│   │   ├── scanController.js     # Handles saving, getting, deleting scan reports
│   │   ├── schemeController.js   # Handles government scheme queries
│   │   ├── shopController.js     # Handles nearby agri shop listings
│   │   ├── userController.js     # Handles profile retrieval and updates
│   │   └── weatherController.js  # Handles weather endpoint
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware protecting private routes
│   ├── models/
│   │   ├── SavedTip.js           # Mongoose schema for saved farmer tips
│   │   ├── ScanReport.js         # Mongoose schema for crop disease scan reports
│   │   ├── Scheme.js             # Mongoose schema for government schemes
│   │   └── User.js               # Mongoose schema for registered farmers
│   ├── routes/                   # Express router definitions
│   ├── services/
│   │   ├── geminiService.js      # Gemini API integration & crop prompt builder
│   │   ├── marketService.js      # Mandi market price dataset & filtering logic
│   │   └── weatherService.js     # Open-Meteo API client & geocoding service
│   ├── utils/                    # Helper utilities
│   ├── validators/               # Input validation chains
│   ├── .env                      # Environment variables (PORT, MONGODB_URI, GEMINI_API_KEY, JWT_SECRET)
│   └── server.js                 # Backend entry point
├── client/
│   ├── public/                   # Static public assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── CameraModal.tsx   # Live camera snapshot modal for desktop/mobile
│   │   │   ├── Footer.tsx        # Application footer with quick links & accessibility indicators
│   │   │   ├── MarketWidget.tsx  # Dashboard market prices widget
│   │   │   ├── Navbar.tsx        # Top navigation, language selector, dark mode toggle, user profile badge
│   │   │   ├── VoiceAssistant.tsx# Floating AI voice assistant widget
│   │   │   └── WeatherWidget.tsx # Dashboard weather forecast widget
│   │   ├── context/
│   │   │   ├── AccessibilityContext.tsx # High contrast & large text state manager
│   │   │   ├── AuthContext.tsx   # User state & JWT token manager
│   │   │   ├── LanguageContext.tsx# Active language state & i18n switcher
│   │   │   └── ThemeContext.tsx   # Dark/light theme mode manager
│   │   ├── hooks/                # Custom React hooks
│   │   ├── i18n/
│   │   │   └── i18n.ts           # Central i18next configuration & resource dictionaries (457 keys x 6 langs)
│   │   ├── pages/                # 14 page views (Home, Dashboard, CropScanner, Weather, Market, etc.)
│   │   ├── services/
│   │   │   ├── api.ts            # Centralized Axios API service layer
│   │   │   └── speech.ts         # Browser Speech Recognition & SpeechSynthesis (TTS) service
│   │   ├── types/
│   │   │   └── index.ts          # TypeScript interfaces (User, WeatherData, MarketPrice, ScanReport, etc.)
│   │   ├── App.tsx               # Main React router container & provider wrapper
│   │   ├── index.css             # Tailwind directives & theme utilities
│   │   └── main.tsx              # React DOM mounting entrypoint
│   └── vite.config.ts            # Vite build configuration with API proxy rules
```

---

### 8. Frontend Architecture
- **State Management**: Context API (`AuthContext`, `LanguageContext`, `ThemeContext`, `AccessibilityContext`) handles cross-cutting user authentication, active language, theme, and text accessibility.
- **Routing**: React Router DOM provides declarative SPA routing between pages (`/`, `/dashboard`, `/scanner`, `/chat`, `/weather`, `/market`, `/schemes`, `/shops`, `/profile`, `/history`, `/helpline`, `/login`, `/register`).
- **i18n Layer**: All components hook into `useTranslation()`. Dynamic dictionary translation keys support parameterized string interpolation (`t('dashboard.greeting', { name })`).
- **Service Layer**: API calls pass through `client/src/services/api.ts` which automatically attaches JWT Bearer headers from `localStorage.getItem('krishi_token')`.

---

### 9. Backend Architecture
- **Pattern**: Modular MVC / Service pattern (`server.js` → `routes/` → `middleware/` → `controllers/` → `services/` → `models/`).
- **RESTful Endpoints**: Pure JSON API returning structured standard HTTP responses.
- **Middleware**: Express JSON body parser (20MB limit for Base64 image payloads), CORS middleware, and JWT authentication middleware (`protect`).

---

### 10. Database Architecture (MongoDB / Mongoose)
- **`User` Schema**: Stores `name`, `email` (unique), `password` (hashed with bcrypt), `phone`, `state`, `district`, `preferredLanguage`, `highContrast`, `largeText`, `createdAt`.
- **`ScanReport` Schema**: Belongs to `user` (ObjectId ref). Stores `cropName`, `diseaseName`, `confidenceScore`, `severityLevel`, `diseaseDescription`, array of `symptoms`, `possibleCauses`, `chemicalTreatment`, `organicTreatment`, `fertilizerRecommendations`, `preventionMethods`, `futurePrecautions`, `weatherImpact`, `recoverySuggestions`, `smartRecommendations`, `imageUrl`, `analyzedAt`.
- **`Scheme` Schema**: Stores `schemeId`, `title`, `overview`, `benefits`, `eligibility`, `applicationProcess`, `documentsRequired`, `officialUrl`, `state`, `category`.
- **`SavedTip` Schema**: Stores farmer saved agronomic tips associated with `user`.

---

### 11. Authentication Flow
- **Registration**: `POST /api/auth/register` creates user with hashed password and returns JWT token + user profile payload.
- **Login**: `POST /api/auth/login` verifies credentials via bcrypt, returning JWT token + user profile.
- **Persistence**: Token stored in `localStorage.getItem('krishi_token')` and `localStorage.getItem('krishi_user')`.
- **Profile Fetch**: On application mount, `AuthContext` calls `userAPI.getProfile()` to retrieve authenticated user data from MongoDB.

---

### 12. Dashboard Overview
- **Header Banner**: Personalized greeting with farmer name (`t('dashboard.greeting')`), active location, and language badge.
- **Location Resolution Logic**:
  1. Profile saved state + district from MongoDB (`user.state`, `user.district`).
  2. Explicitly detected GPS coordinates (`lat`, `lng`).
  3. Neutral translated message (`t('dashboard.selectLocation')`) — Guntur is **NOT** hardcoded.
- **Widgets**: `WeatherWidget` (current weather & alerts), `MarketWidget` (mandi rates & arrival quantity units), Daily IPM Agronomic Tip, Recent Crop Scans (MongoDB scan history), Nearby Agri Shops card, and Government Schemes card.

---

### 13. Weather System
- **Provider**: Open-Meteo Open API (`https://api.open-meteo.com/v1/forecast`) with Open-Meteo Geocoding API (`https://geocoding-api.open-meteo.com/v1/search`).
- **Data Returned**: Real temperature, condition, humidity, rain probability, wind speed, UV index, 24-hour hourly forecast, 7-day forecast, sunrise/sunset, and automated farming advice tailored to temperature and precipitation.
- **Translation**: Weather condition strings are translated dynamically in UI via `t('weather.conditions.${condition}')`.

---

### 14. GPS / Location Flow
- **Explicit Permission**: GPS permission is requested ONLY when the farmer explicitly clicks "Detect GPS Location".
- **Coordinates & Reverse Geocoding**: Obtains `latitude` and `longitude`, sends them to `weatherAPI.getWeather(state, district, lat, lng)` which uses Open-Meteo reverse geocoding to resolve exact city/district names.
- **No Spoofing**: If GPS fails or is denied, the application displays a friendly translated error alert rather than faking coordinates.

---

### 15. Market Prices System
- **Data Source**: Integrated mandi dataset in `backend/services/marketService.js` covering major agricultural markets across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Maharashtra, etc.
- **Attributes**: `crop`, `market`, `state`, `district`, `minPrice`, `maxPrice`, `modalPrice`, `arrivalQuantity`, `unit`, `trend` (`up`/`down`/`stable`), `change`, `updated`.
- **i18n Units**: Arrival quantities ("Quintals", "Bags", "Boxes", "Bunch") and update dates ("Today", "Yesterday") are parsed and localized via translation keys.

---

### 16. Crop Scanner Flow
1. **Input**: Farmer uploads a leaf photo or takes a snapshot using `CameraModal.tsx`.
2. **Payload**: Image converted to Base64 data URI and transmitted via `POST /api/ai/analyze-crop` along with selected language code.
3. **Gemini Vision**: Image processed by `gemini-1.5-flash` model using specialized structured JSON prompt enforcing analysis in the farmer's language.
4. **Report & Persistence**: Diagnostic report displayed in UI and saved to MongoDB via `POST /api/scan/save`.

---

### 17. Gemini AI Integration
- **SDK**: `@google/generative-ai` with model `gemini-1.5-flash`.
- **Responsibilities**:
  1. Crop leaf disease vision analysis (`analyzeCropDisease`).
  2. Agricultural conversational Q&A (`generateFarmingChatResponse`).
- **Fallback**: Includes structured fallback mock database for tomato, rice, and cotton diseases to guarantee zero downtime during API quota limits or offline testing.

---

### 18. Voice Assistant
- **Speech Recognition**: Browser Web Speech API (`webkitSpeechRecognition`) configured for Indian BCP-47 language tags (`te-IN`, `hi-IN`, `ta-IN`, `kn-IN`, `ml-IN`, `en-IN`).
- **Voice Commands**: Voice navigation commands ("scanner", "weather", "market", "dashboard") trigger instant route redirection.
- **Speech Synthesis (TTS)**: Cleaned markdown-free text spoken using SpeechSynthesis API at a comfortable 0.95x pace for farmers.

---

### 19. Read Page Feature
- **Implementation**: `SpeechService.readCurrentPage(lang)` extracts visible headings (`h1`-`h4`), paragraphs (`p`), and card text from `<main>`, ignoring buttons and icons, and reads content aloud in the active language.

---

### 20. Government Schemes Portal
- **Content**: Detailed schemes including PM-KISAN, PMFBY (Crop Insurance), KCC (Kisan Credit Card), Soil Health Card, PM-KUSUM, and PKVY.
- **Filters**: Filterable by state, search query, and category (Financial, Insurance, Credit, Solar, Organic). All titles, overviews, and benefits are fully localized.

---

### 21. Agricultural Shops Locator
- **Content**: Directory of agricultural input dealers (Seeds, Fertilizers, Pesticides, Equipment) mapped across states, districts, and places.
- **Attributes**: Shop name, owner, contact phone number, address, distance, rating, and category badges.

---

### 22. Emergency Helpline Page
- **Toll-Free Contacts**: One-touch dialer cards for Kisan Call Center (`1800-180-1551`), PM-KISAN Portal Helpline (`155261`), PMFBY Crop Insurance (`1800-180-1551`), and National Disaster Management.

---

### 23. Multilingual i18n Architecture
- **Configuration**: `client/src/i18n/i18n.ts` using `i18next-browser-languagedetector`.
- **Storage**: Active language stored in `localStorage.getItem('krishi_language')`.
- **Completeness**: **457 identical keys per language** across `en`, `te`, `hi`, `ta`, `kn`, `ml` with **0 missing keys**.

---

### 24. API Inventory

| Method | Path | Purpose | Frontend File | Controller | Auth Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user | `Register.tsx` | `authController.register` | No |
| `POST` | `/api/auth/login` | Authenticate user | `Login.tsx` | `authController.login` | No |
| `POST` | `/api/auth/forgot-password` | Request password reset | `ForgotPassword.tsx` | `authController.forgotPassword` | No |
| `GET` | `/api/user/profile` | Get user profile | `AuthContext.tsx`, `ProfilePage.tsx` | `userController.getProfile` | Yes |
| `PUT` | `/api/user/profile` | Update profile settings | `ProfilePage.tsx` | `userController.updateProfile` | Yes |
| `POST` | `/api/ai/analyze-crop` | Analyze leaf disease | `CropScanner.tsx` | `aiController.analyzeCrop` | No |
| `POST` | `/api/ai/chat` | AI agricultural chat | `AiAssistant.tsx`, `VoiceAssistant.tsx` | `aiController.chat` | No |
| `POST` | `/api/scan/save` | Save scan report | `CropScanner.tsx` | `scanController.saveReport` | Yes |
| `GET` | `/api/scan/history` | Get scan history | `Dashboard.tsx`, `ScanHistoryPage.tsx` | `scanController.getHistory` | Yes |
| `DELETE`| `/api/scan/:id` | Delete scan report | `ScanHistoryPage.tsx` | `scanController.deleteReport` | Yes |
| `GET` | `/api/weather` | Fetch weather forecast | `Dashboard.tsx`, `WeatherPage.tsx` | `weatherController.getWeather` | No |
| `GET` | `/api/market` | Fetch market prices | `Dashboard.tsx`, `MarketPricesPage.tsx` | `marketController.getPrices` | No |
| `GET` | `/api/market/locations` | Get market locations | `MarketPricesPage.tsx` | `marketController.getLocations` | No |
| `GET` | `/api/schemes` | Fetch government schemes| `Dashboard.tsx`, `GovernmentSchemes.tsx`| `schemeController.getSchemes` | No |
| `GET` | `/api/shops` | Fetch agri shops | `Dashboard.tsx`, `NearbyShopsPage.tsx` | `shopController.getShops` | No |

---

### 25. Complete Data Flow Map
- **Auth Flow**: `Login.tsx` → `authAPI.login()` → Express `POST /api/auth/login` → MongoDB `User.findOne()` → bcrypt verification → JWT token created → Token stored in `localStorage` → `AuthContext` state updated.
- **Weather Flow**: `WeatherPage.tsx` / `Dashboard.tsx` → `weatherAPI.getWeather()` → Express `GET /api/weather` → `weatherService.getWeatherForLocation()` → Open-Meteo API HTTP Request → Weather JSON response returned → Translated condition displayed in UI.
- **Crop Scanner Flow**: `CropScanner.tsx` → Base64 image payload → `aiAPI.analyzeCropBase64()` → Express `POST /api/ai/analyze-crop` → `geminiService.analyzeCropDisease()` → Gemini 1.5 Flash Vision → JSON report returned → Saved to MongoDB via `scanAPI.saveReport()`.

---

### 26. Real vs Mock Data Audit

#### REAL / DYNAMIC DATA
- User profiles & authentication in MongoDB.
- Crop scan reports saved in MongoDB.
- Live weather forecasts & reverse geocoding from Open-Meteo API.
- AI disease diagnosis & chat answers from Gemini 1.5 Flash API.

#### SAMPLE / MOCK DATA (WITH REAL STRUCTURE)
- Mandi market prices in `marketService.js` (realistic sample prices for Indian mandis).
- Government schemes dataset in `schemeController.js`.
- Agricultural shops dataset in `shopController.js`.

#### HARDCODED DATA
- **None**: All hardcoded Guntur defaults, hardcoded farmer greetings, and unlocalized labels have been successfully refactored to use dynamic profile/GPS data and i18n translation keys.

---

### 27. Current Bugs & Issues Analysis
- **Speech Recognition Auto-Timeout (Low/Medium)**: Web Speech API in Chrome automatically stops listening after 5-10 seconds of silence. This is standard browser API behavior; `VoiceAssistant.tsx` handles this gracefully with restart controls.
- **TTS Voice Fallback (Low)**: On operating systems without preinstalled Telugu/Kannada TTS voices, browser SpeechSynthesis falls back to default system voice (en-IN).

---

### 28. Security Audit
- **JWT Authentication**: Passwords hashed with `bcryptjs` (salt rounds 10). Authentication header verified via Bearer tokens.
- **API Keys**: `GEMINI_API_KEY` stored securely in backend `.env` file (not exposed to client bundle).
- **Recommendation**: Update `MONGODB_URI` to MongoDB Atlas URI for production deployment.

---

### 29. What Is Already Good & Preserved
- Full-stack React + TypeScript + Express + MongoDB architecture.
- Complete 6-language translation dictionary coverage (457 keys per language).
- Open-Meteo weather integration & Gemini AI Vision integration.
- Voice assistant, camera modal, dark mode, high contrast, and large text accessibility.

---

### 30. Recommended Improvements
1. **Mandi Prices Live Integration**: Connect `marketService.js` to data.gov.in AGMARKNET API for live mandi price feeds.
2. **Service Worker / PWA**: Add offline caching for saved scan reports and helpline contacts.

---

### 31. Recommended Final Architecture
```
React 18 + TypeScript (Client SPA)
       ↓
Axios Service Layer (api.ts with Bearer token)
       ↓
Express 4 API Server (backend/server.js)
       ↓
JWT Authentication Middleware (middleware/auth.js)
       ↓
Controllers & Services (geminiService, weatherService, marketService)
       ↓
Database & APIs (MongoDB Mongoose + Gemini API + Open-Meteo API)
```

---

### 32. Priority-Wise Development Plan
1. **Phase 1 (Completed)**: Full i18n localization across all 6 languages, raw key removal, Guntur hardcode removal, and Profile/GPS location sync.
2. **Phase 2 (Next)**: PWA offline support & AGMARKNET live market API integration.
