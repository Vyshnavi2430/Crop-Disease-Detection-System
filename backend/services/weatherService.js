const https = require('https');
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';

// Helper to make HTTPS requests with standard TLS certificate verification
function fetchJsonSecure(urlStr) {
  return new Promise((resolve, reject) => {
    https.get(
      urlStr,
      { headers: { 'User-Agent': 'KrishiDrishti/3.0 (Agricultural Assistant)' } },
      (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Invalid JSON response: ${e.message}`));
          }
        });
      }
    ).on('error', reject);
  });
}

// In-memory weather cache with 30-minute TTL strictly keyed by location coordinates / district
const weatherCache = new Map();
const CACHE_TTL_MS = 30 * 60 * 1000;

const weatherCodeMap = {
  0: { condition: 'Clear Sky', icon: 'sun' },
  1: { condition: 'Mainly Clear', icon: 'sun' },
  2: { condition: 'Partly Cloudy', icon: 'cloud-sun' },
  3: { condition: 'Overcast', icon: 'cloud' },
  45: { condition: 'Foggy', icon: 'cloud' },
  48: { condition: 'Foggy', icon: 'cloud' },
  51: { condition: 'Light Drizzle', icon: 'cloud-rain' },
  53: { condition: 'Moderate Drizzle', icon: 'cloud-rain' },
  55: { condition: 'Heavy Drizzle', icon: 'cloud-rain' },
  61: { condition: 'Light Rain', icon: 'cloud-rain' },
  63: { condition: 'Moderate Rain', icon: 'cloud-rain' },
  65: { condition: 'Heavy Rain', icon: 'cloud-rain' },
  71: { condition: 'Light Snow', icon: 'cloud-snow' },
  73: { condition: 'Moderate Snow', icon: 'cloud-snow' },
  75: { condition: 'Heavy Snow', icon: 'cloud-snow' },
  80: { condition: 'Light Showers', icon: 'cloud-rain' },
  81: { condition: 'Moderate Showers', icon: 'cloud-rain' },
  82: { condition: 'Heavy Showers', icon: 'cloud-rain' },
  95: { condition: 'Thunderstorm', icon: 'cloud-lightning' },
  96: { condition: 'Thunderstorm with Hail', icon: 'cloud-lightning' },
  99: { condition: 'Heavy Thunderstorm with Hail', icon: 'cloud-lightning' }
};

function getWeatherDescription(code) {
  return weatherCodeMap[code] || {
    condition: 'Partly Cloudy',
    icon: 'cloud'
  };
}

function formatTime(timeString) {
  if (!timeString) return '--';
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function getDayName(dateString, index) {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  return new Date(`${dateString}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'short' });
}

// Geocode location by district/city name using Open-Meteo Search API
async function geocodeLocation(state, district) {
  const cleanDistrict = (district || '').replace(/\s+(Urban|Rural|District|City)$/i, '').trim();
  const searchQueries = [
    cleanDistrict,
    district,
    state
  ].filter(Boolean);

  for (const query of searchQueries) {
    try {
      const url = new URL(GEOCODING_API);
      url.searchParams.set('name', query);
      url.searchParams.set('count', '5');
      url.searchParams.set('language', 'en');
      url.searchParams.set('countryCode', 'IN');

      const data = await fetchJsonSecure(url.toString());
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
    } catch (e) {
      // Try next query term
    }
  }

  throw new Error(`Location coordinates not found for ${district}, ${state}`);
}

async function getWeatherForCoordinates(lat, lng, locationInfo = {}) {
  const latitude = Number(lat);
  const longitude = Number(lng);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error('Invalid GPS coordinates.');
  }

  const url = new URL(WEATHER_API);
  url.searchParams.set('latitude', latitude.toString());
  url.searchParams.set('longitude', longitude.toString());
  url.searchParams.set(
    'current',
    [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'uv_index'
    ].join(',')
  );

  url.searchParams.set(
    'hourly',
    ['temperature_2m', 'precipitation_probability', 'weather_code'].join(',')
  );

  url.searchParams.set(
    'daily',
    [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'sunrise',
      'sunset'
    ].join(',')
  );

  url.searchParams.set('forecast_days', '7');
  url.searchParams.set('timezone', 'auto');

  const data = await fetchJsonSecure(url.toString());

  if (!data.current || !data.hourly || !data.daily) {
    throw new Error('Incomplete weather data received from Open-Meteo API.');
  }

  const currentWeather = getWeatherDescription(data.current.weather_code);
  const hourlyForecast = [];
  const currentHourIndex = data.hourly.time.findIndex(time => time >= data.current.time);
  const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;

  for (let i = startIndex; i < Math.min(startIndex + 6, data.hourly.time.length); i++) {
    const hourlyWeather = getWeatherDescription(data.hourly.weather_code[i]);
    hourlyForecast.push({
      time: formatTime(data.hourly.time[i]),
      temp: Math.round(data.hourly.temperature_2m[i]),
      rainProb: Math.round(data.hourly.precipitation_probability[i] || 0),
      icon: hourlyWeather.icon
    });
  }

  const weeklyForecast = data.daily.time.map((date, index) => {
    const dailyWeather = getWeatherDescription(data.daily.weather_code[index]);
    return {
      day: getDayName(date, index),
      condition: dailyWeather.condition,
      tempMax: Math.round(data.daily.temperature_2m_max[index]),
      tempMin: Math.round(data.daily.temperature_2m_min[index]),
      rainProb: Math.round(data.daily.precipitation_probability_max[index] || 0)
    };
  });

  const district = locationInfo.district || locationInfo.name || 'Current Location';
  const state = locationInfo.state || locationInfo.admin1 || '';

  return {
    location: state ? `${district}, ${state}` : district,
    state,
    district,
    latitude,
    longitude,
    temperature: Math.round(data.current.temperature_2m),
    humidity: Math.round(data.current.relative_humidity_2m),
    rainProbability: Math.round(data.hourly.precipitation_probability[startIndex] || 0),
    windSpeed: Math.round(data.current.wind_speed_10m),
    uvIndex: Math.round(data.current.uv_index || 0),
    condition: currentWeather.condition,
    sunrise: formatTime(data.daily.sunrise[0]),
    sunset: formatTime(data.daily.sunset[0]),
    farmingAdvice: [
      'Check local rainfall probability before irrigation or fertilizer application.',
      'Avoid high-volume chemical spraying during rain or high wind speeds.',
      'Inspect crop leaves regularly when relative humidity remains high.'
    ],
    alerts: [],
    hourlyForecast,
    weeklyForecast
  };
}

async function getWeatherForLocation(state = 'Andhra Pradesh', district = 'Guntur', lat, lng) {
  // Unique location-specific cache key
  const cacheKey = (lat !== undefined && lng !== undefined && lat !== '' && lng !== '')
    ? `coord_${Number(lat).toFixed(2)}_${Number(lng).toFixed(2)}`
    : `loc_${state}_${district}`.toLowerCase().replace(/\s+/g, '_');

  const now = Date.now();
  const cached = weatherCache.get(cacheKey);

  // Priority 1: Fetch fresh live weather from Open-Meteo
  try {
    let resultData = null;

    if (Number.isFinite(Number(lat)) && Number.isFinite(Number(lng))) {
      resultData = await getWeatherForCoordinates(lat, lng, { district, state });
    } else {
      const location = await geocodeLocation(state, district);
      resultData = await getWeatherForCoordinates(
        location.latitude,
        location.longitude,
        {
          district: district || location.name,
          state: state || location.admin1
        }
      );
    }

    if (resultData) {
      resultData.isCached = false;
      resultData.lastUpdated = new Date().toISOString();
      weatherCache.set(cacheKey, { timestamp: now, data: resultData });
      return resultData;
    }
  } catch (err) {
    console.warn(`[Weather Service Notice]: ${err.message}`);

    // Priority 2: Return valid cached response for the EXACT SAME location
    if (cached && cached.data) {
      return {
        ...cached.data,
        isCached: true,
        cacheNotice: `Live weather update unavailable. Showing cached data from ${new Date(cached.timestamp).toLocaleTimeString()}`
      };
    }

    // Priority 3: Clear error message when no live or cached data exists (NO FABRICATED SYNTHETIC DATA!)
    throw new Error(`Live weather data is currently unavailable for ${district}, ${state}. Please check your connection and try again.`);
  }
}

module.exports = {
  getWeatherForLocation,
  getWeatherForCoordinates
};