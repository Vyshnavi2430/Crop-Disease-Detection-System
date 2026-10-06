export type LanguageCode = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'ml' | 'mr';

export interface CommercialBrand {
  brandName: string;
  activeIngredient: string;
  cibrcApproved: boolean;
  dosagePerLiter: string;
  dosageKnapsack15L: string;
  dosageAcre: string;
  phiDays: number;
  applicationTiming: string;
}

export interface DosageGuidance {
  commercialBrands: CommercialBrand[];
  sprayTankCalculator: {
    recommendedWaterLitersPerAcre: number;
    recommendedDosePerLiter: number;
    unit: 'g' | 'ml';
  };
  recoveryNutrients: string[];
  safetyPrecautions: string[];
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  preferredLanguage: LanguageCode;
  state: string;
  district: string;
  profilePhoto?: string;
  themePreference: 'light' | 'dark';
  accessibilityPreferences?: {
    largeText: boolean;
    highContrast: boolean;
  };
  token?: string;
}

export interface ScanReport {
  _id?: string;
  userId?: string;
  diseaseKey?: string;
  uploadedImage: string;
  heatmapUrl?: string;
  cropName?: string;
  diseaseName: string;
  confidenceScore: number;
  confidenceLevel?: 'Low' | 'Medium' | 'High';
  isLowConfidence?: boolean;
  lowConfidenceWarning?: string | null;
  severityLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  diseaseDescription: string;
  symptoms: string[];
  possibleCauses: string[];
  chemicalTreatment: string[];
  organicTreatment: string[];
  fertilizerRecommendations: string[];
  preventionMethods: string[];
  futurePrecautions?: string[];
  weatherImpact?: string;
  recoverySuggestions?: string;
  smartRecommendations: string[];
  topPredictions?: Array<{ class: string; confidence: number }>;
  dosageGuidance?: DosageGuidance;
  environmentalRisk?: {
    environmentalRiskLevel: 'Low' | 'Moderate' | 'High';
    riskScore: number;
    riskFactors: string[];
    environmentalAdvice: string;
    weatherContext?: {
      temperature: number;
      humidity: number;
      rainProbability: number;
      condition: string;
    };
  };
  createdAt?: string;
}

export interface WeatherData {
  location: string;
  state?: string;
  district?: string;
  temperature: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  uvIndex: number;
  condition: string;
  sunrise?: string;
  sunset?: string;
  farmingAdvice?: string[];
  alerts: Array<{
    type: string;
    title: string;
    description: string;
    action: string;
  }>;
  hourlyForecast: Array<{
    time: string;
    temp: number;
    rainProb: number;
    icon: string;
  }>;
  weeklyForecast: Array<{
    day: string;
    condition: string;
    tempMax: number;
    tempMin: number;
    rainProb: number;
  }>;
}

export interface MarketPrice {
  id: string;
  crop: string;
  cropKey?: string;
  state: string;
  stateKey?: string;
  district: string;
  districtKey?: string;
  market: string;
  marketKey?: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  arrivalQuantity?: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  updated: string;
}

export interface GovernmentScheme {
  schemeId: string;
  title: string;
  titleKey?: string;
  shortName: string;
  category: 'all' | 'crop' | 'irrigation' | 'insurance' | 'loans' | 'subsidies' | 'women' | 'dairy' | 'fisheries';
  state?: string;
  overview: string;
  overviewKey?: string;
  eligibility: string[];
  benefits: string[];
  documentsRequired: string[];
  applicationProcess: string[];
  officialUrl: string;
}

export interface AgriShop {
  id: string;
  name: string;
  nameTranslations?: Partial<Record<LanguageCode, string>>;
  type: 'fertilizer_seed' | 'pesticides' | 'equipment' | 'general' | string;
  category?: string;
  state?: string;
  district?: string;
  place?: string;
  town?: string;
  address: string;
  distance?: string;
  rating?: number;
  reviewsCount?: number;
  contact?: string;
  phone?: string;
  timing?: string;
  timings?: string;
  lat?: number;
  lng?: number;
  mapsUrl?: string;
  dataSource?: 'verified' | 'sample' | 'live';
}
