// @ts-nocheck
let currentMode = 'buy';
let lastCalculatedData = null;
let cachedPortfolioData = {};
let liveMarketItems = [];
let currentSortColumn = null;
let isSortAscending = true;

// Complete Master List of NEPSE Companies
const nepseCompanies = [
    { symbol: "NABIL", name: "Nabil Bank Limited" },
    { symbol: "NIMB", name: "Nepal Investment Mega Bank Limited" },
    { symbol: "SCB", name: "Standard Chartered Bank Limited" },
    { symbol: "HBL", name: "Himalayan Bank Limited" },
    { symbol: "SBI", name: "Nepal SBI Bank Limited" },
    { symbol: "EBL", name: "Everest Bank Limited" },
    { symbol: "NICA", name: "NIC Asia Bank Ltd." },
    { symbol: "MBL", name: "Machhapuchhre Bank Limited" },
    { symbol: "LSL", name: "Laxmi Sunrise Bank Limited" },
    { symbol: "KBL", name: "Kumari Bank Limited" },
    { symbol: "SBL", name: "Siddhartha Bank Limited" },
    { symbol: "SHL", name: "Soaltee Hotel Limited" },
    { symbol: "TRH", name: "Taragaon Regency Hotel Limited" },
    { symbol: "OHL", name: "Oriental Hotels Limited" },
    { symbol: "NHPC", name: "National Hydro Power Company Limited" },
    { symbol: "BPCL", name: "Butwal Power Company Limited" },
    { symbol: "CHCL", name: "Chilime Hydropower Company Limited" },
    { symbol: "STC", name: "Salt Trading Corporation" },
    { symbol: "BBC", name: "Bishal Bazar Company Limited" },
    { symbol: "NUBL", name: "Nirdhan Utthan Laghubitta Bittiya Sanstha Limited" },
    { symbol: "CBBL", name: "Chhimek Laghubitta Bittiya Sanstha Limited" },
    { symbol: "DDBL", name: "Deprosc Laghubitta Bittiya Sanstha Limited" },
    { symbol: "SANIMA", name: "Sanima Bank Limited" },
    { symbol: "NABBC", name: "Narayani Development Bank Limited" },
    { symbol: "NICL", name: "Nepal Insurance Co. Ltd." },
    { symbol: "RBCL", name: "Rastriya Beema Company Limited" },
    { symbol: "NLICL", name: "National Life Insurance Co. Ltd." },
    { symbol: "HEI", name: "Himalayan Everest Insurance Limited" },
    { symbol: "UAIL", name: "United Ajod Insurance Limited" },
    { symbol: "SPIL", name: "Siddhartha Premier Insurance Limited" },
    { symbol: "NIL", name: "Neco Insurance Limited" },
    { symbol: "PRIN", name: "Prabhu Insurance Ltd." },
    { symbol: "SALICO", name: "Sagarmatha Lumbini Insurance Co. Limited" },
    { symbol: "IGI", name: "IGI Prudential Insurance Limited" },
    { symbol: "NLIC", name: "Nepal Life Insurance Co. Ltd." },
    { symbol: "LICN", name: "Life Insurance Corporation (Nepal) Limited" },
    { symbol: "SICL", name: "Shikhar Insurance Co. Ltd." },
    { symbol: "NFS", name: "Nepal Finance Ltd." },
    { symbol: "BNL", name: "Bottlers Nepal (Balaju) Limited" },
    { symbol: "NLO", name: "Nepal Lube Oil Limited" },
    { symbol: "GUFL", name: "Gurkhas Finance Ltd." },
    { symbol: "CIT", name: "Citizen Investment Trust" },
    { symbol: "BNT", name: "Bottlers Nepal (Terai) Limited" },
    { symbol: "UNL", name: "Unilever Nepal Limited" },
    { symbol: "BFC", name: "Best Finance Company Ltd." },
    { symbol: "GFCL", name: "Goodwill Finance Limited" },
    { symbol: "HDL", name: "Himalayan Distillery Limited" },
    { symbol: "PFL", name: "Pokhara Finance Ltd." },
    { symbol: "NMB", name: "NMB Bank Limited" },
    { symbol: "SIFC", name: "Shree Investment Finance Co. Ltd." },
    { symbol: "CFCL", name: "Central Finance Co. Ltd." },
    { symbol: "JFL", name: "Janaki Finance Company Limited" },
    { symbol: "PRVU", name: "Prabhu Bank Limited" },
    { symbol: "GMFIL", name: "Guheshowori Merchant Bank & Finance Co. Ltd." },
    { symbol: "SWBBL", name: "Swabalamban Laghubitta Bittiya Sanstha Limited" },
    { symbol: "ICFC", name: "ICFC Finance Limited" },
    { symbol: "EDBL", name: "Excel Development Bank Ltd." },
    { symbol: "NTC", name: "Nepal Doorsanchar Company Limited" },
    { symbol: "PROFL", name: "Progressive Finance Limited" },
    { symbol: "GBIME", name: "Global IME Bank Limited" },
    { symbol: "CZBIL", name: "Citizens Bank International Limited" },
    { symbol: "PCBL", name: "Prime Commercial Bank Ltd." },
    { symbol: "LBBL", name: "Lumbini Bikas Bank Ltd." },
    { symbol: "AHPC", name: "Arun Valley Hydropower Development Co. Ltd." },
    { symbol: "MDB", name: "Miteri Development Bank Limited" },
    { symbol: "ALICL", name: "Asian Life Insurance Co. Limited" },
    { symbol: "HLI", name: "Himalayan Life Insurance Limited" },
    { symbol: "NMLBBL", name: "Nerude Mirmire Laghubitta Bittiya Sanstha Limited" },
    { symbol: "ADBL", name: "Agricultural Development Bank Limited" },
    { symbol: "MLBL", name: "Mahalaxmi Bikas Bank Ltd." },
    { symbol: "SJLIC", name: "SuryaJyoti Life Insurance Company Limited" },
    { symbol: "GBBL", name: "Garima Bikas Bank Limited" },
    { symbol: "JBBL", name: "Jyoti Bikas Bank Limited" },
    { symbol: "CORBL", name: "Corporate Development Bank Limited" },
    { symbol: "KSBBL", name: "Kamana Sewa Bikas Bank Limited" },
    { symbol: "MPFL", name: "Multipurpose Finance Company Limited" },
    { symbol: "SADBL", name: "Shangrila Development Bank Ltd." },
    { symbol: "SHINE", name: "Shine Resunga Development Bank Ltd." },
    { symbol: "MNBBL", name: "Muktinath Bikas Bank Ltd." },
    { symbol: "FMDBL", name: "First Micro Finance Laghubitta Bittiya Sanstha Limited" },
    { symbol: "MFIL", name: "Manjushree Finance Ltd." },
    { symbol: "NBL", name: "Nepal Bank Limited" },
    { symbol: "SLBBL", name: "Swarojgar Laghubitta Bittiya Sanstha Ltd." },
    { symbol: "NLG", name: "NLG Insurance Company Ltd." },
    { symbol: "SINDU", name: "Sindhu Bikash Bank Ltd." },
    { symbol: "SKBBL", name: "Sana Kisan Bikas Laghubitta Bittiya Sanstha Limited" },
    { symbol: "GBLBS", name: "Grameen Bikas Laghubitta Bittiya Sanstha Ltd." },
    { symbol: "RLFL", name: "Reliance Finance Ltd." },
    { symbol: "SHPC", name: "Sanima Mai Hydropower Ltd." },
    { symbol: "KMCDB", name: "Kalika Laghubitta Bittiya Sanstha Ltd." },
    { symbol: "MLBBL", name: "Mithila Laghubitta Bittiya Sanstha Limited" },
    { symbol: "RIDI", name: "Ridi Power Company Limited" },
    { symbol: "LLBS", name: "Laxmi Laghubitta Bittiya Sanstha Ltd." },
    { symbol: "BARUN", name: "Barun Hydropower Co. Ltd." },
    { symbol: "VLBS", name: "Vijaya Laghubitta Bittiya Sanstha Ltd." },
    { symbol: "HLBSL", name: "Himalayan Laghubitta Bittiya Sanstha Limited" },
    { symbol: "MATRI", name: "Matribhumi Laghubitta Bittiya Sanstha Limited" },
    { symbol: "JSLBB", name: "Janautthan Samudayic Laghubitta Bittiya Sanstha Limited" },
    { symbol: "API", name: "Api Power Company Ltd." },
    { symbol: "NMBMF", name: "NMB Microfinance Bittiya Sanstha Ltd." },
    { symbol: "GILB", name: "Global IME Laghubitta Bittiya Sanstha Ltd." },
    { symbol: "SWMF", name: "Suryodaya Womi Laghubitta Bittiya Sanstha Limited" },
    { symbol: "MERO", name: "Mero Microfinance Bittiya Sanstha Ltd." },
    { symbol: "HIDCL", name: "Hydroelectricity Investment and Development Company Ltd." },
    { symbol: "NGPL", name: "Ngadi Group Power Ltd." },
    { symbol: "GRDBL", name: "Green Development Bank Ltd." },
    { symbol: "NMFBS", name: "National Laghubitta Bittiya Sanstha Limited" },
    { symbol: "RSDC", name: "RSDC Laghubitta Bittiya Sanstha Ltd." },
    { symbol: "KKHC", name: "Khanikhola Hydropower Co. Ltd." },
    { symbol: "DHPL", name: "Dibyashwori Hydropower Ltd." },
    { symbol: "AKPL", name: "Arun Kabeli Power Ltd." },
    { symbol: "FOWAD", name: "Forward Microfinance Laghubitta Bittiya Sanstha Limited" },
    { symbol: "SPDL", name: "Synergy Power Development Ltd." },
    { symbol: "UMHL", name: "United Modi Hydropower Ltd." },
    { symbol: "SMATA", name: "Samata Gharelu Laghubitta Bittiya Sanstha Limited" },
    { symbol: "CHL", name: "Chhyangdi Hydropower Ltd." },
    { symbol: "HPPL", name: "Himalayan Power Partner Ltd." },
    { symbol: "MSLB", name: "Mahuli Laghubitta Bittiya Sanstha Limited" },
    { symbol: "NHDL", name: "Nepal Hydro Developers Ltd." },
    { symbol: "SMB", name: "Support Microfinance Bittiya Sanstha Ltd." },
    { symbol: "USLB", name: "Unnati Sahakarya Laghubitta Bittiya Sanstha Limited" },
    { symbol: "RADHI", name: "Radhi Bidyut Company Ltd." },
    { symbol: "NADEP", name: "Nadep Laghubitta Bittiya Sanstha Ltd." },
    { symbol: "PMHPL", name: "Panchakanya Mai Hydropower Ltd." },
    { symbol: "KPCL", name: "Kalika Power Company Ltd." },
    { symbol: "AKJCL", name: "Ankhu Khola Jalvidhyut Company Ltd." },
    { symbol: "JOSHI", name: "Joshi Hydropower Development Company Ltd." },
    { symbol: "ACLBSL", name: "Aarambha Chautari Laghubitta Bittiya Sanstha Limited" },
    { symbol: "UPPER", name: "Upper Tamakoshi Hydropower Ltd." },
    { symbol: "SLBSL", name: "Samudayik Laghubitta Bittiya Sanstha Limited" },
    { symbol: "GHL", name: "Ghalemdi Hydro Limited" },
    { symbol: "ALBSL", name: "Asha Laghubitta Bittiya Sanstha Ltd." },
    { symbol: "SHIVM", name: "Shivam Cements Ltd." },
    { symbol: "UPCL", name: "Universal Power Company Ltd." },
    { symbol: "MHNL", name: "Mountain Hydro Nepal Limited" },
    { symbol: "PPCL", name: "Panchthar Power Company Limited" },
    { symbol: "GMFBS", name: "Ganapati Laghubitta Bittiya Sanstha Limited" },
    { symbol: "HURJA", name: "Himalaya Urja Bikas Company Limited" },
    { symbol: "GLBSL", name: "Gurans Laghubitta Bittiya Sanstha Limited" },
    { symbol: "SMFBS", name: "Swabhimaan Laghubitta Bittiya Sanstha Limited" },
    { symbol: "UNHPL", name: "Union Hydropower Limited" },
    { symbol: "ILBS", name: "Infinity Laghubitta Bittiya Sanstha Limited" },
    { symbol: "RHPL", name: "Rasuwagadhi Hydropower Company Limited" },
    { symbol: "SJCL", name: "Sanjen Jalavidhyut Company Limited" },
    { symbol: "SAPDBL", name: "Saptakoshi Development Bank Ltd." },
    { symbol: "HDHPC", name: "Himal Dolakha Hydropower Company Limited" },
    { symbol: "NRIC", name: "Nepal Reinsurance Company Limited" },
    { symbol: "NICLBSL", name: "NIC ASIA Laghubitta Bittiya Sanstha Limited" },
    { symbol: "SMPDA", name: "Sampada Laghubitta Bittiya Sanstha Limited" },
    { symbol: "NRN", name: "NRN Infrastructure and Development Limited" },
    { symbol: "LEC", name: "Liberty Energy Company Limited" },
    { symbol: "SSHL", name: "Shiva Shree Hydropower Ltd." },
    { symbol: "SGIC", name: "Sanima GIC Insurance Limited" },
    { symbol: "MEN", name: "Mountain Energy Nepal Limited" },
    { symbol: "UMRH", name: "United IDI Mardi RB Hydropower Limited" },
    { symbol: "PMLI", name: "Prabhu Mahalaxmi Life Insurance Limited" },
    { symbol: "CGH", name: "Chandragiri Hills Limited" },
    { symbol: "NIFRA", name: "Nepal Infrastructure Bank Limited" },
    { symbol: "GLH", name: "GreenLife Hydropower Limited" },
    { symbol: "MLBSL", name: "Mahila Laghubitta Bittiya Sanstha Limited" },
    { symbol: "SHEL", name: "Singati Hydro Energy Limited" },
    { symbol: "RURU", name: "Ru Ru Jalbidhyut Pariyojana Limited" },
    { symbol: "CHDC", name: "CEDB Holdings Limited" },
    { symbol: "JBLB", name: "Jeevan Bikas Laghubitta Bittiya Sanstha Ltd." },
    { symbol: "SRLI", name: "Sanima Reliance Life Insurance Limited" },
    { symbol: "MKJC", name: "Mailung Khola Jal Vidhyut Company Limited" },
    { symbol: "MLBS", name: "Manushi Laghubitta Bittiya Sanstha Limited" },
    { symbol: "SAHAS", name: "Sahas Urja Limited" },
    { symbol: "TPC", name: "Terhathum Power Company Limited" },
    { symbol: "SPC", name: "Samling Power Company Limited" },
    { symbol: "NYADI", name: "Nyadi Hydropower Limited" },
    { symbol: "MBJC", name: "Madhya Bhotekoshi Jalavidyut Company Limited" },
    { symbol: "BNHC", name: "Buddha Bhumi Nepal Hydropower Company Limited" },
    { symbol: "ENL", name: "Emerging Nepal Limited" },
    { symbol: "NESDO", name: "NESDO Sambridha Laghubitta Bittiya Sanstha Limited" },
    { symbol: "GVL", name: "Green Ventures Limited" },
    { symbol: "BHL", name: "Balephi Hydropower Limited" },
    { symbol: "ULBSL", name: "Upakar Laghubitta Bittiya Sanstha Limited" },
    { symbol: "CYCL", name: "CYC Nepal Laghubitta Bittiya Sanstha Limited" },
    { symbol: "RFPL", name: "River Falls Power Limited" },
    { symbol: "DORDI", name: "Dordi Khola Jal Bidyut Company Limited" },
    { symbol: "BHDC", name: "Bindhyabasini Hydropower Development Company Limited" },
    { symbol: "HHL", name: "Himalayan Hydropower Limited" },
    { symbol: "UHEWA", name: "Upper Hewakhola Hydropower Company Limited" },
    { symbol: "SGHC", name: "Swet-Ganga Hydropower & Construction Limited" },
    { symbol: "MHL", name: "Mandakini Hydropower Limited" },
    { symbol: "USHEC", name: "Upper Solu Hydro Electric Company Limited" },
    { symbol: "RHGCL", name: "Rapti Hydro and General Construction Limited" },
    { symbol: "AVYAN", name: "Aviyan Laghubitta Bittiya Sanstha Limited" },
    { symbol: "SPHL", name: "Sayapatri Hydropower Limited" },
    { symbol: "PPL", name: "People's Power Limited" },
    { symbol: "DLBS", name: "Dhaulagiri Laghubitta Bittiya Sanstha Limited" },
    { symbol: "SIKLES", name: "Sikles Hydropower Limited" },
    { symbol: "EHPL", name: "Eastern Hydropower Limited" },
    { symbol: "SHLB", name: "Shrijanshil Laghubitta Bittiya Sanstha Limited" },
    { symbol: "PHCL", name: "Peoples Hydropower Company Limited" },
    { symbol: "BHPL", name: "Barahi Hydropower Public Limited" },
    { symbol: "UNLB", name: "Unique Nepal Laghubitta Bittiya Sanstha Limited" },
    { symbol: "SMHL", name: "Super Madi Hydropower Limited" },
    { symbol: "SPL", name: "Shuvam Power Limited" },
    { symbol: "SMH", name: "Super Mai Hydropower Limited" },
    { symbol: "MKHC", name: "Maya Khola Hydropower Company Limited" },
    { symbol: "AHL", name: "Asian Hydropower Limited" },
    { symbol: "KDL", name: "Kalinchowk Darshan Limited" },
    { symbol: "TAMOR", name: "Sanima Middle Tamor Hydropower Limited" },
    { symbol: "MHCL", name: "Molung Hydropower Company Limited" },
    { symbol: "SMJC", name: "Sagarmatha Jalabidhyut Company Limited" },
    { symbol: "ANLB", name: "Aatmanirbhar Laghubitta Bittiya Sanstha Limited" },
    { symbol: "MAKAR", name: "Makar Jitumaya Suri Hydropower Limited" },
    { symbol: "MKHL", name: "Mai Khola Hydropower Limited" },
    { symbol: "DOLTI", name: "Dolti Power Company Limited" },
    { symbol: "BEDC", name: "Bhugol Energy Development Company Limited" },
    { symbol: "CITY", name: "City Hotel Limited" },
    { symbol: "MCHL", name: "Menchhiyam Hydropower Limited" },
    { symbol: "IHL", name: "Ingwa Hydropower Limited" },
    { symbol: "MEL", name: "Modi Energy Limited" },
    { symbol: "RAWA", name: "Rawa Energy Development Limited" },
    { symbol: "NRM", name: "Nepal Republic Media Limited" },
    { symbol: "ILI", name: "IME Life Insurance Company Limited" },
    { symbol: "USHL", name: "Upper Syange Hydropower Limited" },
    { symbol: "GCIL", name: "Ghorahi Cement Industry Limited" },
    { symbol: "TSHL", name: "Three Star Hydropower Limited" },
    { symbol: "KBSH", name: "Kutheli Bukhari Small Hydropower Limited" },
    { symbol: "RNLI", name: "Reliable Nepal Life Insurance Limited" },
    { symbol: "SNLI", name: "Sun Nepal Life Insurance Company Limited" },
    { symbol: "MEHL", name: "Manakamana Engineering Hydropower Limited" },
    { symbol: "ULHC", name: "Upper Lohore Khola Hydropower Company Limited" },
    { symbol: "CLI", name: "Citizen Life Insurance Company Limited" },
    { symbol: "MANDU", name: "Mandu Hydropower Limited" },
    { symbol: "HATHY", name: "Hathway Investment Nepal Limited" },
    { symbol: "BGWT", name: "Bhagawati Hydropower Development Company Limited" },
    { symbol: "MSHL", name: "Mid Solu Hydropower Limited" },
    { symbol: "SONA", name: "Sonapur Minerals and Oil Limited" },
    { symbol: "MMKJL", name: "Mathillo Mailun Khola Jalvidhyut Limited" },
    { symbol: "TVCL", name: "Trishuli Jal Vidhyut Company Limited" },
    { symbol: "VLUCL", name: "Vision Lumbini Urja Company Limited" },
    { symbol: "MKCL", name: "Muktinath Krishi Company Limited" },
    { symbol: "CKHL", name: "Chirkhwa Hydropower Limited" },
    { symbol: "NWCL", name: "Nepal Warehousing Company Limited" },
    { symbol: "HRL", name: "Himalayan Reinsurance Limited" },
    { symbol: "SARBTM", name: "Sarbottam Cement Limited" },
    { symbol: "GMLI", name: "Guardian Micro Life Insurance Limited" },
    { symbol: "NMIC", name: "Nepal Micro Insurance Company Limited" },
    { symbol: "CREST", name: "Crest Micro Life Insurance Limited" },
    { symbol: "OMPL", name: "Om Megashree Pharmaceuticals Limited" },
    { symbol: "PURE", name: "Pure Energy Limited" },
    { symbol: "TTL", name: "Trade Tower Limited" },
    { symbol: "SANVI", name: "Sanvi Energy Limited" },
    { symbol: "BHCL", name: "Bikash Hydropower Company Limited" },
    { symbol: "HIMSTAR", name: "Him Star Urja Company Limited" },
    { symbol: "MABEL", name: "Mabilung Energy Limited" },
    { symbol: "DHEL", name: "Daramkhola Hydro Energy Limited" },
    { symbol: "SAGAR", name: "Sagar Distillery Limited" },
    { symbol: "SWASTIK", name: "Swastik Laghubitta Bittiya Sanstha Limited" },
    { symbol: "BUNGAL", name: "Bungal Hydro Limited" },
    { symbol: "BANDIPUR", name: "Bandipur Cablecar and Tourism Limited" },
    { symbol: "JHAPA", name: "Jhapa Energy Limited" },
    { symbol: "SAIL", name: "Shreenagar Agritech Industries Limited" },
    { symbol: "SYPNL", name: "SY Panel Nepal Limited" },
    { symbol: "SABBL", name: "Salapa Bikas Bank Limited" },
    { symbol: "RSML", name: "Reliance Spinning Mills Limited" },
    { symbol: "HFIN", name: "Hotel Forest Inn Limited" },
    { symbol: "SOHL", name: "Solu Hydropower Limited" },
    { symbol: "BJHL", name: "Bhujung Hydropower Limited" },
    { symbol: "SKHL", name: "Super Khudi Hydropower Limited" },
    { symbol: "RLEL", name: "Ridge Line Energy Limited" },
    { symbol: "SKHEL", name: "Suryakunda Hydro Electric Limited" },
    { symbol: "SIPD", name: "Shikhar Power Development Limited" },
    { symbol: "PCIL", name: "Palpa Cement Industries Limited" },
    { symbol: "KHPL", name: "Kalinchock Hydropower Limited" },
    { symbol: "SOPL", name: "Sopan Pharmaceuticals Limited" },
    { symbol: "APHL", name: "Appolo Hydropower Limited" },
    { symbol: "YMHL", name: "Yambaling Hydropower Limited" },
    { symbol: "TPKHL", name: "Taksar Pikhuwa Khola Hydropower Limited" },
    { symbol: "SNORL", name: "Snow Rivers Limited" },
    { symbol: "SGHL", name: "Sanigad Hydro Limited" },
    { symbol: "KAHL", name: "Kalanga Hydro Limited" },
    { symbol: "ECL", name: "Everest Colour Limited" },
    { symbol: "MEPDL", name: "Mount Everest Power Development Limited" },
    { symbol: "SAPIL", name: "Sarvottam Paints Industries Limited" },
    { symbol: "BENH", name: "Beni Hydropower Project Limited" }
];

