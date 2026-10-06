export interface LocationHierarchy {
  [state: string]: {
    [district: string]: string[];
  };
}

export type SupportedLanguage = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'ml';

export const ANDHRA_PRADESH_DISTRICT_NAMES: Record<string, Record<SupportedLanguage, string>> = {
  'Alluri Sitharama Raju': { en: 'Alluri Sitharama Raju', te: 'అల్లూరి సీతారామ రాజు', hi: 'अल्लूरी सीताराम राजू', ta: 'அல்லூரி சீதாராம ராஜு', kn: 'ಅಲ್ಲೂರಿ ಸೀತಾರಾಮ ರಾಜು', ml: 'അല്ലൂരി സീതാരാമ രാജു' },
  Anakapalli: { en: 'Anakapalli', te: 'అనకాపల్లి', hi: 'अनकापल्ली', ta: 'அனகாப்பள்ளி', kn: 'ಅನಕಾಪಲ್ಲಿ', ml: 'അനകാപ്പള്ളി' },
  Ananthapuramu: { en: 'Ananthapuramu', te: 'అనంతపురము', hi: 'अनंतपुरमु', ta: 'அனந்தபுரம்', kn: 'ಅನಂತಪುರ', ml: 'അനന്തപുറം' },
  Annamayya: { en: 'Annamayya', te: 'అన్నమయ్య', hi: 'अन्नमय्या', ta: 'அன்னமைய்யா', kn: 'ಅನ್ನಮಯ್ಯ', ml: 'അന്നമയ്യ' },
  Bapatla: { en: 'Bapatla', te: 'బాపట్ల', hi: 'बापटला', ta: 'பாபட்லா', kn: 'ಬಾಪಟ್ಲ', ml: 'ബാപട്ല' },
  Chittoor: { en: 'Chittoor', te: 'చిత్తూరు', hi: 'चित्तूर', ta: 'சித்தூர்', kn: 'ಚಿತ್ತೂರು', ml: 'ചിറ്റൂർ' },
  'Dr. B.R. Ambedkar Konaseema': { en: 'Dr. B.R. Ambedkar Konaseema', te: 'డా. బి.ఆర్. అంబేద్కర్ కోనసీమ', hi: 'डॉ. बी.आर. अंबेडकर कोनसीमा', ta: 'டாக்டர் பி.ஆர். அம்பேத்கர் கோனசீமா', kn: 'ಡಾ. ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್ ಕೋನಸೀಮಾ', ml: 'ഡോ. ബി.ആർ. അംബേദ്കർ കോനസീമ' },
  'East Godavari': { en: 'East Godavari', te: 'తూర్పు గోదావరి', hi: 'पूर्वी गोदावरी', ta: 'கிழக்கு கோதாவரி', kn: 'ಪೂರ್ವ ಗೋದಾವರಿ', ml: 'കിഴക്കൻ ഗോദാവരി' },
  Eluru: { en: 'Eluru', te: 'ఏలూరు', hi: 'एलुरु', ta: 'ஏலూరు', kn: 'ಏಲೂರು', ml: 'ഏലూరు' },
  Guntur: { en: 'Guntur', te: 'గుంటూరు', hi: 'गुंटूर', ta: 'குண்டூர்', kn: 'ಗುಂಟೂರು', ml: 'ഗുണ്ടൂർ' },
  Kakinada: { en: 'Kakinada', te: 'కాకినాడ', hi: 'काकीनाडा', ta: 'காக்கிநாடா', kn: 'ಕಾಕಿನಾಡ', ml: 'കാകിനാഡ' },
  Krishna: { en: 'Krishna', te: 'కృష్ణా', hi: 'कृष्णा', ta: 'கிருஷ்ணா', kn: 'ಕೃಷ್ಣಾ', ml: 'കൃഷ്ണ' },
  Kurnool: { en: 'Kurnool', te: 'కర్నూలు', hi: 'कुरनूल', ta: 'கர்னூல்', kn: 'ಕర్నೂಲ್', ml: 'കർണൂൽ' },
  Nandyal: { en: 'Nandyal', te: 'నంద్యాల', hi: 'नंद्याल', ta: 'நந்தியால்', kn: 'ನಂದ್ಯಾಲ', ml: 'നന്ദ്യാൽ' },
  Nellore: { en: 'Nellore', te: 'నెల్లూరు', hi: 'नेल्लोर', ta: 'நெல்லூர்', kn: 'ನೆಲ್ಲೂರು', ml: 'നെല്ലൂർ' },
  NTR: { en: 'NTR', te: 'ఎన్టీఆర్', hi: 'एनटीआर', ta: 'என்டிஆர்', kn: 'ಎನ್‌ಟಿಆರ್', ml: 'എൻടിആർ' },
  Palnadu: { en: 'Palnadu', te: 'పల్నాడు', hi: 'पलनाडु', ta: 'பால்நாடு', kn: 'ಪಲ್ನಾಡು', ml: 'പൽനാട്' },
  'Parvathipuram Manyam': { en: 'Parvathipuram Manyam', te: 'పార్వతీపురం మన్యం', hi: 'पार्वतीपुरम मान्यम', ta: 'பார்வதிபுரம் மான்யம்', kn: 'ಪಾರ್ವತಿಪುರಂ ಮನ್ಯಂ', ml: 'പാർവതിപുരം മന്യം' },
  Prakasam: { en: 'Prakasam', te: 'ప్రకాశం', hi: 'प्रकाशम', ta: 'பிரகாசம்', kn: 'ಪ್ರಕಾಶಂ', ml: 'പ്രകാശം' },
  Srikakulam: { en: 'Srikakulam', te: 'శ్రీకాకుళం', hi: 'श्रीकाकुलम', ta: 'ஸ்ரீகாகுளம்', kn: 'ಶ್ರೀಕಾಕುಳಂ', ml: 'ശ്രീകാകുളം' },
  'Sri Sathya Sai': { en: 'Sri Sathya Sai', te: 'శ్రీ సత్యసాయి', hi: 'श्री सत्य साईं', ta: 'ஸ்ரீ சத்ய சாய்', kn: 'ಶ್ರೀ ಸತ್ಯ ಸಾಯಿ', ml: 'ശ്രീ സത്യ സായി' },
  Tirupati: { en: 'Tirupati', te: 'తిరుపతి', hi: 'तिरुपति', ta: 'திருப்பதி', kn: 'ತಿರುಪತಿ', ml: 'തിരുപ്പതി' },
  Visakhapatnam: { en: 'Visakhapatnam', te: 'విశాఖపట్నం', hi: 'विशाखापट्टनम', ta: 'விசாகப்பட்டினம்', kn: 'ವಿಶಾಖಪಟ್ಟಣಂ', ml: 'വിശാഖപട്ടണം' },
  Vizianagaram: { en: 'Vizianagaram', te: 'విజయనగరం', hi: 'विजयनगरम', ta: 'விஜயநகரம்', kn: 'ವಿಜಯನಗರಂ', ml: 'വിജയനഗരം' },
  'West Godavari': { en: 'West Godavari', te: 'పశ్చిమ గోదావరి', hi: 'पश्चिमी गोदावरी', ta: 'மேற்கு கோதாவரி', kn: 'ಪಶ್ಚಿಮ ಗೋದಾವರಿ', ml: 'പടിഞ്ഞാറൻ ഗോദാവരി' },
  'YSR Kadapa': { en: 'YSR Kadapa', te: 'వైఎస్ఆర్ కడప', hi: 'वाईएसआर कडपा', ta: 'ஒய்எஸ்ஆர் கடப்பா', kn: 'ವೈಎಸ್‌ಆರ್ ಕಡಪ', ml: 'വൈഎസ്ആർ കടപ്പ' }
};

