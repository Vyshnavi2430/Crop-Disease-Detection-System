import React, { useEffect, useState } from 'react';
import {
  CloudRain,
  Droplets,
  Wind,
  Sun,
  CloudSun,
  Cloud,
  CloudDrizzle,
  CloudLightning,
  MapPin,
  RefreshCw,
  Loader2,
  Navigation
} from 'lucide-react';


import { weatherAPI } from '../services/api';
import { useTranslation } from 'react-i18next';

interface WeatherData {
  location: string;
  state?: string;
  district?: string;
  latitude?: number;
  longitude?: number;

  temperature: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  uvIndex: number;
  condition: string;

  sunrise?: string;
  sunset?: string;

  farmingAdvice: string[];
  alerts: string[];

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

interface GPSLocation {
  latitude: number;
  longitude: number;
}

const INDIAN_STATES_DISTRICTS: Record<string, string[]> = {
  'Andhra Pradesh': [
    'Anakapalli',
    'Anantapur',
    'Bapatla',
    'Chittoor',
    'East Godavari',
    'Eluru',
    'Guntur',
    'Kakinada',
    'Krishna',
    'Kurnool',
    'Nandyal',
    'Nellore',
    'Palnadu',
    'Prakasam',
    'Srikakulam',
    'Tirupati',
    'Visakhapatnam',
    'Vizianagaram',
    'West Godavari'
  ],

  Telangana: [
    'Adilabad',
    'Hyderabad',
    'Jagtial',
    'Jangaon',
    'Jayashankar Bhupalpally',
    'Jogulamba Gadwal',
    'Kamareddy',
    'Karimnagar',
    'Khammam',
    'Komaram Bheem Asifabad',
    'Mahabubabad',
    'Mahbubnagar',
    'Mancherial',
    'Medak',
    'Medchal-Malkajgiri',
    'Mulugu',
    'Nagarkurnool',
    'Nalgonda',
    'Nirmal',
    'Nizamabad',
    'Peddapalli',
    'Rajanna Sircilla',
    'Rangareddy',
    'Sangareddy',
    'Siddipet',
    'Suryapet',
    'Vikarabad',
    'Wanaparthy',
    'Warangal',
    'Yadadri Bhuvanagiri'
  ],

  Karnataka: [
    'Bagalkot',
    'Ballari',
    'Belagavi',
    'Bengaluru Rural',
    'Bengaluru Urban',
    'Bidar',
    'Chamarajanagar',
    'Chikkaballapur',
    'Chikkamagaluru',
    'Chitradurga',
    'Dakshina Kannada',
    'Davanagere',
    'Dharwad',
    'Gadag',
    'Hassan',
    'Haveri',
    'Kalaburagi',
    'Kodagu',
    'Kolar',
    'Koppal',
    'Mandya',
    'Mysuru',
    'Raichur',
    'Ramanagara',
    'Shivamogga',
    'Tumakuru',
    'Udupi',
    'Uttara Kannada',
    'Vijayapura',
    'Yadgir'
  ],

  'Tamil Nadu': [
    'Ariyalur',
    'Chengalpattu',
    'Chennai',
    'Coimbatore',
    'Cuddalore',
    'Dharmapuri',
    'Dindigul',
    'Erode',
    'Kallakurichi',
    'Kanchipuram',
    'Kanyakumari',
    'Karur',
    'Krishnagiri',
    'Madurai',
    'Mayiladuthurai',
    'Nagapattinam',
    'Namakkal',
    'Nilgiris',
    'Perambalur',
    'Pudukkottai',
    'Ramanathapuram',
    'Ranipet',
    'Salem',
    'Sivaganga',
    'Tenkasi',
    'Thanjavur',
    'Theni',
    'Thoothukudi',
    'Tiruchirappalli',
    'Tirunelveli',
    'Tirupathur',
    'Tiruppur',
    'Tiruvallur',
    'Tiruvannamalai',
    'Tiruvarur',
    'Vellore',
    'Viluppuram',
    'Virudhunagar'
  ],

  Kerala: [
    'Alappuzha',
    'Ernakulam',
    'Idukki',
    'Kannur',
    'Kasaragod',
    'Kollam',
    'Kottayam',
    'Kozhikode',
    'Malappuram',
    'Palakkad',
    'Pathanamthitta',
    'Thiruvananthapuram',
    'Thrissur',
    'Wayanad'
  ],

  Maharashtra: [
    'Ahmednagar',
    'Akola',
    'Amravati',
    'Aurangabad',
    'Beed',
    'Bhandara',
    'Buldhana',
    'Chandrapur',
    'Dhule',
    'Gadchiroli',
    'Gondia',
    'Hingoli',
    'Jalgaon',
    'Jalna',
    'Kolhapur',
    'Latur',
    'Mumbai City',
    'Mumbai Suburban',
    'Nagpur',
    'Nanded',
    'Nandurbar',
    'Nashik',
    'Osmanabad',
    'Palghar',
    'Parbhani',
    'Pune',
    'Raigad',
    'Ratnagiri',
    'Sangli',
    'Satara',
    'Sindhudurg',
    'Solapur',
    'Thane',
    'Wardha',
    'Washim',
    'Yavatmal'
  ]
};

const WeatherPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  const [gpsLocation, setGpsLocation] =
    useState<GPSLocation | null>(null);