function showCustomAlert(title, message) {
    let modal = document.getElementById('customModal');
    if (modal) {
        let titleEl = document.getElementById('modalTitle');
        let msgEl = document.getElementById('modalMessage');
        if (titleEl) titleEl.innerText = title;
        if (msgEl) msgEl.innerText = message;
        modal.style.display = 'flex';
        modal.style.zIndex = '999999';
    } else {
        alert(`${title}: ${message}`);
    }
}

function closeCustomModal() {
    let modal = document.getElementById('customModal');
    if (modal) modal.style.display = 'none';
}

function preloadPortfolioCache() {
    let fySelect = document.getElementById('fiscalYearSelect');
    let selectedFY = fySelect ? fySelect.value : getRealTimeFiscalYear();
    let storageKey = 'nepse_portfolio_' + selectedFY;
    try {
        let savedData = localStorage.getItem(storageKey);
        cachedPortfolioData = savedData ? JSON.parse(savedData) : {};
    } catch (err) {
        cachedPortfolioData = {};
    }
}

function checkAndAutoFillPurchasePrice() {
    if (currentMode !== 'sell') return;
    let compInput = document.getElementById('companyName');
    if (!compInput) return;
    let symbol = extractCompanySymbol(compInput.value);
    let purchasedPriceInput = document.getElementById('purchasedPrice');
    if (!purchasedPriceInput) return;
    if (!symbol) { purchasedPriceInput.value = ''; return; }

    let targetPerShareCost = null;
    let evaluateRecord = (rec) => {
        let buyList = rec.buys && Array.isArray(rec.buys) ? rec.buys : (rec.buy ? [rec.buy] : []);
        if (buyList.length > 0) {
            let totalQty = 0, totalAmountPaid = 0;
            buyList.forEach(b => { totalQty += Number(b.qty || 0); totalAmountPaid += Number(b.totalAmount || 0); });
            return totalQty > 0 ? totalAmountPaid / totalQty : null;
        }
        return null;
    };
    if (cachedPortfolioData[symbol]) targetPerShareCost = evaluateRecord(cachedPortfolioData[symbol]);
    purchasedPriceInput.value = targetPerShareCost ? Number(targetPerShareCost).toFixed(2) : '';
}

