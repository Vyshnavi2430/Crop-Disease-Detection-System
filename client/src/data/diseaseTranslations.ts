import { DosageGuidance } from '../types';

export interface DiseaseInfo {
  cropName: string;
  diseaseName: string;
  severityLevel: string;
  diseaseDescription: string;
  symptoms: string[];
  possibleCauses: string[];
  chemicalTreatment: string[];
  organicTreatment: string[];
  fertilizerRecommendations: string[];
  preventionMethods: string[];
  futurePrecautions: string[];
  weatherImpact: string;
  recoverySuggestions: string;
  smartRecommendations: string[];
  dosageGuidance?: DosageGuidance;
}

export type SupportedLanguage = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'ml';

export const DISEASE_TRANSLATIONS: Record<string, Record<SupportedLanguage, DiseaseInfo>> = {
  Tomato___Late_blight: {
    en: {
      cropName: 'Tomato',
      diseaseName: 'Tomato Late Blight',
      severityLevel: 'High',
      diseaseDescription: 'Late blight is a serious fungal-like disease that rapidly damages tomato leaves, stems, and fruits, especially in cool, wet weather.',
      symptoms: [
        'Dark brown or water-soaked spots on leaves',
        'Brown lesions spreading rapidly across foliage',
        'White fungal growth under leaves during high humidity',
        'Dark brown lesions on tomato fruits'
      ],
      possibleCauses: [
        'High humidity and prolonged leaf wetness',
        'Frequent rainfall or overhead irrigation',
        'Poor air circulation between plants',
        'Infected plant debris'
      ],
      chemicalTreatment: [
        'Apply Mancozeb-based fungicide according to label directions',
        'Spray Metalaxyl + Mancozeb combination for effective control',
        'Consult local agricultural extension officer for dosage guidance'
      ],
      organicTreatment: [
        'Prune severely infected leaves immediately and destroy them',
        'Spray Trichoderma viride biological culture on soil and foliage',
        'Apply neem oil extract (5ml/L) as a preventive bio-pesticide'
      ],
      fertilizerRecommendations: [
        'Avoid excessive nitrogen fertilizer application',
        'Maintain balanced NPK fertilization',
        'Increase potassium to build plant disease resistance'
      ],
      preventionMethods: [
        'Avoid overhead irrigation; use drip irrigation instead',
        'Maintain proper spacing for healthy air circulation',
        'Destroy infected crop residue after harvest',
        'Avoid handling tomato plants when foliage is wet'
      ],
      futurePrecautions: [
        'Plant late-blight resistant or tolerant tomato varieties',
        'Practice 3-year crop rotation with non-solanaceous crops',
        'Monitor weather forecasts closely during rainy periods'
      ],
      weatherImpact: 'Cool temperatures (15-22°C), high humidity (>80%), and frequent rain drastically accelerate late blight spore spread.',
      recoverySuggestions: 'Remove heavily affected branches, improve air movement, and apply recommended protective sprays.',
      smartRecommendations: [
        'Check local rain forecasts before spraying',
        'Inspect lower leaves daily during humid weather',
        'Keep field clear of volunteer tomato plants'
      ]
    },
    te: {
      cropName: 'టమోటా',
      diseaseName: 'టమోటా లేట్ బ్లైట్ (మచ్చ తెగులు)',
      severityLevel: 'అధికం',
      diseaseDescription: 'లేట్ బ్లైట్ టమోటా పంటను వేగంగా నాశనం చేసే ప్రమాదకరమైన శిలీంధ్ర తెగులు. చల్లని, తేమతో కూడిన వాతావరణంలో ఇది ఆకులు, కాండాలు మరియు కాయలపై త్వరగా వ్యాపిస్తుంది.',
      symptoms: [
        'ఆకులపై నల్లటి గోధుమ రంగు లేదా నీరు పట్టిన మచ్చలు',
        'ఆకుల గుండా వేగంగా వ్యాపించే గోధుమ రంగు గాయాలు',
        'అధిక తేమ ఉన్నప్పుడు ఆకుల అడుగున తెల్లటి బూజు వృద్ధి',
        'టమోటా కాయలపై నల్లటి గోధుమ రంగు దెబ్బతిన్న గుర్తులు'
      ],
      possibleCauses: [
        'అధిక తేమ మరియు ఆకులపై ఎక్కువ సేపు నీరు నిలవడం',
        'తరచుగా వర్షాలు పడటం లేదా పైనుండి నీరు చిలకరించడం',
        'మొక్కల మధ్య సరిపడా గాలి వెలుతురు లేకపోవడం',
        'వ్యాధి సోకిన పాత పంట వ్యర్థాలు'
      ],
      chemicalTreatment: [
        'లేబుల్ సూచనల ప్రకారం మ్యాంకోజెబ్ ఆధారిత శిలీంధ్ర నాశిని పిచికారీ చేయండి',
        'సమర్థవంతమైన నివారణకు మెటలాక్సిల్ + మ్యాంకోజెబ్ మిశ్రమాన్ని వాడండి',
        'మోతాదు వివరాల కోసం స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి'
      ],
      organicTreatment: [
        'తీవ్రంగా దెబ్బతిన్న ఆకులను వెంటనే కోసి నాశనం చేయండి',
        'ట్రైకోడెర్మా విరిడే జీవ శిలీంధ్ర నాశినిని ఆకులపై మరియు నేలలో పిచికారీ చేయండి',
        'ముందస్తు నివారణగా వేపనూనె కషాయం (లీటరు నీటికి 5 మి.లీ) వాడండి'
      ],
      fertilizerRecommendations: [
        'అధికంగా నత్రజని (యూరియా) ఎరువులు వేయడం తగ్గించండి',
        'సమతుల్య NPK ఎరువుల నిర్వహణ పాటించండి',
        'తెగుళ్ల నిరోధకతను పెంచడానికి పొటాషియం ఎరువుల వాడకాన్ని పెంచండి'
      ],
      preventionMethods: [
        'పైనుండి నీటిని చిలకరించవద్దు; బిందు సేద్యం (డ్రిప్) వాడండి',
        'మంచి గాలి ప్రసరణ కోసం సరైన మొక్కల దూరం పాటించండి',
        'పంట పూర్తయ్యాక వ్యాధి సోకిన వ్యర్థాలను తగలేయండి',
        'ఆకులు తడిగా ఉన్నప్పుడు తోటలో పనులు చేయవద్దు'
      ],
      futurePrecautions: [
        'తెగులును తట్టుకునే టమోటా రకాలను ఎంచుకోండి',
        'సోలనేసియే తరగతికి చెందని పంటలతో 3 సంవత్సరాల పంట మార్పిడి చేయండి',
        'వర్షాకాలంలో వాతావరణ నివేదికలను క్రమం తప్పకుండా గమనించండి'
      ],
      weatherImpact: 'చల్లని ఉష్ణోగ్రతలు (15-22°C), అధిక తేమ (80% కంటే ఎక్కువ) మరియు వర్షాలు ఈ తెగులు వ్యాప్తిని తీవ్రతరం చేస్తాయి.',
      recoverySuggestions: 'తీవ్రంగా దెబ్బతిన్న కొమ్మలను తొలగించి, తోటలో గాలి వెలుతురు పెంచి, సిఫార్సు చేసిన మందులను పిచికారీ చేయండి.',
      smartRecommendations: [
        'మందులు పిచికారీ చేసే ముందు వర్ష సూచనను తనిఖీ చేయండి',
        'తేమ ఉన్న రోజుల్లో క్రింది ఆకులను రోజువారీ పరిశీలించండి',
        'చేనులో కలుపు మరియు పాత టమోటా మొక్కలను నివారించండి'
      ]
    },
    hi: {
      cropName: 'टमाटर',
      diseaseName: 'टमाटर पछेती झुलसा (लेट ब्लाइट)',
      severityLevel: 'उच्च',
      diseaseDescription: 'पछेती झुलसा टमाटर की फसल को तेजी से नुकसान पहुंचाने वाला फंगल रोग है, जो ठंडे और नम मौसम में पत्तियों, तनों और फलों को नष्ट कर देता है।',
      symptoms: [
        'पत्तियों पर काले-भूरे या जलीय धब्बे',
        'पत्तियों पर तेजी से फैलने वाले भूरे धब्बे',
        'अधिक नमी में पत्तियों के नीचे सफेद फफूंद दिखना',
        'टमाटर के फलों पर गहरे भूरे रंग के धब्बे'
      ],
      possibleCauses: [
        'उच्च आर्द्रता और पत्तियों पर लंबे समय तक नमी रहना',
        'बार-बार बारिश या ऊपर से सिंचाई करना',
        'पौधों के बीच हवा का सही संचार न होना',
        'संक्रमित फसल के अवशेष'
      ],
      chemicalTreatment: [
        'मैनकोजेब आधारित फफूंदनाशी का लेबल निर्देशानुसार छिड़काव करें',
        'प्रभावी नियंत्रण के लिए मेटलैक्सिल + मैनकोजेब का उपयोग करें',
        'सही मात्रा के लिए स्थानीय कृषि विशेषज्ञ की सलाह लें'
      ],
      organicTreatment: [
        'संक्रमित पत्तियों को तुरंत तोड़कर नष्ट कर दें',
        'ट्राइकोडरमा विरिडी जैविक घोल का पत्तियों पर छिड़काव करें',
        'रोकथाम के लिए नीम तेल (5 मिली/लीटर) का प्रयोग करें'
      ],
      fertilizerRecommendations: [
        'अत्यधिक नाइट्रोजन (यूरिया) का प्रयोग बंद करें',
        'संतुलित एनपीके उर्वरक का उपयोग करें',
        'रोग प्रतिरोधक क्षमता बढ़ाने के लिए पोटाश की मात्रा बढ़ाएं'
      ],
      preventionMethods: [
        'ऊपर से पानी देने से बचें; ड्रिप सिंचाई का प्रयोग करें',
        'हवा के उचित बहाव के लिए पौधों के बीच पर्याप्त दूरी रखें',
        'फसल कटाई के बाद रोगी अवशेषों को जला दें',
        'गीली पत्तियों को छूने से बचें'
      ],
      futurePrecautions: [
        'झुलसा प्रतिरोधी टमाटर की किस्मों का चयन करें',
        'फसल चक्र (क्रॉप रोटेशन) का सख्ती से पालन करें',
        'बरसात के मौसम में मौसम पूर्वानुमान पर नजर रखें'
      ],
      weatherImpact: 'ठंडा तापमान (15-22°C), उच्च नमी (80% से अधिक) और बारिश इस बीमारी के प्रकोप को बहुत बढ़ा देती है।',
      recoverySuggestions: 'अत्यधिक प्रभावित हिस्सों को काटकर निकालें और अनुशंसित फफूंदनाशी का छिड़काव करें।',
      smartRecommendations: [
        'छिड़काव से पहले बारिश का पूर्वानुमान अवश्य देखें',
        'नमी वाले दिनों में निचली पत्तियों की रोज जांच करें',
        'खेत को हमेशा साफ-सुथरा रखें'
      ]
    },
    ta: {
      cropName: 'தக்காளி',
      diseaseName: 'தக்காளி பிந்தைய வெடிப்பு நோய் (Late Blight)',
      severityLevel: 'அதிகம்',
      diseaseDescription: 'லேட் பிளைட் என்பது தக்காளியின் இலைகள், தண்டுகள் மற்றும் பழங்களை அதிவேகமாக அழிக்கும் பூஞ்சை நோயாகும்.',
      symptoms: [
        'இலைகளில் அடர் பழுப்பு நிற புள்ளிகள்',
        'இலை முழுவதும் வேகமாக பரவும் பழுப்பு புண்கள்',
        'ஈரப்பதம் அதிகமாக இருக்கும் போது இலையின் அடியில் வெள்ளை பூஞ்சை',
        'தக்காளி பழங்களில் கருமை நிற புண்கள்'
      ],
      possibleCauses: [
        'அதிக ஈரப்பதம் மற்றும் இலைகளில் நீர் தங்குவது',
        'அடிக்கடி மழை அல்லது தெளிப்பு பாசனம்',
        'செடிகளுக்கு இடையே காற்று புழக்கம் இல்லாமை',
        'பாதிக்கப்பட்ட முந்தைய பயிர் கழிவுகள்'
      ],
      chemicalTreatment: [
        'மேன்கோசெப் (Mancozeb) பூஞ்சைக் கொல்லியை தெளிக்கவும்',
        'மெட்டாலாக்சில் + மேன்கோசெப் கலவையை பயன்படுத்தவும்',
        'வேளாண் அலுவலரின் ஆலோசனையைப் பெறவும்'
      ],
      organicTreatment: [
        'பாதிக்கப்பட்ட இலைகளை அகற்றி அழிக்கவும்',
        'டிரைகோடெர்மா விரிடி (Trichoderma viride) தெளிக்கவும்',
        'வேப்ப எண்ணெய் (5 மி.லி/லிட்டர்) தெளிக்கவும்'
      ],
      fertilizerRecommendations: [
        'அதிக நைட்ரஜன் உரமிடுவதை தவிர்க்கவும்',
        'சீரான NPK உரமிடுதலை பின்பற்றவும்',
        'பொட்டாஷ் உரத்தை அதிகரித்து நோய் எதிர்ப்பு திறனை கூட்டவும்'
      ],
      preventionMethods: [
        'சொட்டு நீர் பாசன முறையை பயன்படுத்தவும்',
        'செடிகளுக்கு இடையே சரியான இடைவெளி பராமரிக்கவும்',
        'பயிர் கழிவுகளை எரிக்கவும்'
      ],
      futurePrecautions: [
        'நோய் எதிர்ப்பு திறன் கொண்ட ரகங்களை பயிரிடவும்',
        'பயிர் சுழற்சி முறையை பின்பற்றவும்'
      ],
      weatherImpact: 'குளிர்ந்த வானிலை மற்றும் மழை நோயை தீவிரமாக்கும்.',
      recoverySuggestions: 'பாதிக்கப்பட்ட பாகங்களை அகற்றி பூஞ்சைக் கொல்லி தெளிக்கவும்.',
      smartRecommendations: [
        'மழை முன்னறிவிப்பை பார்த்து தெளிக்கவும்',
        'இலைகளை தினமும் பரிசோதிக்கவும்'
      ]
    },
    kn: {
      cropName: 'ಟೊಮೆಟೊ',
      diseaseName: 'ಟೊಮೆಟೊ ತಡವಾದ ಅಂಗಮಾರಿ (Late Blight)',
      severityLevel: 'ಹೆಚ್ಚು',
      diseaseDescription: 'ಲೇಟ್ ಬ್ಲೈಟ್ ಟೊಮೆಟೊ ಬೆಳೆಗೆ ಶೀಘ್ರವಾಗಿ ಹಾನಿ ಮಾಡುವ ಮಾರಕ ಶಿಲೀಂಧ್ರ ರೋಗವಾಗಿದೆ.',
      symptoms: [
        'ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಕಂದು ಬಣ್ಣದ ಚುಕ್ಕೆಗಳು',
        'ಎಲೆಗಳ ಉದ್ದಕ್ಕೂ ವೇಗವಾಗಿ ಹರಡುವ ಗಾಯಗಳು',
        'ಹೆಚ್ಚಿನ ತೇವಾಂಶದಲ್ಲಿ ಎಲೆಯ ಕೆಳಗೆ ಬಿಳಿ ಶಿಲೀಂಧ್ರ ಬೆಳೆ',
        'ಹಣ್ಣುಗಳ ಮೇಲೆ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು'
      ],
      possibleCauses: [
        'ಹೆಚ್ಚಿನ ತೇವಾಂಶ ಮತ್ತು ಎಲೆಗಳ ಮೇಲೆ ನೀರು ನಿಲ್ಲುವುದು',
        'ಸತತ ಮಳೆ ಅಥವಾ ಮೇಲಿಂದ ನೀರು ಹಾಕುವುದು',
        'ಸಸಿಗಳ ನಡುವೆ ಗಾಳಿಯ ಕೊರತೆ'
      ],
      chemicalTreatment: [
        'ಮ್ಯಾಂಕೋಜೆಬ್ ಆಧಾರಿತ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ',
        'ಮೆಟಲಾಕ್ಸಿಲ್ + ಮ್ಯಾಂಕೋಜೆಬ್ ಮಿಶ್ರಣ ಬಳಸಿ'
      ],
      organicTreatment: [
        'ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ಕತ್ತರಿಸಿ ನಾಶಪಡಿಸಿ',
        'ಟ್ರೈಕೋಡರ್ಮಾ ಜೈವಿಕ ಗೊಬ್ಬರ ಬಳಸಿ',
        'ಬೇವು ಎಣ್ಣೆ (೫ ಮಿ.ಲೀ/ಲೀ) ಸಿಂಪಡಿಸಿ'
      ],
      fertilizerRecommendations: [
        'ಹೆಚ್ಚು ಸಾರಜನಕ (ಯೂರಿಯಾ) ಹಾಕಬೇಡಿ',
        'ಸಮತೋಲಿತ NPK ಗೊಬ್ಬರ ನೀಡಿ',
        'ಪೊಟ್ಯಾಶ್ ಪ್ರಮಾಣ ಹೆಚ್ಚಿಸಿ'
      ],
      preventionMethods: [
        'ಹನಿ ನೀರಾವರಿ ಬಳಸಿ',
        'ಸರಿಯಾದ ಸಸಿ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ'
      ],
      futurePrecautions: [
        'ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
        'ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ'
      ],
      weatherImpact: 'ತಂಪಾದ ವಾತಾವರಣ ಮತ್ತು ಮಳೆ ರೋಗವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.',
      recoverySuggestions: 'ಸೋಂಕಿತ ಭಾಗಗಳನ್ನು ತೆಗೆದು ಔಷಧ ಸಿಂಪಡಿಸಿ.',
      smartRecommendations: [
        'ಮಳೆ ಮುನ್ಸೂಚನೆ ಗಮನಿಸಿ ಸಿಂಪಡಣೆ ಮಾಡಿ'
      ]
    },
    ml: {
      cropName: 'തക്കാളി',
      diseaseName: 'തക്കാളി ലേറ്റ് ബ്ലൈറ്റ് (കരിഞ്ചെമ്പ് രോഗം)',
      severityLevel: 'ഉയർന്നത്',
      diseaseDescription: 'തക്കാളി ഇലകളെയും തണ്ടുകളെയും കായ്കളെയും വേഗത്തിൽ നശിപ്പിക്കുന്ന കുമിൾ രോഗമാണിത്.',
      symptoms: [
        'ഇലകളിൽ കറുത്ത തവിട്ടുനിറത്തിലുള്ള പാടുകൾ',
        'ഇലകൾ കരിഞ്ഞു ഉണങ്ങിപ്പോകുക',
        'ഇലകൾക്ക് അടിയിൽ വെളുത്ത പൂപ്പൽ ബാധ',
        'കായ്കളിൽ കറുത്ത പാടുകൾ കാണപ്പെടുക'
      ],
      possibleCauses: [
        'അമിതമായ അന്തരീക്ഷ ഈർപ്പവും മഴയും',
        'ചെടികൾക്കിടയിൽ കാറ്റും വെളിച്ചവും കുറയുന്നത്'
      ],
      chemicalTreatment: [
        'മാങ്കോസെബ് അടങ്ങിയ കുമിൾനാശിനി തളിക്കുക',
        'മെറ്റലാക്സിൽ + മാങ്കോസെബ് മിശ്രിതം ഉപയോഗിക്കുക'
      ],
      organicTreatment: [
        'രോഗം ബാധിച്ച ഭാഗങ്ങൾ മുറിച്ചു മാറ്റി നശിപ്പിക്കുക',
        'ട്രൈക്കോഡെർമ ഉപയോഗിക്കുക',
        'വേപ്പെണ്ണ മിശ്രിതം (5 മില്ലി/ലിറ്റർ) തളിക്കുക'
      ],
      fertilizerRecommendations: [
        'നൈട്രജൻ വളങ്ങൾ അമിതമായി നൽകരുത്',
        'പൊട്ടാഷ് വളങ്ങൾ നൽകുന്നത് രോഗപ്രതിരോധശേഷി കൂട്ടും'
      ],
      preventionMethods: [
        'തുള്ളിനന (ഡ്രിപ്പ്) രീതി ഉപയോഗിക്കുക',
        'ചെടികൾ തമ്മിൽ കൃത്യമായ അകലം പാലിക്കുക'
      ],
      futurePrecautions: [
        'രോഗപ്രതിരോധ ശേഷിയുള്ള വിത്തിനങ്ങൾ തിരഞ്ഞെടുക്കുക'
      ],
      weatherImpact: 'തണുത്ത കാലാവസ്ഥയും മഴയും രോഗം വർദ്ധിപ്പിക്കും.',
      recoverySuggestions: 'ബാധിച്ച ഭാഗങ്ങൾ നീക്കം ചെയ്തു മരുന്ന് തളിക്കുക.',
      smartRecommendations: [
        'മഴ മുന്നറിയിപ്പുകൾ ശ്രദ്ധിക്കുക'
      ]
    }
  },

  Tomato___Early_blight: {
    en: {
      cropName: 'Tomato',
      diseaseName: 'Tomato Early Blight',
      severityLevel: 'Moderate',
      diseaseDescription: 'Early blight is a common fungal disease producing targeted concentric lesions on older tomato leaves, leading to defoliation.',
      symptoms: [
        'Dark circular spots with target-like concentric rings on older leaves',
        'Yellowing around leaf spots',
        'Premature dropping of lower leaves',
        'Sunscald on exposed tomato fruits'
      ],
      possibleCauses: [
        'Warm temperatures (24-29°C) combined with high humidity',
        'Prolonged dew or leaf wetness',
        'Overwintered fungal spores in soil or plant residue'
      ],
      chemicalTreatment: [
        'Spray Chlorothalonil or Mancozeb-based fungicides',
        'Apply Copper oxychloride if early symptoms appear'
      ],
      organicTreatment: [
        'Remove yellowing lower leaves up to first fruit cluster',
        'Spray Pseudomonas fluorescens liquid culture (10ml/L)',
        'Mulch soil to prevent rain splash of fungal spores'
      ],
      fertilizerRecommendations: [
        'Provide adequate Nitrogen and Potassium for plant vigor',
        'Avoid plant stress due to nutrient deficiency'
      ],
      preventionMethods: [
        'Use organic straw or plastic mulch around plant bases',
        'Prune lower foliage to prevent soil splash',
        'Rotate crops annually'
      ],
      futurePrecautions: [
        'Select certified disease-free seeds or transplants',
        'Maintain clean field hygiene after harvest'
      ],
      weatherImpact: 'Warm, humid weather with frequent dew accelerates spore germination.',
      recoverySuggestions: 'Prune infected lower foliage and apply protective organic or chemical spray.',
      smartRecommendations: [
        'Inspect bottom leaves weekly',
        'Apply mulch before rainy season'
      ]
    },
    te: {
      cropName: 'టమోటా',
      diseaseName: 'టమోటా ఎర్లీ బ్లైట్ (ముందస్తు మచ్చ తెగులు)',
      severityLevel: 'మధ్యస్థం',
      diseaseDescription: 'ఎర్లీ బ్లైట్ అనేది పాత ఆకులపై వలయాలు (రింగులు) కలిగిన నల్లటి మచ్చలను ఏర్పరిచే సాధారణ శిలీంధ్ర తెగులు. ఇది ఆకులు రాలిపోవడానికి కారణమవుతుంది.',
      symptoms: [
        'పాత ఆకులపై గుండ్రటి చక్రాల వంటి (టార్గెట్) నల్లటి మచ్చలు',
        'మచ్చల చుట్టూ ఆకు పసుపు రంగులోకి మారడం',
        'కింది ఆకులు అకాలంగా రాలిపోవడం',
        'కాయలపై ఎండ దెబ్బ గుర్తులు పడటం'
      ],
      possibleCauses: [
        'వెచ్చని ఉష్ణోగ్రత (24-29°C) మరియు తేమ వాతావరణం',
        'ఆకులపై ఎక్కువ సమయం మంచు లేదా నీటి చుక్కలు ఉండటం',
        'నేలలో లేదా పాత వ్యర్థాలలో శిలీంధ్ర బీజాలు ఉండటం'
      ],
      chemicalTreatment: [
        'క్లోరోతాలోనిల్ లేదా మ్యాంకోజెబ్ శిలీంధ్ర నాశిని పిచికారీ చేయండి',
        'ప్రారంభ దశలో కాపర్ ఆక్సీక్లోరైడ్ పిచికారీ చేయండి'
      ],
      organicTreatment: [
        'పసుపు రంగులోకి మారిన కింది ఆకులను కోసివేసి తొలగించండి',
        'సూడోమోనాస్ ఫ్లూరోసెన్స్ జీవ ద్రావణం (లీటరుకు 10 మి.లీ) పిచికారీ చేయండి',
        'నేల నుండి ఆకులకు తెగులు సోకకుండా మొదలు చుట్టూ మల్చింగ్ వేయండి'
      ],
      fertilizerRecommendations: [
        'మొక్క బలంగా పెరగడానికి తగినంత నత్రజని మరియు పొటాష్ అందించండి',
        'పోషకాల లోపం వల్ల మొక్క బలహీనపడకుండా చూడండి'
      ],
      preventionMethods: [
        'మొక్కల మొదళ్ల చుట్టూ గడ్డి లేదా ప్లాస్టిక్ మల్చింగ్ వాడండి',
        'కింది ఆకులు నేలకు తగలకుండా కత్తిరించండి',
        'ప్రతి సంవత్సరం పంట మార్పిడి చేయండి'
      ],
      futurePrecautions: [
        'ధృవీకరించిన ఆరోగ్యకరమైన విత్తనాలను వాడండి',
        'పంట కోత తర్వాత చేనును శుభ్రంగా ఉంచండి'
      ],
      weatherImpact: 'వెచ్చని, తేమతో కూడిన వాతావరణం మరియు మంచు ఈ తెగులును వేగవంతం చేస్తాయి.',
      recoverySuggestions: 'కింది దెబ్బతిన్న ఆకులను తొలగించి, రక్షణ పిచికారీ చేయండి.',
      smartRecommendations: [
        'వారానికోసారి కింది ఆకులను పరిశీలించండి',
        'వర్షాకాలానికి ముందే మల్చింగ్ వేయండి'
      ]
    },
    hi: {
      cropName: 'टमाटर',
      diseaseName: 'टमाटर अगेती झुलसा (अर्ली ब्लाइट)',
      severityLevel: 'मध्यम',
      diseaseDescription: 'अगेती झुलसा एक सामान्य फंगल रोग है जो पुरानी पत्तियों पर गोल चक्रदार धब्बे बनाता है और पत्तियां झड़ने का कारण बनता है।',
      symptoms: [
        'पुरानी पत्तियों पर गोल चक्रदार (रिंग जैसे) काले धब्बे',
        'धब्बों के चारों ओर पत्ती का पीला पड़ना',
        'निचली पत्तियों का समय से पहले गिरना'
      ],
      possibleCauses: [
        'गर्म और नम मौसम (24-29°C)',
        'पत्तियों पर देर तक ओस या नमी रहना'
      ],
      chemicalTreatment: [
        'क्लोरोथैलोनिल या मैनकोजेब का छिड़काव करें',
        'शुरुआती लक्षणों पर कॉपर ऑक्सीक्लोराइड प्रयोग करें'
      ],
      organicTreatment: [
        'पीली पड़ चुकी निचली पत्तियों को काट दें',
        'स्यूडोमोनास फ्लोरोसेंस (10 मिली/लीटर) का छिड़काव करें',
        'जमीन पर पुआल की मल्चिंग करें'
      ],
      fertilizerRecommendations: [
        'पौधों के स्वास्थ्य के लिए नाइट्रोजन और पोटाश संतुलित दें'
      ],
      preventionMethods: [
        'पौधों के तने के पास मल्चिंग करें',
        'फसल चक्र अपनाएं'
      ],
      futurePrecautions: [
        'प्रमाणित और स्वस्थ बीजों का प्रयोग करें'
      ],
      weatherImpact: 'गर्म और नमी वाला मौसम इस बीमारी को बढ़ाता है।',
      recoverySuggestions: 'प्रभावित निचली पत्तियों को हटाएं और फफूंदनाशी छिड़कें।',
      smartRecommendations: [
        'हर हफ्ते निचली पत्तियों की जांच करें'
      ]
    },
    ta: {
      cropName: 'தக்காளி',
      diseaseName: 'தக்காளி முன் வெடிப்பு நோய் (Early Blight)',
      severityLevel: 'மிதமான',
      diseaseDescription: 'இது இலைகளில் வட்ட வடிவில் வளையங்கள் போன்ற புள்ளிகளை உண்டாக்கும் பூஞ்சை நோயாகும்.',
      symptoms: [
        'அடி இலைகளில் வட்ட வடிவ பழுப்பு புள்ளிகள்',
        'இலைகள் மஞ்சளாவல் மற்றும் உதிர்தல்'
      ],
      possibleCauses: [
        'வெப்பம் மற்றும் அதிக ஈரப்பதம்'
      ],
      chemicalTreatment: [
        'மேன்கோசெப் அல்லது குளோரோதலோனில் தெளிக்கவும்'
      ],
      organicTreatment: [
        'அடி இலைகளை கவாத்து செய்யவும்',
        'சூடோமோனாஸ் தெளிக்கவும்'
      ],
      fertilizerRecommendations: [
        'சீரான உரம் வழங்கவும்'
      ],
      preventionMethods: [
        'மல்ச்சிங் (Mulching) முறையை பயன்படுத்தவும்'
      ],
      futurePrecautions: [
        'நல்ல தரமான விதைகளை பயன்படுத்தவும்'
      ],
      weatherImpact: 'வெப்பமான ஈரப்பதம் நோயை பரப்பும்.',
      recoverySuggestions: 'அடி இலைகளை நீக்கி மருந்து தெளிக்கவும்.',
      smartRecommendations: [
        'வாரமொருமுறை செடிகளை கவனிக்கவும்'
      ]
    },
    kn: {
      cropName: 'ಟೊಮೆಟೊ',
      diseaseName: 'ಟೊಮೆಟೊ ಮುಂಚಿನ ಅಂಗಮಾರಿ (Early Blight)',
      severityLevel: 'ಮಧ್ಯಮ',
      diseaseDescription: 'ಇದು ಕೆಳಗಿನ ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ದುಂಡಗಿನ ಮಚ್ಚೆಗಳನ್ನು ಉಂಟುಮಾಡುವ ರೋಗವಾಗಿದೆ.',
      symptoms: [
        'ಎಲೆಗಳ ಮೇಲೆ ದುಂಡಗಿನ ಚಕ್ರದಂತ ಮಚ್ಚೆಗಳು',
        'ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಉದುರುವುದು'
      ],
      possibleCauses: [
        'ಬಿಸಿಲು ಮತ್ತು ಹೆಚ್ಚಿನ ತೇವಾಂಶ'
      ],
      chemicalTreatment: [
        'ಮ್ಯಾಂಕೋಜೆಬ್ ಔಷಧ ಸಿಂಪಡಿಸಿ'
      ],
      organicTreatment: [
        'ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ',
        'ಸೂಡೊಮೊನಾಸ್ ಜೈವಿಕ ಔಷಧ ಬಳಸಿ'
      ],
      fertilizerRecommendations: [
        'ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ'
      ],
      preventionMethods: [
        'ಆಚ್ಛಾದನೆ (Mulching) ಮಾಡಿ'
      ],
      futurePrecautions: [
        'ಉತ್ತಮ ಬಿತ್ತನೆ ಬೀಜ ಬಳಸಿ'
      ],
      weatherImpact: 'ಉಷ್ಣಾಂಶ ಮತ್ತು ತೇವಾಂಶ ರೋಗ ಹೆಚ್ಚಿಸುತ್ತದೆ.',
      recoverySuggestions: 'ಹಾನಿಗೊಳಗಾದ ಎಲೆ ತೆಗೆಯಿರಿ.',
      smartRecommendations: [
        'ಪ್ರತಿ ವಾರ ಎಲೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ'
      ]
    },
    ml: {
      cropName: 'തക്കാളി',
      diseaseName: 'തക്കാളി ഏർളി ബ്ലൈറ്റ് (മുൻകരിഞ്ചെമ്പ്)',
      severityLevel: 'മിതമായത്',
      diseaseDescription: 'ചുവട്ടിലെ പഴയ ഇലകളിൽ വട്ടത്തിൽ പാടുകൾ ഉണ്ടാക്കുന്ന കുമിൾ രോഗമാണിത്.',
      symptoms: [
        'ഇലകളിൽ വട്ടത്തിലുള്ള പാടുകൾ',
        'ഇലകൾ മഞ്ഞനിറമായി കൊഴിയുക'
      ],
      possibleCauses: [
        'ചൂടും ഉയർന്ന അന്തരീക്ഷ ഈർപ്പവും'
      ],
      chemicalTreatment: [
        'മാങ്കോസെബ് തളിക്കുക'
      ],
      organicTreatment: [
        'ചുവട്ടിലെ ഇലകൾ മുറിച്ചു മാറ്റുക',
        'സ്യൂഡോമോണസ് തളിക്കുക'
      ],
      fertilizerRecommendations: [
        'കൃത്യമായ വളപ്രയോഗം നടത്തുക'
      ],
      preventionMethods: [
        'മണ്ണിൽ മൾച്ചിംഗ് നടത്തുക'
      ],
      futurePrecautions: [
        'ഗുണനിലവാരമുള്ള വിത്തുകൾ ഉപയോഗിക്കുക'
      ],
      weatherImpact: 'ഈർപ്പമുള്ള കാലാവസ്ഥ രോഗം കൂട്ടും.',
      recoverySuggestions: 'താഴത്തെ ഇലകൾ നീക്കം ചെയ്യുക.',
      smartRecommendations: [
        'ഇലകൾ പരിശോധിക്കുക'
      ]
    }
  },

  Tomato___Bacterial_spot: {
    en: {
      cropName: 'Tomato',
      diseaseName: 'Tomato Bacterial Spot',
      severityLevel: 'Moderate',
      diseaseDescription: 'Bacterial spot is caused by Xanthomonas bacteria, resulting in small dark water-soaked spots on leaves and scabby lesions on fruits.',
      symptoms: [
        'Small dark water-soaked spots on leaves with yellow halos',
        'Leaf edges becoming ragged or scorched',
        'Small raised dark scabs on tomato fruits',
        'Severe leaf drop in rainy conditions'
      ],
      possibleCauses: [
        'Warm, wet, windy weather splashing bacteria between plants',
        'Contaminated seed or infected plant material',
        'Overhead sprinkler irrigation'
      ],
      chemicalTreatment: [
        'Spray Copper Hydroxide combined with Streptocycline / Agrimycin',
        'Apply Fixed Copper bactericides at 7-10 day intervals'
      ],
      organicTreatment: [
        'Prune heavily spotted branches using sanitized tools',
        'Spray Bacillus subtilis biological bactericide',
        'Apply copper-based organic formulations'
      ],
      fertilizerRecommendations: [
        'Avoid excessive nitrogen which causes soft vulnerable tissue growth',
        'Ensure balanced Calcium and Potash for cell wall strength'
      ],
      preventionMethods: [
        'Use pathogen-free certified seeds',
        'Avoid overhead watering; irrigate at plant base',
        'Sanitize garden tools with 70% alcohol between plants'
      ],
      futurePrecautions: [
        'Rotate crops for at least 2 years with non-host crops',
        'Destroy all infected crop debris after harvest'
      ],
      weatherImpact: 'Wind-driven rain splashes bacteria across fields, rapidly spreading infection.',
      recoverySuggestions: 'Apply copper-based sprays early and stop overhead watering.',
      smartRecommendations: [
        'Do not work in fields when leaves are wet',
        'Sanitize tools regularly'
      ]
    },
    te: {
      cropName: 'టమోటా',
      diseaseName: 'టమోటా బాక్టీరియల్ స్పాట్ (బాక్టీరియా మచ్చ తెగులు)',
      severityLevel: 'మధ్యస్థం',
      diseaseDescription: 'బాక్టీరియల్ స్పాట్ అనేది గ్సాంతోమోనాస్ బాక్టీరియా వల్ల వస్తుంది. ఇది ఆకులపై చిన్న నల్లటి మచ్చలను మరియు కాయల గుల్లలపై గాయాలను కలిగిస్తుంది.',
      symptoms: [
        'ఆకులపై పసుపు రంగు అంచులతో కూడిన చిన్న నల్లటి నీరు పట్టిన మచ్చలు',
        'ఆకుల అంచులు ఎండిపోయి విరిగిపోవడం',
        'టమోటా కాయలపై నల్లటి మచ్చలు/గాయాలు ఏర్పడటం',
        'వర్షాకాలంలో ఆకులు తీవ్రంగా రాలిపోవడం'
      ],
      possibleCauses: [
        'వెచ్చని, వర్షంతో కూడిన గాలుల ద్వారా బాక్టీరియా వ్యాప్తి చెందడం',
        'వ్యాధి సోకిన విత్తనాలు లేదా నారు వాడటం',
        'పైనుండి స్ప్రింక్లర్లతో నీరు చిలకరించడం'
      ],
      chemicalTreatment: [
        'కాపర్ హైడ్రాక్సైడ్ మరియు స్ట్రెప్టోసైక్లిన్ మిశ్రమాన్ని పిచికారీ చేయండి',
        '7-10 రోజుల వ్యవధిలో కాపర్ ఆధారిత బాక్టీరియా నాశిని వాడండి'
      ],
      organicTreatment: [
        'పరిశుభ్రమైన కత్తెరతో దెబ్బతిన్న కొమ్మలను కత్తిరించండి',
        'బాసిల్లస్ సబ్టిలిస్ జీవ నివారణ ద్రావణం పిచికారీ చేయండి',
        'సేంద్రీయ కాపర్ మిశ్రమాలను వాడండి'
      ],
      fertilizerRecommendations: [
        'అధిక నత్రజని వాడకం తగ్గించండి (ఇది మొక్కను మెత్తగా చేసి తెగులు సులభంగా సోకేలా చేస్తుంది)',
        'కణజాల బలం కోసం కాల్సియం మరియు పొటాషియం అందించండి'
      ],
      preventionMethods: [
        'వ్యాధి రహిత ధృవీకరించిన విత్తనాలను మాత్రమే వాడండి',
        'పైనుండి నీరు పోయడం ఆపి, మొదలు వద్ద మాత్రమే నీరు అందించండి',
        'తోటపని పనిముట్లను ఆల్కహాల్‌తో తరచుగా శుభ్రం చేయండి'
      ],
      futurePrecautions: [
        'కనీసం 2 ఏళ్లు టమోటా లేని ఇతర పంటలతో పంట మార్పిడి చేయండి',
        'పంట ముగిశాక వ్యాధి సోకిన మొక్కలను తగలేయండి'
      ],
      weatherImpact: 'గాలితో కూడిన వర్షం బాక్టీరియాను ఒక మొక్క నుండి మరొక మొక్కకు వేగంగా వ్యాపింపజేస్తుంది.',
      recoverySuggestions: 'కాపర్ మందులు పిచికారీ చేసి, పైనుండి నీరు చిలకరించడం ఆపండి.',
      smartRecommendations: [
        'ఆకులు తడిగా ఉన్నప్పుడు తోటలోకి వెళ్లవద్దు',
        'పనిముట్లను క్రమం తప్పకుండా క్రిమిరహితం చేయండి'
      ]
    },
    hi: {
      cropName: 'टमाटर',
      diseaseName: 'टमाटर जीवाणु धब्बा (बैक्टीरियल स्पॉट)',
      severityLevel: 'मध्यम',
      diseaseDescription: 'बैक्टीरियल स्पॉट जीवाणु जनित रोग है जो पत्तियों पर छोटे काले धब्बे और फलों पर खुरदुरे धब्बे बनाता है।',
      symptoms: [
        'पीले घेरे वाले छोटे काले धब्बे',
        'पत्तियों के किनारे कटे-फटे होना',
        'फलों पर काले खुरदुरे धब्बे'
      ],
      possibleCauses: [
        'गर्म और तूफानी बारिश में जीवाणुओं का फैलना',
        'दूषित बीज का प्रयोग'
      ],
      chemicalTreatment: [
        'कॉपर हाइड्रॉक्साइड + स्ट्रेप्टोसाइक्लिन का छिड़काव करें',
        'कॉपर युक्त दवा 8-10 दिन के अंतर पर छिड़कें'
      ],
      organicTreatment: [
        'संक्रमित शाखाओं को साफ कैंची से काटें',
        'बैसिलस सबटिलिस जैविक दवा का प्रयोग करें'
      ],
      fertilizerRecommendations: [
        'अत्यधिक नाइट्रोजन न दें; कैल्शियम और पोटाश बढ़ाएं'
      ],
      preventionMethods: [
        'प्रमाणित बीज ही बोएं',
        'ड्रिप सिंचाई का उपयोग करें'
      ],
      futurePrecautions: [
        '2 साल तक टमाटर वर्ग की फसलें न उगाएं'
      ],
      weatherImpact: 'तेज हवा और बारिश से यह रोग तेजी से फैलता है।',
      recoverySuggestions: 'कॉपर का छिड़काव करें और ऊपर से पानी देना बंद करें।',
      smartRecommendations: [
        'गीली फसल में काम न करें'
      ]
    },
    ta: {
      cropName: 'தக்காளி',
      diseaseName: 'தக்காளி பாக்டீரியா புள்ளி நோய்',
      severityLevel: 'மிதமான',
      diseaseDescription: 'இது பாக்டீரியாவால் ஏற்படும் நோயாகும், இலைகளில் சிறிய கருப்பு புள்ளிகளை உண்டாக்கும்.',
      symptoms: [
        'மஞ்சள் வளையத்துடன் கூடிய சிறு கருப்பு புள்ளிகள்',
        'பழங்களில் கரடுமுரடான புள்ளிகள்'
      ],
      possibleCauses: [
        'மழை மற்றும் காற்று மூலம் பரவுதல்'
      ],
      chemicalTreatment: [
        'காப்பர் ஹைட்ராக்சைடு + ஸ்ட்ரெப்டோமைசின் தெளிக்கவும்'
      ],
      organicTreatment: [
        'பாதிக்கப்பட்ட பாகங்களை கவாத்து செய்யவும்'
      ],
      fertilizerRecommendations: [
        'நைட்ரஜன் குறைத்து பொட்டாஷ் கூட்டவும்'
      ],
      preventionMethods: [
        'தூய்மையான விதைகளை பயன்படுத்தவும்'
      ],
      futurePrecautions: [
        'பயிர் சுழற்சி செய்யவும்'
      ],
      weatherImpact: 'மழைக்காற்று நோயை பரப்பும்.',
      recoverySuggestions: 'காப்பர் மருந்து தெளிக்கவும்.',
      smartRecommendations: [
        'ஈரமான இலைகளை தொட வேண்டாம்'
      ]
    },
    kn: {
      cropName: 'ಟೊಮೆಟೊ',
      diseaseName: 'ಟೊಮೆಟೊ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಚುಕ್ಕೆ ರೋಗ',
      severityLevel: 'ಮಧ್ಯಮ',
      diseaseDescription: 'ಇದು ಬ್ಯಾಕ್ಟೀರಿಯಾದಿಂದ ಬರುವ ರೋಗವಾಗಿದ್ದು, ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಚುಕ್ಕೆಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      symptoms: [
        'ಹಳದಿ ಅಂಚಿನ ಸಣ್ಣ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು',
        'ಕಾಯಿಗಳ ಮೇಲೆ ಗಾಯಗಳು'
      ],
      possibleCauses: [
        'ಮಳೆ ಮತ್ತು ಗಾಳಿಯಿಂದ ಹರಡುವಿಕೆ'
      ],
      chemicalTreatment: [
        'ಕಾಪರ್ ಹೈಡ್ರಾಕ್ಸೈಡ್ + ಸ್ಟ್ರೆಪ್ಟೋಸೈಕ್ಲಿನ್ ಸಿಂಪಡಿಸಿ'
      ],
      organicTreatment: [
        'ಹಾನಿಗೊಳಗಾದ ಭಾಗ ಕತ್ತರಿಸಿ'
      ],
      fertilizerRecommendations: [
        'ಕ್ಯಾಲ್ಸಿಯಂ ಮತ್ತು ಪೊಟ್ಯಾಶ್ ನೀಡಿ'
      ],
      preventionMethods: [
        'ಉತ್ತಮ ಬಿತ್ತನೆ ಬೀಜ ಬಳಸಿ'
      ],
      futurePrecautions: [
        'ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ'
      ],
      weatherImpact: 'ಮಳೆ ಗಾಳಿ ರೋಗ ಹರಡುತ್ತದೆ.',
      recoverySuggestions: 'ಕಾಪರ್ ಔಷಧ ಬಳಸಿ.',
      smartRecommendations: [
        'ತೇವವಿರುವಾಗ ಹೊಲಕ್ಕೆ ಹೋಗಬೇಡಿ'
      ]
    },
    ml: {
      cropName: 'തക്കാളി',
      diseaseName: 'തക്കാളി ബാക്ടീരിയൽ സ്പോട്ട് (ബാക്ടീരിയ പാട്)',
      severityLevel: 'മിതമായത്',
      diseaseDescription: 'ഇലകളിൽ ചെറിയ കറുത്ത പാടുകൾ ഉണ്ടാക്കുന്ന ബാക്ടീരിയ രോഗമാണിത്.',
      symptoms: [
        'മഞ്ഞ വരമ്പുകളുള്ള കറുത്ത പാടുകൾ',
        'കായ്കളിൽ കറുത്ത പാടുകൾ'
      ],
      possibleCauses: [
        'മഴയും കാറ്റും വഴി ബാക്ടീരിയ പടരുന്നത്'
      ],
      chemicalTreatment: [
        'കോപ്പർ ഹൈഡ്രോക്സൈഡ് + സ്ട്രെപ്റ്റോസൈക്ലിൻ തളിക്കുക'
      ],
      organicTreatment: [
        'ബാധിച്ച ഭാഗങ്ങൾ മുറിച്ചു കളയുക'
      ],
      fertilizerRecommendations: [
        'പൊട്ടാഷ് വളങ്ങൾ നൽകുക'
      ],
      preventionMethods: [
        'നല്ല വിത്തുകൾ മാത്രം ഉപയോഗിക്കുക'
      ],
      futurePrecautions: [
        'വിളപരിക്രമണം നടത്തുക'
      ],
      weatherImpact: 'മഴക്കാറ്റ് രോഗം കൂട്ടും.',
      recoverySuggestions: 'കോപ്പർ മരുന്ന് തളിക്കുക.',
      smartRecommendations: [
        'നനവുള്ളപ്പോൾ ചെടികൾ തൊടരുത്'
      ]
    }
  },

  Tomato___healthy: {
    en: {
      cropName: 'Tomato',
      diseaseName: 'Healthy Tomato Plant',
      severityLevel: 'Low',
      diseaseDescription: 'The tomato leaf shows vibrant green color, strong cellular structure, and no symptoms of fungal or bacterial diseases.',
      symptoms: ['No disease symptoms detected', 'Leaves are healthy, green and intact'],
      possibleCauses: ['Good farming practices', 'Optimal nutrient & water management'],
      chemicalTreatment: ['No chemical pesticide required'],
      organicTreatment: ['Continue routine preventative bio-pesticide application (Neem oil 2ml/L)'],
      fertilizerRecommendations: [
        'Maintain balanced NPK fertilization schedule',
        'Apply Micronutrient spray (Zinc, Boron) during flowering'
      ],
      preventionMethods: [
        'Maintain good field sanitation',
        'Monitor weekly for early pest/disease warnings'
      ],
      futurePrecautions: [
        'Ensure proper staking and pruning as crop grows'
      ],
      weatherImpact: 'Current weather condition is favorable for normal tomato growth.',
      recoverySuggestions: 'Plant is healthy. Keep up regular monitoring and maintenance.',
      smartRecommendations: [
        'Record crop growth stage in farm diary',
        'Keep water management consistent'
      ]
    },
    te: {
      cropName: 'టమోటా',
      diseaseName: 'ఆరోగ్యకరమైన టమోటా మొక్క',
      severityLevel: 'కనిష్టం (ఆరోగ్యం)',
      diseaseDescription: 'టమోటా ఆకు చక్కని పచ్చని రంగుతో, బలమైన నిర్మాణం కలిగి ఉంది. ఎటువంటి శిలీంధ్ర లేదా బాక్టీరియా తెగుళ్ల లక్షణాలు లేవు.',
      symptoms: ['ఎటువంటి తెగులు లక్షణాలు లేవు', 'ఆకులు ఆరోగ్యంగా, పచ్చగా ఉన్నాయి'],
      possibleCauses: ['మంచి వ్యవసాయ యాజమాన్య పద్ధతులు', 'సరైన నీరు మరియు పోషకాల నిర్వహణ'],
      chemicalTreatment: ['ఎటువంటి రసాయన పురుగుమందులు అవసరం లేదు'],
      organicTreatment: ['క్రమం తప్పకుండా వేపనూనె (లీటరుకు 2 మి.లీ) ముందస్తు రక్షణగా పిచికారీ చేయవచ్చు'],
      fertilizerRecommendations: [
        'సమతుల్య NPK ఎరువుల ప్రణాళికను కొనసాగించండి',
        'పూత దశలో సూక్ష్మపోషకాల (జింక్, బోరాన్) ద్రావణం అందించండి'
      ],
      preventionMethods: [
        'చేనును ఎల్లప్పుడూ శుభ్రంగా ఉంచండి',
        'వారానికోసారి క్రిమి మరియు తెగుళ్ల ఉనికిని గమనించండి'
      ],
      futurePrecautions: [
        'మొక్క పెరుగుతున్న కొద్దీ సరైన కట్టెల మద్దతు (స్టేకింగ్) అందించండి'
      ],
      weatherImpact: 'ప్రస్తుత వాతావరణం టమోటా మొక్కల ఆరోగ్యకరమైన పెరుగుదలకు అనుకూలంగా ఉంది.',
      recoverySuggestions: 'మొక్క సంపూర్ణ ఆరోగ్యంగా ఉంది. సాధారణ సంరక్షణ కొనసాగించండి.',
      smartRecommendations: [
        'పంట పెరుగుదల దశను క్రమం తప్పకుండా నమోదు చేసుకోండి',
        'నీటి యాజమాన్యాన్ని స్థిరంగా పాటించండి'
      ]
    },
    hi: {
      cropName: 'टमाटर',
      diseaseName: 'स्वस्थ टमाटर का पौधा',
      severityLevel: 'निम्न (स्वस्थ)',
      diseaseDescription: 'टमाटर की पत्ती पूरी तरह स्वस्थ, हरी और रोगमुक्त है। इसमें किसी फफूंद या जीवाणु रोग का कोई लक्षण नहीं है।',
      symptoms: ['कोई बीमारी का लक्षण नहीं', 'पत्तियां स्वस्थ और हरी हैं'],
      possibleCauses: ['उत्कृष्ट कृषि प्रबंधन', 'उचित पोषण और सिंचाई'],
      chemicalTreatment: ['किसी रासायनिक दवा की आवश्यकता नहीं है'],
      organicTreatment: ['बचाव के लिए नीम तेल (2 मिली/लीटर) का सामान्य छिड़काव कर सकते हैं'],
      fertilizerRecommendations: [
        'संतुलित एनपीके उर्वरक प्रबंधन जारी रखें',
        'फूल आते समय सूक्ष्म पोषक तत्वों (जिंक, बोरोन) का छिड़काव करें'
      ],
      preventionMethods: [
        'खेत की स्वच्छता बनाए रखें',
        'नियमित रूप से पौधे का निरीक्षण करते रहें'
      ],
      futurePrecautions: ['पौधे को सहारा (स्टेकिंग) दें'],
      weatherImpact: 'वर्तमान मौसम फसल की अच्छी वृद्धि के लिए अनुकूल है।',
      recoverySuggestions: 'फसल पूरी तरह स्वस्थ है। सामान्य देखभाल जारी रखें।',
      smartRecommendations: ['सिंचाई का उचित समय बनाए रखें']
    },
    ta: {
      cropName: 'தக்காளி',
      diseaseName: 'ஆரோக்கியமான தக்காளி செடி',
      severityLevel: 'குறைவு (ஆரோக்கியம்)',
      diseaseDescription: 'தக்காளி இலை மிகவும் ஆரோக்கியமாகவும் பசுமையாகவும் உள்ளது. எந்த நோய்க்கான அறிகுறியும் இல்லை.',
      symptoms: ['எந்த நோய் அறிகுறியும் இல்லை'],
      possibleCauses: ['நல்ல விவசாய பராமரிப்பு'],
      chemicalTreatment: ['ரசாயன மருந்து தேவை இல்லை'],
      organicTreatment: ['வேப்ப எண்ணெய் (2 மி.லி/லி) தெளிக்கலாம்'],
      fertilizerRecommendations: ['சீரான உரம் வழங்கவும்'],
      preventionMethods: ['தோட்டத்தை தூய்மையாக வைத்திருக்கவும்'],
      futurePrecautions: ['செடிகளுக்கு ஆதரவு குச்சி கட்டவும்'],
      weatherImpact: 'வானிலை பயிர் வளர்ச்சிக்கு ஏற்றதாக உள்ளது.',
      recoverySuggestions: 'செடி ஆரோக்கியமாக உள்ளது.',
      smartRecommendations: ['வழக்கமான பராமரிப்பை தொடரவும்']
    },
    kn: {
      cropName: 'ಟೊಮೆಟೊ',
      diseaseName: 'ಆರೋಗ್ಯಕರ ಟೊಮೆಟೊ ಗಿಡ',
      severityLevel: 'ಕಡಿಮೆ (ಆರೋಗ್ಯ)',
      diseaseDescription: 'ಟೊಮೆಟೊ ಎಲೆ ಹಸಿರಾಗಿದ್ದು ಸಂಪೂರ್ಣ ಆರೋಗ್ಯಕರವಾಗಿದೆ. ಯಾವುದೇ ರೋಗದ ಲಕ್ಷಣಗಳಿಲ್ಲ.',
      symptoms: ['ಯಾವುದೇ ರೋಗದ ಲಕ್ಷಣಗಳಿಲ್ಲ'],
      possibleCauses: ['ಉತ್ತಮ ಕೃಷಿ ನಿರ್ವಹಣೆ'],
      chemicalTreatment: ['ಯಾವುದೇ ರಾಸಾಯನಿಕ ಅಗತ್ಯವಿಲ್ಲ'],
      organicTreatment: ['ಮುನ್ನೆಚ್ಚರಿಕೆಯಾಗಿ ಬೇವು ಎಣ್ಣೆ ಸಿಂಪಡಿಸಬಹುದು'],
      fertilizerRecommendations: ['ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ'],
      preventionMethods: ['ಜಮೀನನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ'],
      futurePrecautions: ['ಗಿಡಗಳಿಗೆ ಆಸರೆ ನೀಡಿ'],
      weatherImpact: 'ಪ್ರಸ್ತುತ ವಾತಾವರಣ ಬೆಳೆ ಬೆಳೆಯಲು ಸೂಕ್ತವಾಗಿದೆ.',
      recoverySuggestions: 'ಬೆಳೆ ಸಂಪೂರ್ಣ ಆರೋಗ್ಯವಾಗಿದೆ.',
      smartRecommendations: ['ಸಾಮಾನ್ಯ ಆರೈಕೆ ಮುಂದುವರಿಸಿ']
    },
    ml: {
      cropName: 'തക്കാളി',
      diseaseName: 'ആരോഗ്യമുള്ള തക്കാളി ചെടി',
      severityLevel: 'കുറഞ്ഞത് (ആരോഗ്യം)',
      diseaseDescription: 'തക്കാളി ഇല പൂർണ്ണമായും ആരോഗ്യമുള്ളതും പച്ചപ്പു നിറഞ്ഞതുമാണ്. രോഗലക്ഷണങ്ങളൊന്നുമില്ല.',
      symptoms: ['രോഗലക്ഷണങ്ങൾ ഒന്നുമില്ല'],
      possibleCauses: ['നല്ല കൃഷി രീതികൾ'],
      chemicalTreatment: ['രാസ മരുന്നുകൾ ആവശ്യമില്ല'],
      organicTreatment: ['വേപ്പെണ്ണ മിശ്രിതം തളിക്കാം'],
      fertilizerRecommendations: ['കൃത്യമായി വളം നൽകുക'],
      preventionMethods: ['തോട്ടം ശുചിയായി സൂക്ഷിക്കുക'],
      futurePrecautions: ['ചെടികൾക്ക് താങ്ങ് നൽകുക'],
      weatherImpact: 'കാലാവസ്ഥ അനുകൂലമാണ്.',
      recoverySuggestions: 'ചെടി പൂർണ്ണ ആരോഗ്യത്തിലാണ്.',
      smartRecommendations: ['പതിവ് പരിചരണം തുടരുക']
    }
  }
};