  const [error, setError] = useState<string | null>(null);

  const getLocationName = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const url = new URL(
        'https://api.bigdatacloud.net/data/reverse-geocode-client'
      );

      url.searchParams.set(
        'latitude',
        latitude.toString()
      );

      url.searchParams.set(
        'longitude',
        longitude.toString()
      );

      url.searchParams.set(
        'localityLanguage',
        'en'
      );

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(
          'Reverse geocoding failed'
        );
      }

      const data = await response.json();

      const city =
        data.city ||
        data.locality ||
        data.localityInfo?.administrative?.[3]?.name ||
        data.principalSubdivision ||
        'Current Location';

      const state =
        data.principalSubdivision || '';

      return {
        city,
        state
      };
    } catch (error) {
      console.warn(
        'Location name lookup failed:',
        error
      );

      return {
        city: 'Current Location',
        state: ''
      };
    }
  };

  const fetchWeather = async (
    state: string,
    district: string,
    lat?: number,
    lng?: number
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await weatherAPI.getWeather(
          state,
          district,
          lat,
          lng
        );

      setWeather(response.data);

    } catch (err: any) {
      console.error(
        'Weather fetch error:',
        err
      );

      setError(
        err?.response?.data?.message ||
        'Unable to fetch weather data.'
      );

      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert(
        t('weather.geoNotSupported', { defaultValue: 'Geolocation is not supported by your browser.' })
      );
      return;
    }

    setLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const {
            latitude,
            longitude
          } = pos.coords;

          setGpsLocation({
            latitude,
            longitude
          });

          const locationInfo =
            await getLocationName(
              latitude,
              longitude
            );

          const response =
            await weatherAPI.getWeather(
              selectedState,
              selectedDistrict,
              latitude,
              longitude
            );

          setWeather({
            ...response.data,

            location:
              locationInfo.state
                ? `${locationInfo.city}, ${locationInfo.state}`
                : locationInfo.city,

            latitude,
            longitude
          });

        } catch (err: any) {
          console.error(
            'GPS weather error:',
            err
          );

          setError(
            t('weather.geoError', { defaultValue: 'Could not get weather for your current location.' })
          );

          alert(
            t('weather.geoError', { defaultValue: 'Could not get weather for your current location.' })
          );
        } finally {
          setLocating(false);
        }
      },

      (geoError) => {
        setLocating(false);

        console.warn(
          'GPS location error:',
          geoError.message
        );

        let message =
          'Could not access your location. Please allow location permission and try again.';

        if (
          geoError.code ===
          geoError.PERMISSION_DENIED
        ) {
          message =
            'Location permission was denied. Please allow location access for localhost.';
        }

        if (
          geoError.code ===
          geoError.POSITION_UNAVAILABLE
        ) {
          message =
            'Your current location could not be determined.';
        }

        if (
          geoError.code ===
          geoError.TIMEOUT
        ) {
          message =
            'Location request timed out. Please try again.';
        }

        setError(message);
        alert(message);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    if (!selectedState || !selectedDistrict) {
      return;
    }

    // Once the user manually selects a location,
    // use the selected state/district.
    setGpsLocation(null);

    fetchWeather(
      selectedState,
      selectedDistrict
    );
  }, [
    selectedState,
    selectedDistrict
  ]);

  const getWeatherIcon = (
    condition: string,
    size = 40
  ) => {
    const value =
      condition.toLowerCase();

    if (
      value.includes('thunder') ||
      value.includes('storm')
    ) {
      return (
        <CloudLightning size={size} />
      );
    }

    if (
      value.includes('rain') ||
      value.includes('drizzle') ||
      value.includes('shower')
    ) {
      return (
        <CloudRain size={size} />
      );
    }

    if (
      value.includes('cloud')
    ) {
      return (
        <CloudSun size={size} />
      );
    }

    if (
      value.includes('clear') ||
      value.includes('sun')
    ) {
      return (
        <Sun size={size} />
      );
    }

    return (
      <Cloud size={size} />
    );
  };

  const translatedLocation =
    weather?.location || '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      

      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('weather.title', {
              defaultValue: 'Weather Forecast'
            })}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {t('weather.subtitle', {
              defaultValue:
                'Get real-time weather information for farming decisions.'
            })}
          </p>
        </div>

        {/* LOCATION CONTROLS */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-6">

          <div className="flex flex-col md:flex-row gap-3">

            {/* STATE */}
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(
                  e.target.value
                );
                setSelectedDistrict('');
                setWeather(null);
                setError(null);
              }}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
            >
              <option value="">
                {t('weather.selectState', { defaultValue: 'Select State' })}
              </option>

              {Object.keys(
                INDIAN_STATES_DISTRICTS
              ).map((state) => (
                <option
                  key={state}
                  value={state}
                >
                  {t(`data.states.${state}`, { defaultValue: state })}
                </option>
              ))}
            </select>

            {/* DISTRICT */}
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(
                  e.target.value
                );
              }}
              disabled={!selectedState}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none disabled:opacity-50"
            >
              <option value="">
                {t('weather.selectDistrict', { defaultValue: 'Select District' })}
              </option>

              {selectedState &&
                INDIAN_STATES_DISTRICTS[
                  selectedState
                ]?.map((district) => (
                  <option
                    key={district}
                    value={district}
                  >
                    {t(`data.districts.${district}`, { defaultValue: district })}
                  </option>
                ))}
            </select>

            {/* GPS */}
            <button
              onClick={handleDetectGPS}
              disabled={locating}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium disabled:opacity-60"
            >
              {locating ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  {t('weather.detecting', { defaultValue: 'Detecting...' })}
                </>
              ) : (
                <>
                  <Navigation size={20} />
                  {t('weather.detectGps', { defaultValue: 'Detect GPS Location' })}
                </>
              )}
            </button>
          </div>

          {gpsLocation && (
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <MapPin size={16} />

              GPS:
              {gpsLocation.latitude.toFixed(5)},
              {gpsLocation.longitude.toFixed(5)}
            </div>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {/* INITIAL STATE */}
        {!weather &&
          !loading &&
          !error && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-10 text-center">

              <MapPin
                size={48}
                className="mx-auto mb-4 text-green-600"
              />

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('weather.selectLocation', { defaultValue: 'Select a location' })}
              </h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {t('weather.subtitle', { defaultValue: 'Select a state and district, or use GPS to get weather for your current location.' })}
              </p>
            </div>
          )}

        {/* LOADING */}
        {loading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 text-center">

            <Loader2
              size={48}
              className="mx-auto mb-4 animate-spin text-green-600"
            />

            <p className="text-gray-600 dark:text-gray-300">
              {t('weather.loading', { defaultValue: 'Loading weather data...' })}
            </p>
          </div>
        )}

        {/* WEATHER */}
        {weather && !loading && (
          <>
            {/* CURRENT WEATHER */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                    <MapPin size={20} />

                    <span>
                      {translatedLocation}
                    </span>
                  </div>

                  <div className="flex items-center gap-5">

                    <div className="text-6xl font-bold text-gray-900 dark:text-white">
                      {weather.temperature}°C
                    </div>

                    <div>
                      <div className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        {getWeatherIcon(
                          weather.condition,
                          30
                        )}

                        {t(`weather.conditions.${weather.condition}`, { defaultValue: weather.condition })}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    weather.latitude !==
                      undefined &&
                    weather.longitude !==
                      undefined
                      ? handleDetectGPS()
                      : fetchWeather(
                          selectedState,
                          selectedDistrict
                        )
                  }
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <RefreshCw size={18} />
                  {t('weather.refresh', { defaultValue: 'Refresh' })}
                </button>
              </div>

              {/* WEATHER STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Droplets size={20} />
                    {t('weather.humidity', { defaultValue: 'Humidity' })}
                  </div>

                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {weather.humidity}%
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20">
                  <div className="flex items-center gap-2 text-sky-600 mb-2">
                    <CloudRain size={20} />
                    {t('weather.rainProbability', { defaultValue: 'Rain Probability' })}
                  </div>

                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {weather.rainProbability}%
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <Wind size={20} />
                    {t('weather.wind', { defaultValue: 'Wind' })}
                  </div>

                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {weather.windSpeed} km/h
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20">
                  <div className="flex items-center gap-2 text-yellow-600 mb-2">
                    <Sun size={20} />
                    {t('weather.uvIndex', { defaultValue: 'UV Index' })}
                  </div>

                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {weather.uvIndex}
                  </div>
                </div>
              </div>
            </div>

            {/* HOURLY FORECAST */}
            {weather.hourlyForecast?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('weather.hourlyForecast', { defaultValue: 'Hourly Forecast' })}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">

                  {weather.hourlyForecast.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 text-center"
                      >
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.time}
                        </div>

                        <div className="flex justify-center my-3 text-green-600">
                          {getWeatherIcon(
                            item.icon,
                            30
                          )}
                        </div>

                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {item.temp}°C
                        </div>

                        <div className="text-xs text-blue-600 mt-1">
                          {t('weather.rain', { defaultValue: 'Rain' })} {item.rainProb}%
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* WEEKLY FORECAST */}
            {weather.weeklyForecast?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('weather.weeklyForecast', { defaultValue: '7-Day Forecast' })}
                </h2>

                <div className="space-y-3">

                  {weather.weeklyForecast.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40"
                      >
                        <div className="w-24 font-medium text-gray-900 dark:text-white">
                          {t(`weather.days.${item.day.toLowerCase()}`, { defaultValue: item.day })}
                        </div>

                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-green-600">
                            {getWeatherIcon(
                              item.condition,
                              30
                            )}
                          </div>

                          <span className="text-gray-600 dark:text-gray-300">
                            {t(`weather.conditions.${item.condition}`, { defaultValue: item.condition })}
                          </span>
                        </div>

                        <div className="text-gray-900 dark:text-white font-semibold">
                          {item.tempMax}° /
                          {item.tempMin}°
                        </div>

                        <div className="text-blue-600 text-sm">
                          {t('weather.rain', { defaultValue: 'Rain' })} {item.rainProb}%
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* SUNRISE / SUNSET */}
            {(weather.sunrise ||
              weather.sunset) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-3">
                    <Sun
                      size={32}
                      className="text-yellow-500"
                    />

                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {t('weather.sunrise', { defaultValue: 'Sunrise' })}
                      </div>

                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {weather.sunrise}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-3">
                    <Sun
                      size={32}
                      className="text-orange-500"
                    />

                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {t('weather.sunset', { defaultValue: 'Sunset' })}
                      </div>

                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {weather.sunset}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FARMING ADVICE */}
            {weather.farmingAdvice?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('weather.farmingAdvice', { defaultValue: 'Farming Advice' })}
                </h2>

                <div className="space-y-3">

                  {weather.farmingAdvice.map(
                    (advice, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20"
                      >
                        <div className="text-green-600 font-bold">
                          ✓
                        </div>

                        <p className="text-gray-700 dark:text-gray-300">
                          {advice}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ALERTS */}
            {weather.alerts?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('weather.alerts', { defaultValue: 'Farming Alerts' })}
                </h2>

                <div className="space-y-3">

                  {weather.alerts.map(
                    (alert, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 text-gray-700 dark:text-gray-300"
                      >
                        {alert}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      
    </div>
  );
};

export { WeatherPage };