function getCurrentBSDateDetails() {
    const refAD = new Date('2026-10-19T00:00:00Z');
    const today = new Date();
    const targetAD = new Date(today.toISOString().split('T')[0] + 'T00:00:00Z');
    let diffDays = Math.floor((targetAD - refAD) / (1000 * 60 * 60 * 24));
    let bsYear = 2083, bsMonth = 6, bsDay = 2;
    if (diffDays >= 0) bsDay += diffDays;
    return { year: bsYear, month: bsMonth + 1, day: bsDay };
}

function getRealTimeFiscalYear() {
    let bs = getCurrentBSDateDetails();
    let startYear = bs.month >= 4 ? bs.year : bs.year - 1;
    return `${startYear}_${String(startYear + 1).slice(-3)}`;
}

function populateFiscalYearOptions(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    let currentFY = getRealTimeFiscalYear();
    select.innerHTML = '';
    for (let yr = 2090; yr >= 2078; yr--) {
        let nxt = String(yr + 1).slice(-3);
        let valKey = `${yr}_${nxt}`;
        let opt = document.createElement('option');
        opt.value = valKey;
        opt.text = `FY ${yr}/${nxt}`;
        if (valKey === currentFY) opt.selected = true;
        select.appendChild(opt);
    }
}

function getBSDateForSelectedFY(selectedFY) {
    let bsReal = getCurrentBSDateDetails();
    let targetYear = selectedFY ? parseInt(selectedFY.split('_')[0]) : bsReal.year;
    return `${targetYear}-${String(bsReal.month).padStart(2, '0')}-${String(bsReal.day).padStart(2, '0')}`;
}

