const governmentSchemesData = [
  {
    schemeId: 'pm-kisan',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    shortName: 'PM-KISAN',
    category: 'subsidies',
    state: 'All India',
    overview: 'Financial assistance scheme providing ₹6,000 per year in three equal installments to small and marginal farmer families across India.',
    eligibility: [
      'All landholding farmers families across India',
      'Subject to exclusion criteria (e.g. institutional landholders, high-income taxpayers)'
    ],
    benefits: [
      '₹6,000 per year directly transferred to bank accounts in 3 installments of ₹2,000',
      'Direct Benefit Transfer (DBT) ensuring 100% transparency'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Land Ownership Papers / Record of Rights (RoR)',
      'Active Bank Account linked with Aadhaar',
      'Mobile Number'
    ],
    applicationProcess: [
      'Self-registration through PM-KISAN Portal (pmkisan.gov.in)',
      'Registration via nearest Common Service Centre (CSC)'
    ],
    officialUrl: 'https://pmkisan.gov.in/'
  },
  {
    schemeId: 'pmfby',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    shortName: 'PMFBY',
    category: 'insurance',
    state: 'All India',
    overview: 'Comprehensive crop insurance coverage against non-preventable natural risks from pre-sowing to post-harvest stages at nominal premium rates.',
    eligibility: [
      'All farmers growing notified crops in notified areas including sharecroppers and tenant farmers'
    ],
    benefits: [
      'Very low premium: 2% for Kharif crops, 1.5% for Rabi crops, 5% for commercial/horticultural crops',
      'Balance premium subsidized by Central and State Governments',
      'Full insured amount claim for crop loss due to flood, drought, pests, or post-harvest damage'
    ],
    documentsRequired: [
      'Land Records (Khasra/Khatauni)',
      'Sowing Certificate / Declaration',
      'Aadhaar Card & Bank Passbook',
      'Cancelled Cheque'
    ],
    applicationProcess: [
      'Apply online via National Crop Insurance Portal (pmfby.gov.in)',
      'Through local bank branch or insurance agent before cut-off date'
    ],
    officialUrl: 'https://pmfby.gov.in/'
  },
  {
    schemeId: 'kcc',
    title: 'Kisan Credit Card (KCC) Scheme',
    shortName: 'Kisan Credit Card',
    category: 'loans',
    state: 'All India',
    overview: 'Provides timely and adequate short-term credit to farmers for crop cultivation, post-harvest expenses, maintenance of farm assets, and allied activities.',
    eligibility: [
      'Individual farmers / Joint borrowers',
      'Tenant farmers, oral lessees, and sharecroppers',
      'Self Help Groups (SHGs) or Joint Liability Groups (JLGs)'
    ],
    benefits: [
      'Concessional interest rate of 7% per annum for loans up to ₹3 Lakhs',
      '3% interest subvention for prompt repayment (effective interest 4%)',
      'Flexible credit limits with collateral-free loan up to ₹1.6 Lakhs'
    ],
    documentsRequired: [
      'Duly filled application form',
      'Identity Proof (Aadhaar, Voter ID, PAN)',
      'Address Proof & Land Records',
      'Passport size photographs'
    ],
    applicationProcess: [
      'Visit nearest Commercial Bank, RRB, or Cooperative Bank',
      'Fill KCC application form and submit supporting documents'
    ],
    officialUrl: 'https://www.myscheme.gov.in/schemes/kcc'
  },
  {
    schemeId: 'pmksy',
    title: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)',
    shortName: 'PMKSY',
    category: 'irrigation',
    state: 'All India',
    overview: 'Promotes "Per Drop More Crop" micro-irrigation (Drip and Sprinkler) to improve water-use efficiency and expand cultivated area under assured irrigation.',
    eligibility: [
      'Farmers owning cultivated land with assured water source'
    ],
    benefits: [
      '55% subsidy for small/marginal farmers and 45% for other farmers on micro-irrigation systems',
      'Reduced water consumption by 30-50% and fertilizer savings'
    ],
    documentsRequired: [
      'Land ownership documents',
      'Water source availability proof',
      'Aadhaar & Bank details'
    ],
    applicationProcess: [
      'Apply through District Agriculture / Horticulture Officer or State PMKSY portal'
    ],
    officialUrl: 'https://pmksy.gov.in/'
  },
  {
    schemeId: 'mky',
    title: 'Mahila Kisan Sashaktikaran Pariyojana (MKSP)',
    shortName: 'MKSP Women Farmers',
    category: 'women',
    state: 'All India',
    overview: 'Empowers women in agriculture by making systematic investments to enhance their participation, productivity, and sustainable livelihoods.',
    eligibility: [
      'Women farmers, women Self Help Groups (SHGs), and marginal women agricultural workers'
    ],
    benefits: [
      '100% capacity building, organic farming training, and skill development',
      'Financial seed capital for women-led agricultural enterprises and seed banks'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'SHG Membership Certificate / ID',
      'Bank Account details'
    ],
    applicationProcess: [
      'Apply through State Rural Livelihood Mission (SRLM) or local Gram Panchayat'
    ],
    officialUrl: 'https://aajeevika.gov.in/'
  },
  {
    schemeId: 'didf',
    title: 'Dairy Processing and Infrastructure Development Fund (DIDF)',
    shortName: 'DIDF Dairy Scheme',
    category: 'dairy',
    state: 'All India',
    overview: 'Focuses on modernizing milk processing plants, chilling infrastructure, and strengthening milk cooperatives for dairy farmers.',
    eligibility: [
      'Dairy Cooperative Societies, Milk Producer Companies, State Dairy Federations'
    ],
    benefits: [
      'Subsidized loan interest rate at 6.5% per annum',
      'Creation of milk chilling infrastructure and quality testing equipment in rural hubs'
    ],
    documentsRequired: [
      'Registration Certificate of Cooperative/Producer Co.',
      'Project Detailed Report (DPR)',
      'Bank Account details'
    ],
    applicationProcess: [
      'Apply via National Dairy Development Board (NDDB) or NABARD portal'
    ],
    officialUrl: 'https://www.nddb.coop/'
  },
  {
    schemeId: 'pmmsy',
    title: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
    shortName: 'PMMSY Fisheries',
    category: 'fisheries',
    state: 'All India',
    overview: 'Flagship scheme for holistic development of fisheries sector including aquaculture, fish farming ponds, boats, and cold chains.',
    eligibility: [
      'Fishers, fish farmers, fish workers, fisheries cooperatives, and SC/ST/Women fishers'
    ],
    benefits: [
      '40% financial subsidy for General category and 60% for SC/ST/Women beneficiaries',
      'Insurance coverage up to ₹5 Lakhs for active fishermen'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Fisheries License / Land ownership for pond creation',
      'Bank details'
    ],
    applicationProcess: [
      'Apply at District Fisheries Office or online via pmmsy.dof.gov.in'
    ],
    officialUrl: 'https://pmmsy.dof.gov.in/'
  },
  {
    schemeId: 'rythu-bharosa',
    title: 'YSR Rythu Bharosa - PM KISAN (Andhra Pradesh)',
    shortName: 'Rythu Bharosa',
    category: 'crop',
    state: 'Andhra Pradesh',
    overview: 'State financial assistance scheme providing ₹13,500 per year to farmer families including tenant farmers in Andhra Pradesh.',
    eligibility: [
      'Farmer families owning land and registered tenant farmers in AP'
    ],
    benefits: [
      '₹13,500 annually in 3 installments (₹7,500 before Kharif, ₹4,000 before Rabi, ₹2,000 during Sankranti)'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'AP Pattadar Passbook / CCRC Card for tenant farmers',
      'Bank Passbook'
    ],
    applicationProcess: [
      'Apply via Village Secretariat (Grama Sachivalayam) or rythubharosa.ap.gov.in'
    ],
    officialUrl: 'https://rythubharosa.ap.gov.in/'
  },
  {
    schemeId: 'rythu-bandhu',
    title: 'Rythu Bandhu Scheme (Telangana)',
    shortName: 'Rythu Bandhu',
    category: 'subsidies',
    state: 'Telangana',
    overview: 'Investment support scheme providing ₹10,000 per acre per year to land-owning farmers in Telangana for purchasing agricultural inputs.',
    eligibility: [
      'All Pattadar land-owning farmers in Telangana state'
    ],
    benefits: [
      '₹5,000 per acre for Kharif season + ₹5,000 per acre for Rabi season directly into bank account'
    ],
    documentsRequired: [
      'Telangana Pattadar Passbook',
      'Aadhaar Card',
      'Bank Account details'
    ],
    applicationProcess: [
      'Enrolled via Agriculture Extension Officer (AEO) or rythubandhu.telangana.gov.in'
    ],
    officialUrl: 'https://rythubandhu.telangana.gov.in/'
  }
];

// @desc Get all agricultural schemes
// @route GET /api/schemes
exports.getSchemes = async (req, res) => {
  try {
    const { category, search, state } = req.query;
    let result = governmentSchemesData;

    if (state && state.toLowerCase() !== 'all') {
      result = result.filter(s => 
        s.state.toLowerCase() === 'all india' || 
        s.state.toLowerCase().includes(state.toLowerCase())
      );
    }

    if (category && category.toLowerCase() !== 'all') {
      result = result.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.shortName.toLowerCase().includes(q) || 
        s.overview.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q)
      );
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
