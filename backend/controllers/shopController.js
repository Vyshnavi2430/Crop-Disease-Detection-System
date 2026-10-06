const fs = require('fs');
const path = require('path');
const AgriShop = require('../models/AgriShop');

// Load JSON dataset from disk
const jsonPath = path.join(__dirname, '../data/agriShops.json');
let jsonShops = [];
let jsonShopTranslationsById = new Map();
try {
  if (fs.existsSync(jsonPath)) {
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    jsonShops = JSON.parse(rawData);
    jsonShopTranslationsById = new Map(
      jsonShops.map(shop => [shop.id, shop.nameTranslations]).filter(([, translations]) => translations)
    );
  }
} catch (err) {
  console.warn('[ShopController] Could not read agriShops.json:', err.message);
}

// Calculate distance in kilometers using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (
    lat1 === undefined || lat1 === null || isNaN(lat1) ||
    lon1 === undefined || lon1 === null || isNaN(lon1) ||
    lat2 === undefined || lat2 === null || isNaN(lat2) ||
    lon2 === undefined || lon2 === null || isNaN(lon2)
  ) {
    return null;
  }
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// @desc Get nearby agricultural shops with state, district, category, and GPS filtering
// @route GET /api/shops
exports.getNearbyShops = async (req, res) => {
  try {
    const { category, type, state, district, place, search, lat, lng } = req.query;
    let allShops = [];

    // Query MongoDB collection first if connected
    try {
      if (AgriShop.db && AgriShop.db.readyState === 1) {
        allShops = await AgriShop.find({}).lean();
      }
    } catch (dbErr) {
      console.warn('[ShopController] MongoDB query failed, using JSON fallback:', dbErr.message);
    }

    if (!allShops || allShops.length === 0) {
      allShops = jsonShops;
    }

    // Existing Atlas records may predate localized names. Enrich them from the
    // canonical JSON record by stable shop ID without changing stored IDs/names.
    allShops = allShops.map(shop => ({
      ...shop,
      nameTranslations: shop.nameTranslations || jsonShopTranslationsById.get(shop.id) || null
    }));

    let result = [...allShops];

    // Filter by State
    if (state) {
      result = result.filter(s =>
        s.state && (
          s.state.toLowerCase() === state.toLowerCase() ||
          s.state.toLowerCase().includes(state.toLowerCase())
        )
      );
    }

    // Filter by District
    if (district) {
      result = result.filter(s =>
        s.district && (
          s.district.toLowerCase() === district.toLowerCase() ||
          s.district.toLowerCase().includes(district.toLowerCase())
        )
      );
    }

    // Filter by Place/Town
    if (place) {
      result = result.filter(s =>
        (s.place && s.place.toLowerCase().includes(place.toLowerCase())) ||
        (s.town && s.town.toLowerCase().includes(place.toLowerCase())) ||
        (s.address && s.address.toLowerCase().includes(place.toLowerCase()))
      );
    }

    // Filter by Category/Type
    const catFilter = category || type;
    if (catFilter && catFilter !== 'all') {
      result = result.filter(s =>
        (s.type && s.type.toLowerCase() === catFilter.toLowerCase()) ||
        (s.category && s.category.toLowerCase().includes(catFilter.toLowerCase()))
      );
    }

    // Filter by Search Query
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.address && s.address.toLowerCase().includes(q)) ||
        (s.district && s.district.toLowerCase().includes(q)) ||
        (s.place && s.place.toLowerCase().includes(q))
      );
    }

    // GPS Proximity Sorting & Distance calculation (ONLY if valid coordinates exist)
    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);

      if (!isNaN(userLat) && !isNaN(userLng)) {
        result = result.map(shop => {
          if (shop.lat !== undefined && shop.lng !== undefined) {
            const distKm = calculateDistance(userLat, userLng, shop.lat, shop.lng);
            if (distKm !== null && !isNaN(distKm)) {
              return {
                ...shop,
                computedDist: distKm,
                distance: `${distKm.toFixed(1)} km`
              };
            }
          }
          // Do NOT fabricate fake distance if coordinates are missing!
          return {
            ...shop,
            computedDist: undefined,
            distance: undefined
          };
        });

        // Sort by computed distance
        result.sort((a, b) => {
          const dA = a.computedDist !== undefined ? a.computedDist : 99999;
          const dB = b.computedDist !== undefined ? b.computedDist : 99999;
          return dA - dB;
        });
      }
    }

    res.json(result);
  } catch (error) {
    console.error('[ShopController Error]:', error);
    res.status(500).json({ message: error.message });
  }
};