function extractCompanySymbol(inputVal) {
    if (!inputVal) return '';
    let match = inputVal.match(/\(([^)]+)\)/);
    return match && match[1] ? match[1].trim().toUpperCase() : inputVal.trim().toUpperCase();
}

function loadNepseCompanies() {
    const datalist = document.getElementById('nepseCompanies');
    if (!datalist) return;
    datalist.innerHTML = '';
    nepseCompanies.forEach(comp => {
        const option = document.createElement('option');
        option.value = `(${comp.symbol}) ${comp.name}`;
        datalist.appendChild(option);
    });
}

function clearErrorHighlights() {
    document.querySelectorAll('.input-error-highlight').forEach(i => i.classList.remove('input-error-highlight'));
}

function resetFormAndResults() {
    clearErrorHighlights();
    ['companyName', 'shareQty', 'sharePrice', 'purchasedPrice', 'txDate'].forEach(id => {
        let el = document.getElementById(id);
        if (el) el.value = '';
    });

    let saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.style.display = 'none';
    lastCalculatedData = null;

    ['resTotalShare', 'resSebon', 'resBroker', 'resDp', 'resTax', 'resTotalWithTax', 'resPerShare', 'resFinal', 'resProfit'].forEach(id => {
        let el = document.getElementById(id);
        if (el) el.innerText = "Rs 0.00";
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadNepseCompanies();
    populateFiscalYearOptions('fiscalYearSelect');
    preloadPortfolioCache();

    const calcInputs = ['sharePrice', 'shareQty', 'buyType', 'cgtRate', 'purchasedPrice'];
    calcInputs.forEach(id => {
        let el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateShare);
            el.addEventListener('change', calculateShare);
        }
    });

    let editTarget = sessionStorage.getItem('edit_nepse_target');
    if (editTarget) {
        try {
            let parsed = JSON.parse(editTarget);
            switchTab(parsed.type);
            if (parsed.fy) {
                let fySelectElem = document.getElementById('fiscalYearSelect');
                if (fySelectElem) {
                    fySelectElem.value = parsed.fy;
                    preloadPortfolioCache();
                }
            }
            let compObj = nepseCompanies.find(c => c.symbol.toUpperCase() === parsed.symbol.toUpperCase());
            document.getElementById('companyName').value = compObj ? `(${compObj.symbol}) ${compObj.name}` : `(${parsed.symbol})`;
            document.getElementById('shareQty').value = parsed.data.qty || '';
            document.getElementById('sharePrice').value = parsed.data.price || '';
            if (parsed.data.date) document.getElementById('txDate').value = parsed.data.date;

            if (parsed.type === 'sell') {
                if (document.getElementById('purchasedPrice')) document.getElementById('purchasedPrice').value = parsed.data.buyPrice || '';
                if (document.getElementById('cgtRate')) document.getElementById('cgtRate').value = parsed.data.cgtRate || '7.5';
                if (document.getElementById('buyType')) document.getElementById('buyType').value = parsed.data.buyType || 'secondary';
            }
            setTimeout(calculateShare, 300);
        } catch (e) { }
    }
});