export function getDistrictDisplayName(districtId: string, language: string): string {
  const aliases: Record<string, string> = { Anantapur: 'Ananthapuramu' };
  const names = ANDHRA_PRADESH_DISTRICT_NAMES[districtId] || ANDHRA_PRADESH_DISTRICT_NAMES[aliases[districtId]];
  return names?.[language as SupportedLanguage] || names?.en || districtId;
}

export const INDIA_LOCATIONS: LocationHierarchy = {
  "Andhra Pradesh": {
    "Guntur": ["Guntur APMC Yard", "Station Road", "RTC Complex", "Bypass Road"],
    "Krishna": ["Vijayawada Market Yard", "Gudivada Road", "Machilipatnam"],
    "Prakasam": ["Ongole APMC", "Markapur Road", "Chirala Market"],
    "Kurnool": ["Market Yard", "Old Bus Stand", "Town Hall Area"],
    "Anantapur": ["Clock Tower", "APMC Circle", "Tadipatri Road"],
    "Visakhapatnam": ["Anakapalle Jaggery Market", "Gajuwaka", "Madhavadhara"],
    "West Godavari": ["Tadepalligudem APMC", "Eluru Main Road", "Bhimavaram"],
    "East Godavari": ["Rajahmundry APMC", "Kakinada Port Road", "Amalapuram"],
    "Chittoor": ["Madanapalle Tomato Market", "Chittoor APMC", "Tirupati Road"],
    "Nellore": ["APMC Market Yard", "Kavali Road", "Gudur Bus Stand"]
  },
  "Arunachal Pradesh": {
    "Papum Pare": ["Itanagar Market", "Naharlagun Daily Market", "Nirjuli"],
    "East Siang": ["Pasighat Main Market", "Ruksin Bazaar"],
    "West Kameng": ["Bomdila Town", "Dirang Market"]
  },
  "Assam": {
    "Kamrup Metropolitan": ["Guwahati Pamohi APMC", "Fancy Bazaar", "Dispur"],
    "Nagaon": ["Nagaon APMC Yard", "Haibargaon", "Koliabor Market"],
    "Cachar": ["Silchar Fatak Bazaar", "Rangirkhari", "Udarbond"],
    "Dibrugarh": ["Dibrugarh Chowkidinghee", "Naharani Market", "Tinsukia Road"],
    "Jorhat": ["Gar Ali Market", "Jorhat APMC", "Rowriah"]
  },
  "Bihar": {
    "Patna": ["Musallahpur Hat", "Mithapur APMC", "Danapur Market"],
    "Muzaffarpur": ["Bela Industrial Area", "Aghoria Bazar", "Kanti Market"],
    "Gaya": ["Kedarnath Market", "Tekari Road", "Manpur"],
    "Bhagalpur": ["Mirjanhat APMC", "Naya Bazar", "Sultanganj"],
    "Rohtas": ["Sasaram APMC Yard", "Dehri-on-Sone", "Nokha"],
    "Nalanda": ["Bihar Sharif APMC", "Rajgir Road", "Hilsa"]
  },
  "Chhattisgarh": {
    "Raipur": ["Pandri APMC Yard", "Fafadih Market", "Tatibandh"],
    "Durg": ["Bhilai Supela Market", "Durg APMC", "Patan Road"],
    "Bilaspur": ["Tifra APMC Yard", "Vyapar Vihar", "Bodri"],
    "Rajnandgaon": ["Ganj Line Market", "Rajnandgaon APMC", "Dongargarh"]
  },
  "Goa": {
    "North Goa": ["Mapusa Friday Market", "Panaji APMC Yard", "Bicholim"],
    "South Goa": ["Margao Gandhi Market", "Ponda APMC", "Curchorem"]
  },
  "Gujarat": {
    "Ahmedabad": ["Jamalpur APMC Market", "Naroda GIDC", "Sanand APMC"],
    "Rajkot": ["Bedi APMC Market Yard", "Gondal Road", "Dhoraji"],
    "Surat": ["Sardar Market APMC", "Varachha", "Bardoli APMC"],
    "Vadodara": ["Sayajigunj APMC", "Padra Road", "Karjan APMC"],
    "Junagadh": ["Junagadh APMC Yard", "Keshod Market", "Manavadar"],
    "Banaskantha": ["Palanpur APMC", "Dessa APMC Yard", "Tharad"]
  },
  "Haryana": {
    "Karnal": ["Karnal Grain Market APMC", "Gharaunda", "Taraori"],
    "Hisar": ["Hisar New Grain Market", "Hansi APMC", "Barwala"],
    "Ambala": ["Ambala City Grain Market", "Naraingarh", "Barara"],
    "Sirsa": ["Sirsa APMC Yard", "Dabwali Road", "Ellenabad"],
    "Kurukshetra": ["Pipli Grain Market", "Shahbad APMC", "Thanesar"]
  },
  "Himachal Pradesh": {
    "Shimla": ["Dhalli Fruit Market APMC", "The Mall Road", "Rampur"],
    "Kangra": ["Dharamshala Main Market", "Palampur APMC", "Kangra Town"],
    "Mandi": ["Mandi Grain Market", "Sundernagar APMC", "Nerchowk"],
    "Solan": ["Solan Vegetable APMC Yard", "Parwanoo", "Nalagarh"]
  },
  "Jharkhand": {
    "Ranchi": ["Pundag APMC Yard", "Kanke Road", "Daily Market Ranchi"],
    "Dhanbad": ["Bartand APMC Yard", "Katras Bazar", "Jharia"],
    "East Singhbhum": ["Jamshedpur Parsudih APMC", "Sakchi Market", "Ghatshila"],
    "Hazaribagh": ["Hazaribagh APMC Yard", "Barhi", "Vishnugarh"]
  },
  "Karnataka": {
    "Bengaluru Urban": ["Yeshwanthpur APMC Yard", "KR Market", "Hebbal APMC"],
    "Kolar": ["Kolar APMC Yard Gate", "MB Road", "Bangarapet"],
    "Shivamogga": ["BH Road APMC Yard", "Bus Stand Circle", "Sagar Road"],
    "Mysuru": ["Bandipalya APMC Yard", "Sayyaji Rao Road", "Hunsur"],
    "Belagavi": ["Belagavi APMC Yard", "Khadak Galli", "Gokak"],
    "Mandya": ["Mandya APMC Yard", "Maddur Road", "Srirangapatna"],
    "Davanagere": ["Davanagere APMC Yard", "PB Road", "Harihar"]
  },
  "Kerala": {
    "Palakkad": ["Valanyar APMC Yard", "Big Bazaar Palakkad", "Chittur"],
    "Wayanad": ["Kalpetta APMC Yard", "Sulthan Bathery", "Mananthavady"],
    "Idukki": ["Kattappana Spices Market", "Adimali", "Thodupuzha APMC"],
    "Ernakulam": ["Broadway Market Kochi", "Aluva APMC", "Perumbavoor"],
    "Thrissur": ["Sakthan Thampuran Market", "Chalakkudy APMC", "Kunnamkulam"]
  },
  "Madhya Pradesh": {
    "Indore": ["Choithram APMC Market", "Laxmibai Nagar APMC", "Mhow"],
    "Ujjain": ["Chimanganj APMC Mandi", "Freeganj", "Nagda"],
    "Bhopal": ["Karond APMC Mandi", "Hamidia Road", "Berasia"],
    "Jabalpur": ["Vijay Nagar APMC Mandi", "Patatan Market", "Sihora"],
    "Gwalior": ["Laxmi Ganj APMC Mandi", "Hazira Market", "Dabra"]
  },
  "Maharashtra": {
    "Nashik": ["Panchavati APMC Market", "Pimplegaon Baswant", "Lasalgaon Onion APMC"],
    "Pune": ["Gultekdi APMC Market Yard", "Hadapsar APMC", "Baramati APMC"],
    "Ahmednagar": ["Ahmednagar APMC Mandi", "Rahata APMC", "Sangamner"],
    "Nagpur": ["Kalamna APMC Market Yard", "Cotton Market Nagpur", "Saoner"],
    "Aurangabad": ["Jadhavwadi APMC Yard", "Paithan Road", "Gangapur"],
    "Solapur": ["Solapur APMC Market Yard", "Pandharpur", "Barshi APMC"]
  },
  "Manipur": {
    "Imphal East": ["Ima Keithel Market", "Porompat", "Lamlai"],
    "Imphal West": ["Khwairamband Bazaar", "Thangal Bazaar", "Lamphelpat"]
  },
  "Meghalaya": {
    "East Khasi Hills": ["Iewduh Bara Bazaar Shillong", "Laitumkhrah", "Mawsynram Road"],
    "West Garo Hills": ["Tura Super Market", "Phulbari Market", "Rongram"]
  },
  "Mizoram": {
    "Aizawl": ["Bara Bazaar Aizawl", "Zarkawt Market", "Bawngkawn"],
    "Lunglei": ["Lunglei Main Bazaar", "Venglai"]
  },
  "Nagaland": {
    "Kohima": ["Kohima Mao Market", "High School Junction", "PHED Colony"],
    "Dimapur": ["Dimapur Hong Kong Market", "New Market", "Chumoukedima"]
  },
  "Odisha": {
    "Cuttack": ["Malgodown Wholesellers APMC", "Chhatrabazar", "Choudwar"],
    "Khordha": ["Bhubaneswar Unit 1 APMC", "Jatni Market", "Khordha Town"],
    "Ganjam": ["Berhampur APMC Mandi", "Aska Road", "Bhanjanagar"],
    "Sambalpur": ["Bareipali APMC Yard", "Khetrajpur", "Burla"],
    "Bargarh": ["Bargarh APMC Paddy Yard", "Attabira", "Padampur"]
  },
  "Punjab": {
    "Ludhiana": ["Ludhiana New Grain Market APMC", "Khanna APMC Mandi", "Jagraon"],
    "Amritsar": ["Bhagtanwala APMC Grain Market", "Majitha Road", "Jandiala"],
    "Jalandhar": ["Jalandhar Cantt APMC Market", "Maqsudan APMC", "Nakodar"],
    "Patiala": ["Sirhind Road Grain Market", "Nabaha APMC", "Samana"],
    "Bathinda": ["Bathinda APMC Grain Market", "Raman Mandi", "Mauri Mandi"]
  },
  "Rajasthan": {
    "Jaipur": ["Muhana Mandi APMC", "Surajpole Mandi", "Chomu APMC"],
    "Jodhpur": ["Bhagat Ki Kothi APMC Mandi", "Maha Mandi", "Piparcity"],
    "Kota": ["Bhana Mada APMC Mandi", "Kota Grain Market", "Ramganj Mandi"],
    "Udaipur": ["Savina APMC Mandi", "Surajpole Udaipur", "Fatehnagar"],
    "Sri Ganganagar": ["Sri Ganganagar Grain APMC", "Raisinghnagar", "Suratgarh"]
  },
  "Sikkim": {
    "East Sikkim": ["Gangtok Lal Bazaar", "Ranipool APMC", "Singtam Market"],
    "South Sikkim": ["Namchi Central Market", "Jorethang APMC"]
  },
  "Tamil Nadu": {
    "Coimbatore": ["Mettupalayam Road APMC", "Gandhipuram Market", "Pollachi APMC"],
    "Madurai": ["Mattuthavani Vegetable APMC", "Simmakkal", "Melur APMC"],
    "Salem": ["Leigh Bazaar APMC", "Suramangalam", "Attur APMC Yard"],
    "Tiruchirappalli": ["Gandhi Market Trichy", "Kallakudi APMC", "Thuraiyur"],
    "Erode": ["Erode Turmeric APMC Yard", "Perundurai Road", "Bhavani"],
    "Thanjavur": ["Thanjavur APMC Grain Market", "Pattukkottai", "Kumbakonam"]
  },
  "Telangana": {
    "Hyderabad": ["Gudimalkapur APMC Market", "Bowenpally APMC", "LB Nagar Market"],
    "Warangal": ["Enamamula APMC Market Yard", "Hanamkonda", "Kazipet"],
    "Karimnagar": ["Collectorate Circle APMC", "Tower Circle", "Jagtial Road"],
    "Nizamabad": ["Nizamabad APMC Market Yard", "Armoor Road", "Bodhan APMC"],
    "Nalgonda": ["Nalgonda APMC Yard", "Miryalaguda Paddy Mandi", "Suryapet"]
  },
  "Tripura": {
    "West Tripura": ["Battala Market Agartala", "Maharaj Ganj Bazaar", "Jirania"],
    "Gomati": ["Udaipur Central Market", "Kakraban Market"]
  },
  "Uttar Pradesh": {
    "Lucknow": ["Dubagga APMC Mandi", "Navin Galla Mandi Sitapur Road", "Charbagh"],
    "Kanpur Nagar": ["Naubasta APMC Galla Mandi", "Collectorganj", "Rawatpur"],
    "Varanasi": ["Pahariya APMC Mandi", "Chandua Ganj", "Ramnagar"],
    "Agra": ["Kuberpur APMC Mandi", "Sikandra Market", "Fatehabad Road"],
    "Meerut": ["Delapeer APMC Galla Mandi", "Modinagar", "Sardhana"],
    "Prayagraj": ["Mundera APMC Mandi", "Naini Market", "Phulpur"]
  },
  "Uttarakhand": {
    "Dehradun": ["Niranjanpur APMC Mandi", "Hanuman Chowk", "Rishikesh APMC"],
    "Haridwar": ["Jwalapur APMC Mandi", "Laksar Road", "Roorkee APMC"],
    "Udham Singh Nagar": ["Rudrapur APMC Galla Mandi", "Kashipur APMC", "Kichha"]
  },
  "West Bengal": {
    "Hooghly": ["Singur Cold Storage APMC", "Sheoraphuli Market", "Arambagh"],
    "Nadia": ["Krishnanagar APMC Market Yard", "Ranaghat", "Chakdaha"],
    "Murshidabad": ["Baharampur APMC Yard", "Kandi Market", "Jangipur"],
    "Burdwan": ["Burdwan APMC Galla Mandi", "Kalna Market", "Katwa"],
    "North 24 Parganas": ["Barasat APMC Market", "Habra Market Yard", "Basirhat"]
  },
  "Andaman & Nicobar Islands": {
    "South Andaman": ["Port Blair Aberdeen Bazaar", "Junglighat Market", "Garacharma"],
    "North & Middle Andaman": ["Mayabunder Town Market", "Diglipur Bazaar"]
  },
  "Chandigarh": {
    "Chandigarh": ["Sector 26 Grain APMC Market", "Sector 43 APMC", "Mani Majra"]
  },
  "Dadra & Nagar Haveli and Daman & Diu": {
    "Daman": ["Daman Market Building", "Nani Daman"],
    "Silvassa": ["Silvassa APMC Market Yard", "Khanvel Road"]
  },
  "Delhi": {
    "New Delhi": ["Azadpur APMC Wholesale Mandi", "Okhla Sabzi Mandi", "Ghazipur APMC"],
    "North West Delhi": ["Narela APMC Grain Market", "Kanjhawala Market", "Bawana"],
    "South West Delhi": ["Najafgarh APMC Mandi", "Bijwasan Market", "Kapashera"]
  },
  "Jammu & Kashmir": {
    "Srinagar": ["Parimpora Fruit & Agri APMC", "Lal Chowk Srinagar", "Soura"],
    "Jammu": ["Narwal APMC Fruit Market", "Warehouse Jammu", "R S Pura Mandi"],
    "Anantnag": ["Anantnag APMC Fruit Yard", "Bijbehara Market", "Dooru"],
    "Baramulla": ["Sopore Fruit APMC Yard", "Baramulla Main Market", "Pattan"]
  },
  "Ladakh": {
    "Leh": ["Leh Main Bazaar", "Skara APMC Yard", "Choglamsar"],
    "Kargil": ["Kargil Main Market", "Baroo Colony"]
  },
  "Lakshadweep": {
    "Kavaratti": ["Kavaratti Island Co-op Store", "Agatti Island Market"]
  },
  "Puducherry": {
    "Puducherry": ["Grand Bazaar Puducherry", "Mettupalayam APMC Yard", "Villianur"],
    "Karaikal": ["Karaikal APMC Market Yard", "Kottucherry"]
  }
};