const localizedSafeCopy: Record<SupportedLanguage, {
  crop: string;
  healthy: string;
  blight: string;
  bacterial: string;
  description: string;
  symptom: string;
  cause: string;
  chemical: string;
  organic: string;
  fertilizer: string;
  prevention: string;
  future: string;
  weather: string;
  recovery: string;
  smart: string;
}> = {
  en: { crop: 'Crop', healthy: 'Healthy crop', blight: 'Blight disease', bacterial: 'Bacterial spot', description: 'Detailed information is currently unavailable for this diagnosis.', symptom: 'Visible changes on the leaf surface', cause: 'Environmental or pathogen factors', chemical: 'Consult a local agricultural officer before using any chemical treatment', organic: 'Maintain field sanitation and remove severely affected material', fertilizer: 'Maintain balanced crop nutrition', prevention: 'Monitor the crop and maintain proper drainage', future: 'Use healthy planting material and inspect plants regularly', weather: 'Monitor local weather conditions for disease risk.', recovery: 'Follow local agricultural guidance for this diagnosis.', smart: 'Inspect crop foliage regularly' },
  te: { crop: 'పంట', healthy: 'ఆరోగ్యకరమైన పంట', blight: 'బ్లైట్ తెగులు', bacterial: 'బాక్టీరియా మచ్చ తెగులు', description: 'ఈ నిర్ధారణకు సంబంధించిన పూర్తి సమాచారం ప్రస్తుతం అందుబాటులో లేదు.', symptom: 'ఆకుపై కనిపించే మార్పులు', cause: 'వాతావరణం లేదా వ్యాధికారక కారణాలు', chemical: 'రసాయన చికిత్సకు ముందు స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి', organic: 'పొలాన్ని పరిశుభ్రంగా ఉంచి తీవ్రంగా దెబ్బతిన్న భాగాలను తొలగించండి', fertilizer: 'సమతుల్య పంట పోషణను పాటించండి', prevention: 'పంటను పరిశీలించి సరైన నీటి పారుదల ఉండేలా చూడండి', future: 'ఆరోగ్యకరమైన నాట్లను వాడి మొక్కలను క్రమం తప్పకుండా పరిశీలించండి', weather: 'వ్యాధి ప్రమాదం కోసం స్థానిక వాతావరణాన్ని గమనించండి.', recovery: 'ఈ నిర్ధారణకు స్థానిక వ్యవసాయ సలహాను పాటించండి.', smart: 'పంట ఆకులను క్రమం తప్పకుండా పరిశీలించండి' },
  hi: { crop: 'फसल', healthy: 'स्वस्थ फसल', blight: 'झुलसा रोग', bacterial: 'बैक्टीरियल स्पॉट', description: 'इस निदान की विस्तृत जानकारी अभी उपलब्ध नहीं है।', symptom: 'पत्ती की सतह पर दिखाई देने वाले बदलाव', cause: 'मौसम या रोगजनक कारण', chemical: 'रासायनिक उपचार से पहले स्थानीय कृषि अधिकारी से सलाह लें', organic: 'खेत की स्वच्छता बनाए रखें और अधिक प्रभावित भाग हटाएं', fertilizer: 'संतुलित पोषण बनाए रखें', prevention: 'फसल की निगरानी करें और उचित जल निकासी रखें', future: 'स्वस्थ रोपण सामग्री अपनाकर पौधों की नियमित जांच करें', weather: 'रोग के जोखिम के लिए स्थानीय मौसम पर नजर रखें।', recovery: 'इस निदान के लिए स्थानीय कृषि सलाह का पालन करें।', smart: 'पत्तियों की नियमित जांच करें' },
  ta: { crop: 'பயிர்', healthy: 'ஆரோக்கியமான பயிர்', blight: 'கருகல் நோய்', bacterial: 'பாக்டீரியா புள்ளி நோய்', description: 'இந்த நோயறிதலுக்கான விரிவான தகவல் தற்போது கிடைக்கவில்லை.', symptom: 'இலை மேற்பரப்பில் காணப்படும் மாற்றங்கள்', cause: 'வானிலை அல்லது நோய்க்கிருமி காரணிகள்', chemical: 'ரசாயன சிகிச்சைக்கு முன் உள்ளூர் வேளாண் அலுவலரை அணுகவும்', organic: 'வயல் சுகாதாரத்தை பராமரித்து கடுமையாக பாதிக்கப்பட்ட பகுதிகளை அகற்றவும்', fertilizer: 'சமச்சீர் பயிர் ஊட்டச்சத்தை பராமரிக்கவும்', prevention: 'பயிரை கண்காணித்து சரியான வடிகால் அமைக்கவும்', future: 'ஆரோக்கியமான நடவு பொருட்களை பயன்படுத்தி செடிகளை தொடர்ந்து பரிசோதிக்கவும்', weather: 'நோய் அபாயத்திற்காக உள்ளூர் வானிலையை கவனிக்கவும்.', recovery: 'இந்த நோயறிதலுக்கு உள்ளூர் வேளாண் ஆலோசனையை பின்பற்றவும்.', smart: 'இலைகளை தொடர்ந்து பரிசோதிக்கவும்' },
  kn: { crop: 'ಬೆಳೆ', healthy: 'ಆರೋಗ್ಯಕರ ಬೆಳೆ', blight: 'ಅಂಗಮಾರಿ ರೋಗ', bacterial: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ ಚುಕ್ಕೆ ರೋಗ', description: 'ಈ ರೋಗನಿರ್ಣಯದ ವಿವರವಾದ ಮಾಹಿತಿ ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ.', symptom: 'ಎಲೆಯ ಮೇಲ್ಮೈಯಲ್ಲಿ ಕಾಣುವ ಬದಲಾವಣೆಗಳು', cause: 'ಹವಾಮಾನ ಅಥವಾ ರೋಗಕಾರಕ ಕಾರಣಗಳು', chemical: 'ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆಗೂ ಮೊದಲು ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ', organic: 'ಹೊಲದ ಸ್ವಚ್ಛತೆ ಕಾಪಾಡಿ ತೀವ್ರವಾಗಿ ಬಾಧಿತ ಭಾಗ ತೆಗೆದುಹಾಕಿ', fertilizer: 'ಸಮತೋಲಿತ ಬೆಳೆ ಪೋಷಣೆ ಕಾಪಾಡಿ', prevention: 'ಬೆಳೆಯನ್ನು ಗಮನಿಸಿ ಸರಿಯಾದ ನೀರು ಹರಿವು ಇರಲಿ', future: 'ಆರೋಗ್ಯಕರ ನಾಟಿ ವಸ್ತು ಬಳಸಿ ಸಸಿಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ', weather: 'ರೋಗದ ಅಪಾಯಕ್ಕಾಗಿ ಸ್ಥಳೀಯ ಹವಾಮಾನ ಗಮನಿಸಿ.', recovery: 'ಈ ರೋಗನಿರ್ಣಯಕ್ಕೆ ಸ್ಥಳೀಯ ಕೃಷಿ ಸಲಹೆ ಪಾಲಿಸಿ.', smart: 'ಎಲೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ' },
  ml: { crop: 'വിള', healthy: 'ആരോഗ്യമുള്ള വിള', blight: 'ബ്ലൈറ്റ് രോഗം', bacterial: 'ബാക്ടീരിയൽ പാട് രോഗം', description: 'ഈ രോഗനിർണയത്തിന്റെ വിശദമായ വിവരം ഇപ്പോൾ ലഭ്യമല്ല.', symptom: 'ഇലയുടെ ഉപരിതലത്തിൽ കാണുന്ന മാറ്റങ്ങൾ', cause: 'കാലാവസ്ഥയോ രോഗകാരികളോ', chemical: 'രാസ ചികിത്സയ്ക്ക് മുമ്പ് പ്രാദേശിക കാർഷിക ഉദ്യോഗസ്ഥനെ സമീപിക്കുക', organic: 'വയൽ ശുചിത്വം പാലിച്ച് ഗുരുതരമായി ബാധിച്ച ഭാഗങ്ങൾ നീക്കുക', fertilizer: 'സമതുലിത വിളപോഷണം പാലിക്കുക', prevention: 'വിള നിരീക്ഷിച്ച് ശരിയായ നീർവാർച്ച ഉറപ്പാക്കുക', future: 'ആരോഗ്യമുള്ള നടീൽ വസ്തുക്കൾ ഉപയോഗിച്ച് ചെടികൾ പതിവായി പരിശോധിക്കുക', weather: 'രോഗസാധ്യതയ്ക്കായി പ്രാദേശിക കാലാവസ്ഥ നിരീക്ഷിക്കുക.', recovery: 'ഈ രോഗനിർണയത്തിന് പ്രാദേശിക കാർഷിക നിർദ്ദേശം പാലിക്കുക.', smart: 'ഇലകൾ പതിവായി പരിശോധിക്കുക' }
};

function getSafeLocalizedDiseaseInfo(rawReport: any, lang: SupportedLanguage): DiseaseInfo {
  const copy = localizedSafeCopy[lang];
  const className = String(rawReport?.diseaseKey || rawReport?.prediction || '');
  const condition = className.includes('healthy') ? copy.healthy : className.includes('Bacterial_spot') ? copy.bacterial : copy.blight;
  return {
    cropName: copy.crop,
    diseaseName: condition,
    severityLevel: rawReport?.severityLevel || 'Moderate',
    diseaseDescription: copy.description,
    symptoms: [copy.symptom],
    possibleCauses: [copy.cause],
    chemicalTreatment: [copy.chemical],
    organicTreatment: [copy.organic],
    fertilizerRecommendations: [copy.fertilizer],
    preventionMethods: [copy.prevention],
    futurePrecautions: [copy.future],
    weatherImpact: copy.weather,
    recoverySuggestions: copy.recovery,
    smartRecommendations: [copy.smart]
  };
}

/**
 * Gets localized report object for a given prediction / canonical report and target language.
 * Fallbacks cleanly: target language -> English ('en') -> Generic safe fallback.
 */
export function getLocalizedReport(rawReport: any, langCode: string = 'en'): DiseaseInfo & { diseaseKey?: string; confidenceScore?: number; confidenceLevel?: string; isLowConfidence?: boolean; lowConfidenceWarning?: string | null; heatmapUrl?: string | null; environmentalRisk?: any; topPredictions?: any[]; dosageGuidance?: DosageGuidance } {
  const targetLang = (['en', 'te', 'hi', 'ta', 'kn', 'ml'].includes(langCode) ? langCode : 'en') as SupportedLanguage;

  // Extract canonical class name (e.g. Tomato___Late_blight)
  const className = rawReport?.diseaseKey || rawReport?.prediction || rawReport?.diseaseNameRaw || rawReport?.diseaseName;
  
  // Find matching key in translations dictionary
  let matchedKey = Object.keys(DISEASE_TRANSLATIONS).find(k => k === className || k.toLowerCase() === (className || '').toLowerCase());
  
  if (!matchedKey && className) {
    // Try matching without special chars if exact key wasn't matched
    const cleanClass = className.replace(/[^a-zA-Z0-9_]/g, '_');
    matchedKey = Object.keys(DISEASE_TRANSLATIONS).find(k => k.replace(/[^a-zA-Z0-9_]/g, '_') === cleanClass);
  }

  const langDict = matchedKey ? DISEASE_TRANSLATIONS[matchedKey] : null;
  const localizedInfo = langDict ? (langDict[targetLang] || langDict['en']) : null;

  if (localizedInfo) {
    return {
      ...localizedInfo,
      diseaseKey: rawReport?.diseaseKey,
      severityLevel: rawReport?.severityLevel || localizedInfo.severityLevel,
      confidenceScore: rawReport?.confidenceScore,
      confidenceLevel: rawReport?.confidenceLevel,
      isLowConfidence: rawReport?.isLowConfidence,
      lowConfidenceWarning: rawReport?.lowConfidenceWarning,
      heatmapUrl: rawReport?.heatmapUrl,
      environmentalRisk: rawReport?.environmentalRisk,
      topPredictions: rawReport?.topPredictions || [],
      dosageGuidance: rawReport?.dosageGuidance
    };
  }

  // Generic safe fallback if disease is not in localized dictionary
  const fallbackDict: Record<SupportedLanguage, DiseaseInfo> = {
    en: {
      cropName: rawReport?.cropName || 'Crop Leaf',
      diseaseName: rawReport?.diseaseName || 'Diagnosis Completed',
      severityLevel: rawReport?.severityLevel || 'Moderate',
      diseaseDescription: rawReport?.diseaseDescription || 'Detailed information is currently being processed for this crop condition.',
      symptoms: rawReport?.symptoms || ['Condition observed on leaf surface'],
      possibleCauses: rawReport?.possibleCauses || ['Environmental or pathogen factors'],
      chemicalTreatment: rawReport?.chemicalTreatment || ['Consult local agricultural officer for specific advice'],
      organicTreatment: rawReport?.organicTreatment || ['Apply general organic bio-pesticide as preventive measure'],
      fertilizerRecommendations: rawReport?.fertilizerRecommendations || ['Maintain balanced NPK fertilization'],
      preventionMethods: rawReport?.preventionMethods || ['Maintain field sanitation and proper drainage'],
      futurePrecautions: rawReport?.futurePrecautions || ['Monitor crops regularly'],
      weatherImpact: rawReport?.weatherImpact || 'Monitor local weather conditions.',
      recoverySuggestions: rawReport?.recoverySuggestions || 'Follow local agricultural guidelines.',
      smartRecommendations: rawReport?.smartRecommendations || ['Inspect crop foliage regularly']
    },
    te: {
      cropName: rawReport?.cropName || 'పంట ఆకు',
      diseaseName: rawReport?.diseaseName || 'పంట నిర్ధారణ నివేదిక',
      severityLevel: rawReport?.severityLevel || 'మధ్యస్థం',
      diseaseDescription: 'ఈ పంట పరిస్థితికి సంబంధించిన వివరాలు పరిశీలించబడుతున్నాయి. వివరాలకు స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.',
      symptoms: ['ఆకు ఉపరితలంపై మార్పులు గమనించబడ్డాయి'],
      possibleCauses: ['వాతావరణం లేదా శిలీంధ్ర కారణాలు'],
      chemicalTreatment: ['స్థానిక వ్యవసాయ విస్తరణ అధికారి సిఫార్సుల మేరకు మందులు పిచికారీ చేయండి'],
      organicTreatment: ['ముందస్తు జాగ్రత్తగా ప్రకృతి నివారణ పద్ధతులు పాటించండి'],
      fertilizerRecommendations: ['సమతుల్య NPK ఎరువుల నిర్వహణ పాటించండి'],
      preventionMethods: ['చేనును ఎల్లప్పుడూ పరిశుభ్రంగా ఉంచండి'],
      futurePrecautions: ['పంట పెరుగుదలను క్రమం తప్పకుండా పరిశీలించండి'],
      weatherImpact: 'స్థానిక వాతావరణ మార్పులను గమనించండి.',
      recoverySuggestions: 'స్థానిక వ్యవసాయ సలహాలను పాటించండి.',
      smartRecommendations: ['పంట ఆకులను క్రమం తప్పకుండా తనిఖీ చేయండి']
    },
    hi: {
      cropName: 'फसल की पत्ती',
      diseaseName: 'फसल निदान रिपोर्ट',
      severityLevel: 'मध्यम',
      diseaseDescription: 'इस बीमारी की विस्तृत जानकारी उपलब्ध कराई जा रही है। विशेष सलाह के लिए कृषि अधिकारी से मिलें।',
      symptoms: ['पत्ती पर लक्षण देखे गए'],
      possibleCauses: ['मौसम या फफूंद कारण'],
      chemicalTreatment: ['कृषि विशेषज्ञ की सलाह अनुसार दवा दें'],
      organicTreatment: ['जैविक नियंत्रण उपाय अपनाएं'],
      fertilizerRecommendations: ['संतुलित एनपीके उर्वरक का प्रयोग करें'],
      preventionMethods: ['खेत की सफाई बनाए रखें'],
      futurePrecautions: ['नियमित रूप से फसल की जांच करें'],
      weatherImpact: 'मौसम पूर्वानुमान का ध्यान रखें।',
      recoverySuggestions: 'कृषि सलाह का पालन करें।',
      smartRecommendations: ['फसल की देखभाल जारी रखें']
    },
    ta: {
      cropName: 'பயிர் இலை',
      diseaseName: 'பயிர் ஆய்வு அறிக்கை',
      severityLevel: 'மிதமான',
      diseaseDescription: 'விரிவான தகவல்களுக்கு வேளாண் அலுவலரை அணுகவும்.',
      symptoms: ['இலையில் மாற்றங்கள்'],
      possibleCauses: ['வானிலை காரணங்கள்'],
      chemicalTreatment: ['வேளாண் அலுவலர் ஆலோசனையின்படி மருந்து தெளிக்கவும்'],
      organicTreatment: ['இயற்கை பாதுகாப்பு முறைகளை பின்பற்றவும்'],
      fertilizerRecommendations: ['சீரான உரம் வழங்கவும்'],
      preventionMethods: ['தோட்டத்தை தூய்மையாக வைத்திருக்கவும்'],
      futurePrecautions: ['பயிரை தொடர்ந்து கவனிக்கவும்'],
      weatherImpact: 'வானிலையை கவனிக்கவும்.',
      recoverySuggestions: 'வேளாண் வழிகாட்டுதலை பின்பற்றவும்.',
      smartRecommendations: ['இலைகளை பரிசோதிக்கவும்']
    },
    kn: {
      cropName: 'ಬೆಳೆ ಎಲೆ',
      diseaseName: 'ಬೆಳೆ ರೋಗ ವರದಿ',
      severityLevel: 'ಮಧ್ಯಮ',
      diseaseDescription: 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      symptoms: ['ಎಲೆಯ ಮೇಲೆ ರೋಗ ಲಕ್ಷಣ'],
      possibleCauses: ['ವಾತಾವರಣದ ಕಾರಣಗಳು'],
      chemicalTreatment: ['ಕೃಷಿ ತಜ್ಞರ ಸಲಹೆಯಂತೆ ಔಷಧ ಸಿಂಪಡಿಸಿ'],
      organicTreatment: ['ಜೈವಿಕ ಪದ್ಧತಿ ಅನುಸರಿಸಿ'],
      fertilizerRecommendations: ['ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ'],
      preventionMethods: ['ಜಮೀನು ಸ್ವಚ್ಛವಾಗಿಡಿ'],
      futurePrecautions: ['ಬೆಳೆ ಪರೀಕ್ಷಿಸಿ'],
      weatherImpact: 'ವಾತಾವರಣ ಗಮನಿಸಿ.',
      recoverySuggestions: 'ಕೃಷಿ ಸಲಹೆ ಪಾಲಿಸಿ.',
      smartRecommendations: ['ಸಾಮಾನ್ಯ ಆರೈಕೆ ಮಾಡಿ']
    },
    ml: {
      cropName: 'വിള ഇല',
      diseaseName: 'വിള രോഗ നിർണ്ണയ റിപ്പോർട്ട്',
      severityLevel: 'മിതമായത്',
      diseaseDescription: 'കൂടുതൽ വിവരങ്ങൾക്ക് കൃഷി ഓഫീസറെ ബന്ധപ്പെടുക.',
      symptoms: ['രോഗലക്ഷണങ്ങൾ ലക്ഷണങ്ങൾ'],
      possibleCauses: ['കാലാവസ്ഥാ കാരണങ്ങൾ'],
      chemicalTreatment: ['കൃഷി ഓഫീസറുടെ നിർദ്ദേശപ്രകാരം മരുന്ന് തളിക്കുക'],
      organicTreatment: ['ജൈവ രീതികൾ അവലംബിക്കുക'],
      fertilizerRecommendations: ['കൃത്യമായി വളം നൽകുക'],
      preventionMethods: ['തോട്ടം ശുചിയായി സൂക്ഷിക്കുക'],
      futurePrecautions: ['വിള നിരീക്ഷിക്കുക'],
      weatherImpact: 'കാലാവസ്ഥ ശ്രദ്ധിക്കുക.',
      recoverySuggestions: 'മാർഗ്ഗനിർദ്ദേശങ്ങൾ പാലിക്കുക.',
      smartRecommendations: ['പരിചരണം തുടരുക']
    }
  };

  const fb = /^(Potato|Pepper,_bell)___/.test(String(className || ''))
    ? getSafeLocalizedDiseaseInfo(rawReport, targetLang)
    : (fallbackDict[targetLang] || fallbackDict['en']);

  return {
    ...fb,
    diseaseKey: rawReport?.diseaseKey,
    confidenceScore: rawReport?.confidenceScore,
    confidenceLevel: rawReport?.confidenceLevel,
    isLowConfidence: rawReport?.isLowConfidence,
    lowConfidenceWarning: rawReport?.lowConfidenceWarning,
    heatmapUrl: rawReport?.heatmapUrl,
    environmentalRisk: rawReport?.environmentalRisk,
    topPredictions: rawReport?.topPredictions || [],
    dosageGuidance: rawReport?.dosageGuidance
  };
}