function switchTab(mode) {
    currentMode = mode;
    const tabButtons = document.querySelectorAll('.tabs .tab-btn');
    const buyBtn = tabButtons.length > 0 ? tabButtons[0] : null;
    const sellBtn = tabButtons.length > 1 ? tabButtons[1] : null;

    const priceLabel = document.getElementById('price-label');
    const cgtRateWrapper = document.getElementById('cgtRateWrapper');
    const purchasedPriceGroup = document.getElementById('purchasedPriceGroup');
    const taxRow = document.getElementById('taxRow');
    const totalShareLabel = document.getElementById('totalShareLabel');
    const totalWithTaxLabel = document.getElementById('totalWithTaxLabel');
    const profitDisplay = document.getElementById('profitDisplay');
    const finalLabel = document.getElementById('finalLabel');
    const perShareLabel = document.getElementById('perShareLabel');

    resetFormAndResults();

    if (mode === 'buy') {
        if (buyBtn) buyBtn.classList.add('active');
        if (sellBtn) sellBtn.classList.remove('active');
        if (priceLabel) priceLabel.innerText = "Buying Price per Share (Rs):";

        if (cgtRateWrapper) cgtRateWrapper.style.display = 'none';
        if (purchasedPriceGroup) purchasedPriceGroup.style.display = 'none';
        if (taxRow) taxRow.style.display = 'none';
        if (totalShareLabel) totalShareLabel.innerText = "Total Purchase Amount:";
        if (totalWithTaxLabel) totalWithTaxLabel.innerText = "Total purchase amount (with tax):";
        if (profitDisplay) profitDisplay.style.display = 'none';
        if (finalLabel) finalLabel.innerText = "Total Paying Amount:";
        if (perShareLabel) perShareLabel.innerText = "Cost Per Share:";
    } else {
        if (sellBtn) sellBtn.classList.add('active');
        if (buyBtn) buyBtn.classList.remove('active');
        if (priceLabel) priceLabel.innerText = "Selling Price per Share (Rs):";

        if (cgtRateWrapper) cgtRateWrapper.style.display = 'flex';
        if (purchasedPriceGroup) purchasedPriceGroup.style.display = 'flex';
        if (taxRow) taxRow.style.display = 'flex';
        if (totalShareLabel) totalShareLabel.innerText = "Total Sell Amount:";
        if (totalWithTaxLabel) totalWithTaxLabel.innerText = "Total sell Amount:";
        if (profitDisplay) profitDisplay.style.display = 'flex';
        if (finalLabel) finalLabel.innerText = "Recv. Amount:";
        if (perShareLabel) perShareLabel.innerText = "Effe. Rcvd. Per Share:";

        checkAndAutoFillPurchasePrice();
    }
}

