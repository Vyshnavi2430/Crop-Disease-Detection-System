const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;

if (apiKey && apiKey.trim() !== '') {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (e) {
    console.warn('[Gemini Init]: Invalid API key or initialization error:', e.message);
  }
}

// Fallback intelligent response generator for demo & offline reliability
const mockDiseaseDatabase = [
  {
    cropName: 'Tomato',
    diseaseName: 'Tomato Late Blight (Phytophthora infestans)',
    confidenceScore: 94,
    severityLevel: 'High',
    diseaseDescription: 'Late blight is a destructive disease affecting tomato foliage and fruit caused by Phytophthora infestans. It progresses rapidly during cool, wet conditions.',
    symptoms: [
      'Dark water-soaked spots on leaf edges',
      'White fungal growth on undersides of leaves during high humidity',
      'Brown firm rot on tomato fruits',
      'Rapid wilting of foliage'
    ],
    possibleCauses: [
      'Excessive leaf wetness and humidity (>90%)',
      'Overhead irrigation keeping leaves damp',
      'Infected plant debris left in soil'
    ],
    chemicalTreatment: [
      'Spray Mancozeb 75 WP @ 2.5 g/L water',
      'Apply Metalaxyl + Mancozeb (Ridomil Gold) @ 2g/L water at first sign of disease',
      'Copper oxychloride 50 WP @ 3g/L as protective spray'
    ],
    organicTreatment: [
      'Spray 1% Neem Oil solution with soapy water',
      'Apply Trichoderma viride bio-fungicide @ 5g/L',
      'Baking soda spray (1 tbsp per gallon water with horticultural oil)'
    ],
    fertilizerRecommendations: [
      'Avoid high nitrogen fertilizers during outbreak',
      'Apply potassium sulfate to strengthen cell walls',
      'Ensure balanced Calcium & Boron micronutrient spray'
    ],
    preventionMethods: [
      'Maintain crop spacing of 60cm for good air circulation',
      'Use drip irrigation instead of sprinkler systems',
      'Remove and burn infected leaves immediately'
    ],
    futurePrecautions: [
      'Plant disease-resistant tomato varieties like Arka Rakshak or Arka Samrat',
      'Follow 3-year crop rotation with non-solanaceous crops'
    ],
    weatherImpact: 'High humidity and temperatures between 15°C - 22°C accelerate fungal spore growth.',
    recoverySuggestions: 'Prune lower leaves up to 1 foot above soil level. Apply bio-fungicides every 7-10 days.',
    smartRecommendations: [
      'Schedule fungicide application before expected rainfall',
      'Monitor nearby fields for late blight warnings'
    ]
  },
  {
    cropName: 'Paddy / Rice',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    confidenceScore: 91,
    severityLevel: 'High',
    diseaseDescription: 'Rice blast is one of the most severe diseases of rice causing spindle-shaped lesions on leaves and neck rot on panicles.',
    symptoms: [
      'Spindle-shaped lesions with gray or white centers and brown borders',
      'Lesions enlarge and coalesce causing leaf desiccation',
      'Neck rot causing empty/chaffy panicles'
    ],
    possibleCauses: [
      'Excessive Nitrogen application',
      'High relative humidity (>90%) and night dew',
      'Cloudy weather with mild daytime temperatures (24-28°C)'
    ],
    chemicalTreatment: [
      'Spray Tricyclazole 75 WP @ 0.6 g/L water',
      'Isoprothiolane 40 EC @ 1.5 ml/L water',
      'Azoxystrobin 23% SC @ 1 ml/L water'
    ],
    organicTreatment: [
      'Spray Panchagavya 3% solution at 15-day intervals',
      'Apply Pseudomonas fluorescens @ 10g/L water',
      'Cow dung paste slurry spray'
    ],
    fertilizerRecommendations: [
      'Split Nitrogen applications into 3 doses',
      'Apply Potassium at 50 kg/ha in two splits',
      'Apply Silicon fertilizer to enhance physical barrier'
    ],
    preventionMethods: [
      'Treat seeds with Carbendazim 2g/kg seed before sowing',
      'Maintain proper water level in paddy fields',
      'Avoid dense planting'
    ],
    futurePrecautions: [
      'Grow resistant varieties such as Swarna, Telangana Sona, or BPT 5204 resistant strains'
    ],
    weatherImpact: 'Frequent rains combined with overcast skies encourage blast spore dispersal.',
    recoverySuggestions: 'Drain field for 2 days then re-irrigate. Apply Recommended K dosage immediately.',
    smartRecommendations: [
      'Check leaf color chart (LCC) before applying urea',
      'Ensure field perimeter is weed-free'
    ]
  },
  {
    cropName: 'Cotton',
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
    confidenceScore: 89,
    severityLevel: 'Moderate',
    diseaseDescription: 'Viral disease transmitted by whitefly (Bemisia tabaci) leading to upward/downward leaf curling and vein thickening.',
    symptoms: [
      'Upward and downward cupping of leaves',
      'Thickening of leaf veins on undersides',
      'Enation (cup-like leaf outgrowth) on under surface of leaves',
      'Stunted plant growth and reduced boll formation'
    ],
    possibleCauses: [
      'High population of Whitefly vector',
      'Presence of weed hosts around cotton fields'
    ],
    chemicalTreatment: [
      'Control Whitefly vector with Imidacloprid 17.8 SL @ 0.5 ml/L',
      'Spray Diafenthiuron 50 WP @ 1g/L water',
      'Spiromesifen 22.9 SC @ 1 ml/L'
    ],
    organicTreatment: [
      'Yellow sticky traps @ 15-20 traps per acre',
      'Neem Seed Kernel Extract (NSKE) 5% spray',
      'Verticillium lecanii bio-insecticide @ 5g/L'
    ],
    fertilizerRecommendations: [
      'Apply Zinc Sulfate @ 10 kg/acre to boost immunity',
      'Foliar spray of 1% Potassium Nitrate (13-0-45)'
    ],
    preventionMethods: [
      'Remove and destroy infected plants in early growth stage',
      'Clean border weeds like Xanthium and Abutilon'
    ],
    futurePrecautions: [
      'Plant CLCuV resistant Bt cotton hybrids recommended for your state'
    ],
    weatherImpact: 'Warm dry conditions favor rapid whitefly multiplication.',
    recoverySuggestions: 'Focus on Vector management and micro-nutrient foliar spray to help plants recover foliage.',
    smartRecommendations: [
      'Install sticky traps early at 15 DAP (Days After Planting)'
    ]
  }
];

