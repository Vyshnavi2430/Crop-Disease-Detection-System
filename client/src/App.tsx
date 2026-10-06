import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VoiceAssistant } from './components/VoiceAssistant';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { CropScanner } from './pages/CropScanner';
import { AiAssistant } from './pages/AiAssistant';
import { WeatherPage } from './pages/WeatherPage';
import { GovernmentSchemes } from './pages/GovernmentSchemes';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { NearbyShopsPage } from './pages/NearbyShopsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ScanHistoryPage } from './pages/ScanHistoryPage';
import { HelplinePage } from './pages/HelplinePage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <LanguageProvider>
          <AuthProvider>
            <Router>
              <div className="min-h-screen flex flex-col justify-between bg-emerald-50/30 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
                
                <Navbar />

                <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/scanner" element={<CropScanner />} />
                    <Route path="/chat" element={<AiAssistant />} />
                    <Route path="/weather" element={<WeatherPage />} />
                    <Route path="/schemes" element={<GovernmentSchemes />} />
                    <Route path="/market" element={<MarketPricesPage />} />
                    <Route path="/shops" element={<NearbyShopsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/history" element={<ScanHistoryPage />} />
                    <Route path="/helpline" element={<HelplinePage />} />
                  </Routes>
                </main>

                <VoiceAssistant />

                <Footer />

              </div>
            </Router>
          </AuthProvider>
        </LanguageProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
};

export default App;