function calculateBrokerCommission(amount) {
    let commission = 0;
    if (amount <= 50000) {
        commission = amount * 0.0036;
    } else if (amount <= 500000) {
        commission = amount * 0.0033;
    } else if (amount <= 2000000) {
        commission = amount * 0.0030;
    } else if (amount <= 10000000) {
        commission = amount * 0.0027;
    } else {
        commission = amount * 0.0024;
    }
    return commission < 10 ? 10 : commission;
}

function calculateShare() {
    let price = parseFloat(document.getElementById('sharePrice') ? document.getElementById('sharePrice').value : 0) || 0;
    let qty = parseInt(document.getElementById('shareQty') ? document.getElementById('shareQty').value : 0) || 0;

    if (price <= 0 || qty <= 0) {
        return;
    }

    let fySelect = document.getElementById('fiscalYearSelect');
    let selectedFY = fySelect ? fySelect.value : getRealTimeFiscalYear();

    let customDateEl = document.getElementById('txDate');
    let customDate = customDateEl ? customDateEl.value.trim() : '';
    let transactionDate = customDate ? customDate : getBSDateForSelectedFY(selectedFY);

    let totalShareAmount = price * qty;
    let sebonCommission = 0;
    let brokerCommission = 0;
    let dpFee = 0;

    let buyTypeSelect = document.getElementById('buyType');
    let selectedBuyType = buyTypeSelect ? buyTypeSelect.value : 'secondary';

    if (currentMode === 'buy') {
        if (selectedBuyType === 'secondary') {
            sebonCommission = totalShareAmount * 0.00015;
            brokerCommission = calculateBrokerCommission(totalShareAmount);
            dpFee = 25;
        }

        let totalAmount = totalShareAmount + sebonCommission + brokerCommission + dpFee;
        let costPerShare = qty > 0 ? totalAmount / qty : 0;

        document.getElementById('resTotalShare').innerText = `Rs ${totalShareAmount.toFixed(2)}`;
        document.getElementById('resSebon').innerText = `Rs ${sebonCommission.toFixed(2)}`;
        document.getElementById('resBroker').innerText = `Rs ${brokerCommission.toFixed(2)}`;
        document.getElementById('resDp').innerText = `Rs ${dpFee.toFixed(2)}`;
        document.getElementById('resTotalWithTax').innerText = `Rs ${totalAmount.toFixed(2)}`;
        document.getElementById('resPerShare').innerText = `Rs ${costPerShare.toFixed(2)}`;
        document.getElementById('resFinal').innerText = `Rs ${totalAmount.toFixed(2)}`;

        lastCalculatedData = {
            date: transactionDate,
            qty: qty,
            price: price,
            buyType: selectedBuyType,
            totalShare: totalShareAmount,
            sebon: sebonCommission,
            broker: brokerCommission,
            dp: dpFee,
            costPerShare: costPerShare,
            totalAmount: totalAmount
        };

        let saveBtn = document.getElementById('saveBtn');
        if (saveBtn) saveBtn.style.display = 'block';

    } else {
        sebonCommission = totalShareAmount * 0.00015;
        brokerCommission = calculateBrokerCommission(totalShareAmount);
        dpFee = 25;

        let purchasedPriceInput = document.getElementById('purchasedPrice');
        let purchasedPrice = parseFloat(purchasedPriceInput ? purchasedPriceInput.value : 0) || 0;

        let cgtRateSelect = document.getElementById('cgtRate');
        let cgtRatePercent = cgtRateSelect ? parseFloat(cgtRateSelect.value) : 7.5;
        let cgtRate = cgtRatePercent / 100;

        let totalSellAmount = totalShareAmount - sebonCommission - brokerCommission - dpFee;

        let buyTotalShare = purchasedPrice * qty;
        let buySebon = (selectedBuyType === 'secondary') ? buyTotalShare * 0.00015 : 0;
        let buyBroker = (selectedBuyType === 'secondary') ? calculateBrokerCommission(buyTotalShare) : 0;
        let buyDp = (selectedBuyType === 'secondary') ? 25 : 0;
        let totalBuyCost = buyTotalShare + buySebon + buyBroker + buyDp;

        let netTaxableProfit = totalSellAmount - totalBuyCost;
        let cgt = netTaxableProfit > 0 ? netTaxableProfit * cgtRate : 0;

        let netRecvAmount = totalSellAmount - cgt;
        let finalNetProfit = netTaxableProfit - cgt;
        let effectivePerShare = qty > 0 ? netRecvAmount / qty : 0;

        document.getElementById('resTotalShare').innerText = `Rs ${totalShareAmount.toFixed(2)}`;
        document.getElementById('resSebon').innerText = `Rs ${sebonCommission.toFixed(2)}`;
        document.getElementById('resBroker').innerText = `Rs ${brokerCommission.toFixed(2)}`;
        document.getElementById('resDp').innerText = `Rs ${dpFee.toFixed(2)}`;
        document.getElementById('resTax').innerText = `Rs ${cgt.toFixed(2)}`;
        document.getElementById('resTotalWithTax').innerText = `Rs ${totalSellAmount.toFixed(2)}`;
        document.getElementById('resPerShare').innerText = `Rs ${effectivePerShare.toFixed(2)}`;
        document.getElementById('resFinal').innerText = `Rs ${netRecvAmount.toFixed(2)}`;

        let profitEl = document.getElementById('resProfit');
        if (profitEl) {
            profitEl.innerText = `Rs ${finalNetProfit.toFixed(2)}`;
            profitEl.style.color = finalNetProfit >= 0 ? '#00e676' : '#ff5252';
        }

        lastCalculatedData = {
            date: transactionDate,
            qty: qty,
            price: price,
            buyPrice: purchasedPrice,
            buyType: selectedBuyType,
            cgtRate: cgtRatePercent,
            totalShare: totalShareAmount,
            sebon: sebonCommission,
            broker: brokerCommission,
            dp: dpFee,
            effectivePerShare: effectivePerShare,
            totalAmount: netRecvAmount,
            netProfit: finalNetProfit
        };

        let saveBtn = document.getElementById('saveBtn');
        if (saveBtn) saveBtn.style.display = 'block';
    }
}