// Helper to analyze leaf image with Gemini Vision
// Temporary disease detector.
// This will later be replaced by the trained ML model.
async function analyzeCropDisease(
  imageBase64,
  mimeType = 'image/jpeg',
  userLang = 'en'
) {
  if (!genAI) {
    throw new Error(
      'Crop disease analysis service is unavailable.'
    );
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash'
    });

    const languageMap = {
      en: 'English',
      te: 'Telugu',
      hi: 'Hindi',
      kn: 'Kannada',
      ta: 'Tamil',
      mr: 'Marathi'
    };

    const selectedLanguage =
      languageMap[userLang] || 'English';

    const prompt = `You are KrishiDrishti AI, an agricultural assistant for Indian farmers.

Analyze the supplied crop leaf image.

IMPORTANT RULES:
1. Do not randomly guess a disease.
2. If the image is unclear or the crop/disease cannot be identified reliably, return "Unknown".
3. Do not invent symptoms, causes, treatment, or prevention information.
4. Return ONLY valid JSON.
5. confidenceScore must be between 0 and 100.
6. ALL human-readable values in the response MUST be written in ${selectedLanguage}.
7. Keep scientific disease names in their commonly recognized form when necessary, but explain them in ${selectedLanguage}.
8. The response must be suitable for a farmer.

Return exactly this JSON structure:

{
  "cropName": "Crop name or Unknown",
  "diseaseName": "Disease name or Unknown",
  "confidenceScore": 0,
  "severityLevel": "Low | Moderate | High | Critical | Unknown",
  "diseaseDescription": "Short explanation",
  "symptoms": [],
  "possibleCauses": [],
  "chemicalTreatment": [],
  "organicTreatment": [],
  "fertilizerRecommendations": [],
  "preventionMethods": [],
  "futurePrecautions": [],
  "weatherImpact": "",
  "recoverySuggestions": "",
  "smartRecommendations": []
}

Selected farmer language:
${selectedLanguage}`;

    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType
      }
    };

    const result = await model.generateContent([
      prompt,
      imagePart
    ]);

    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error(
        'Invalid analysis response received from AI.'
      );
    }

    const report = JSON.parse(jsonMatch[0]);

    // Validate confidence score
    const confidence = Number(report.confidenceScore);

    if (
      !Number.isFinite(confidence) ||
      confidence < 0 ||
      confidence > 100
    ) {
      report.confidenceScore = 0;
    } else {
      report.confidenceScore = confidence;
    }

    return report;

  } catch (error) {
    console.error(
      '[Crop Analysis Error]:',
      error.message
    );

    // IMPORTANT:
    // Never return a random disease.
    throw new Error(
      'Unable to reliably analyze this crop image. Please upload a clear leaf image and try again.'
    );
  }
}
// Helper to generate AI chatbot responses
async function generateFarmingChatResponse(userMessage, conversationHistory = [], userLang = 'en') {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const systemInstruction = `You are KrishiDrishti AI, a friendly, expert, and empathetic agricultural assistant for Indian farmers. 
Answer questions clearly, concisely, and practically regarding crop diseases, fertilizers, organic farming, pesticides, soil health, weather impact, government schemes (PM-KISAN, PMFBY, KCC), market prices, and harvesting.
User's preferred language code is: ${userLang}. Respond in a helpful tone tailored for farmers.`;

      const chatPrompt = `${systemInstruction}\n\nUser Question: ${userMessage}`;
      const result = await model.generateContent(chatPrompt);
      return result.response.text();
    } catch (error) {
      console.warn('[Gemini Chat Fallback]: Error executing chat completion:', error.message);
    }
  }

  // Intelligent fallback responses based on keywords
  const msgLower = userMessage.toLowerCase();

  if (msgLower.includes('fertilizer') || msgLower.includes('urea') || msgLower.includes('npk')) {
    return `For optimal crop health, ensure balanced NPK application based on soil testing. For cereal crops like Paddy or Wheat, apply 120:60:40 NPK per hectare. Apply Nitrogen in 3 split doses (sowing, tillering, panicle initiation) and apply full Phosphorus & Potassium as basal dose. Consider adding organic compost or Neem Coated Urea to prevent leaching!`;
  }
  if (msgLower.includes('pm-kisan') || msgLower.includes('kisan') || msgLower.includes('scheme')) {
    return `PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) provides ₹6,000 per year to small & marginal farmer families across India in 3 equal installments of ₹2,000 directly into their bank accounts. Eligible farmers can register at pmkisan.gov.in using Aadhaar, bank details, and land records!`;
  }
  if (msgLower.includes('weather') || msgLower.includes('rain') || msgLower.includes('spray')) {
    return `Always check the 48-hour rainfall forecast before spraying pesticides or applying fertilizers. If rain is expected within 4-6 hours, delay spraying to prevent chemical runoff and wasted expense. Spraying early morning or late evening is most effective.`;
  }
  if (msgLower.includes('organic') || msgLower.includes('neem') || msgLower.includes('compost')) {
    return `Organic farming builds healthy soil biology! Use Jeevamrutha or Panchagavya sprays every 15 days to enhance crop immunity. Neem oil (5ml per liter of water with soap solution) is an excellent natural repellent against sucking pests like aphids, whiteflies, and thrips.`;
  }

  return `Namaste! As your KrishiDrishti AI farming assistant, I am here to help you maximize crop yields and protect your fields. For your question about "${userMessage}", we recommend inspecting crop leaves closely for early signs of disease, maintaining balanced irrigation, and utilizing soil card guidance. How else can I support your farming today?`;
}

module.exports = {
  analyzeCropDisease,
  generateFarmingChatResponse
};