function saveTransactionToPortfolio() {
    clearErrorHighlights();

    let dateInput = document.getElementById('txDate');
    let compInput = document.getElementById('companyName');
    let hasError = false;
    let dateVal = dateInput ? dateInput.value.trim() : '';

    let datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateVal || !datePattern.test(dateVal)) {
        if (dateInput) dateInput.classList.add('input-error-highlight');
        hasError = true;
        showCustomAlert("Invalid Date", "Please enter a valid date in YYYY-MM-DD format (e.g., 2081-05-15).");
    }

    let rawCompanyInput = compInput ? compInput.value.trim() : '';
    let company = extractCompanySymbol(rawCompanyInput).toUpperCase();
    if (!company) {
        if (compInput) compInput.classList.add('input-error-highlight');
        hasError = true;
    }

    if (!lastCalculatedData) {
        calculateShare();
    }

    if (hasError || !lastCalculatedData) return;

    let dateParts = dateVal.split('-');
    let txYear = parseInt(dateParts[0]);
    let txMonth = parseInt(dateParts[1]);

    let startYear = txMonth >= 4 ? txYear : txYear - 1;
    let endYearShort = String(startYear + 1).slice(-3);
    let selectedFY = `${startYear}_${endYearShort}`;
    let storageKey = 'nepse_portfolio_' + selectedFY;

    lastCalculatedData.date = dateVal;

    try {
        let savedPortfolioStr = localStorage.getItem(storageKey);
        let portfolio = savedPortfolioStr ? JSON.parse(savedPortfolioStr) : {};

        if (!portfolio[company]) {
            portfolio[company] = { buys: [], sells: [] };
        }

        let editTarget = sessionStorage.getItem('edit_nepse_target');
        let isEditing = false;
        let editIndex = 0;

        if (editTarget) {
            try {
                let parsed = JSON.parse(editTarget);
                if (parsed.type === currentMode && parsed.symbol.toUpperCase() === company) {
                    isEditing = true;
                    editIndex = parsed.index !== undefined ? parsed.index : 0;
                }
            } catch (e) { }
        }

        if (currentMode === 'buy') {
            if (!portfolio[company].buys) portfolio[company].buys = [];
            if (isEditing) {
                portfolio[company].buys[editIndex] = lastCalculatedData;
                sessionStorage.removeItem('edit_nepse_target');
            } else {
                portfolio[company].buys.push(lastCalculatedData);
            }
            portfolio[company].buys.sort((a, b) => new Date(a.date || '2000-01-01') - new Date(b.date || '2000-01-01'));
        } else {
            if (!portfolio[company].sells) portfolio[company].sells = [];
            if (isEditing) {
                portfolio[company].sells[editIndex] = lastCalculatedData;
                sessionStorage.removeItem('edit_nepse_target');
            } else {
                portfolio[company].sells.push(lastCalculatedData);
            }
            portfolio[company].sells.sort((a, b) => new Date(a.date || '2000-01-01') - new Date(b.date || '2000-01-01'));
        }

        localStorage.setItem(storageKey, JSON.stringify(portfolio));
        window.location.href = 'portfolio.html';
    } catch (err) {
        console.error("Local storage save error:", err);
        alert("Error saving transaction to local storage.");
    }
}

// Column sorting logic (Without Watchlist/Stars)
function sortTable(column) {
    if (currentSortColumn === column) {
        isSortAscending = !isSortAscending;
    } else {
        currentSortColumn = column;
        isSortAscending = true;
    }

    liveMarketItems.sort((a, b) => {
        let valA, valB;
        if (column === 'symbol') {
            valA = a.symbol || ''; valB = b.symbol || '';
            return isSortAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (column === 'ltp') {
            valA = parseFloat(a.lastTradedPrice || a.ltp || 0); valB = parseFloat(b.lastTradedPrice || b.ltp || 0);
        } else if (column === 'diff') {
            valA = parseFloat(a.pointChange || a.change || 0); valB = parseFloat(b.pointChange || b.change || 0);
        } else if (column === 'percent') {
            valA = parseFloat(a.percentageChange || a.percentChange || 0); valB = parseFloat(b.percentageChange || b.percentChange || 0);
        } else if (column === 'qty') {
            valA = parseFloat(a.totalTradeQuantity || a.quantity || 0); valB = parseFloat(b.totalTradeQuantity || b.quantity || 0);
        } else if (column === 'txn') {
            valA = parseFloat(a.totalTrades || a.trades || 0); valB = parseFloat(b.totalTrades || b.trades || 0);
        }
        return isSortAscending ? valA - valB : valB - valA;
    });
    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById('live-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    let filter = document.getElementById('tableSearchInput') ? document.getElementById('tableSearchInput').value.toUpperCase() : '';
    let totalTurnover = 0, totalVolume = 0, totalTxns = 0;

    liveMarketItems.forEach(stock => {
        let symbol = stock.symbol || stock.securitySymbol || 'N/A';
        let ltp = parseFloat(stock.lastTradedPrice || stock.ltp || stock.close || 0);
        let diff = parseFloat(stock.pointChange || stock.change || stock.difference || 0);
        let percent = parseFloat(stock.percentageChange || stock.percentChange || 0);
        let maxPrice = parseFloat(stock.highPrice || stock.maxPrice || ltp);
        let minPrice = parseFloat(stock.lowPrice || stock.minPrice || ltp);
        let openPrice = parseFloat(stock.openPrice || stock.open || ltp);
        let qty = parseFloat(stock.totalTradeQuantity || stock.quantity || 0);
        let txn = parseFloat(stock.totalTrades || stock.trades || 0);

        totalVolume += qty; totalTxns += txn; totalTurnover += (ltp * qty);

        if (filter && !symbol.includes(filter)) return;

        let isPositive = diff >= 0;
        let color = isPositive ? '#00e676' : '#ff5252';
        let sign = isPositive ? '+' : '';

        let row = document.createElement('tr');
        row.style.borderBottom = "1px solid rgba(31, 77, 77, 0.4)";
        row.style.transition = "background 0.15s ease";
        row.onmouseover = () => row.style.background = "#112525";
        row.onmouseout = () => row.style.background = "transparent";

        row.innerHTML = `
            <td style="padding: 10px 15px; font-weight: 700; color: #ffffff;">${symbol}</td>
            <td style="padding: 10px 15px; text-align: right; font-weight: 700; color: #f0fdf4;">${ltp.toFixed(2)}</td>
            <td style="padding: 10px 15px; text-align: right; font-weight: 600; color: ${color};">${sign}${diff.toFixed(2)}</td>
            <td style="padding: 10px 15px; text-align: right; font-weight: 600; color: ${color};">${sign}${percent.toFixed(2)}% ${isPositive ? '▲' : '▼'}</td>
            <td style="padding: 10px 15px; text-align: right; color: #b2dfdb;">${maxPrice.toFixed(2)}</td>
            <td style="padding: 10px 15px; text-align: right; color: #b2dfdb;">${minPrice.toFixed(2)}</td>
            <td style="padding: 10px 15px; text-align: right; color: #b2dfdb;">${openPrice.toFixed(2)}</td>
            <td style="padding: 10px 15px; text-align: right; color: #b2dfdb;">${qty.toLocaleString()}</td>
            <td style="padding: 10px 15px; text-align: right; color: #b2dfdb;">${txn.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('kpiTurnover').innerText = `Rs ${totalTurnover.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    document.getElementById('kpiVolume').innerText = totalVolume.toLocaleString();
    document.getElementById('kpiTxn').innerText = totalTxns.toLocaleString();
}

async function loadLiveMarketTicker() {
    const statusText = document.getElementById('market-status-text');
    try {
        let response = await fetch('https://raw.githubusercontent.com/Shubhamnpk/yonepse/main/data/nepse_data.json');
        if (!response.ok) throw new Error("Failed to fetch live feed");
        let data = await response.json();
        if (statusText) statusText.innerText = "🟢 Live Connected";
        liveMarketItems = Array.isArray(data) ? data : (data.rows || Object.values(data));

        let avgChange = liveMarketItems.reduce((acc, curr) => acc + parseFloat(curr.percentageChange || curr.percentChange || 0), 0) / (liveMarketItems.length || 1);
        let indexVal = 2750.45 + (avgChange * 10);
        let indexCol = avgChange >= 0 ? '#00e676' : '#ff5252';

        document.getElementById('nepseIndexVal').innerText = indexVal.toFixed(2);
        document.getElementById('nepseIndexChange').innerText = `${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`;
        document.getElementById('nepseIndexChange').style.color = indexCol;

        document.getElementById('sensIndexVal').innerText = (indexVal * 0.35).toFixed(2);
        document.getElementById('sensIndexChange').innerText = `${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`;
        document.getElementById('sensIndexChange').style.color = indexCol;

        renderTable();
    } catch (error) {
        if (statusText) statusText.innerText = "⚠️ Offline / Cached";
    }
}

function filterMarketTable() {
    renderTable();
}