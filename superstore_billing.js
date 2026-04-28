
// ============================
// STATE
// ============================
let state = {
  products: [],
  categories: [],
  bills: [],
  settings: {
    storeName: 'My Superstore',
    address: '123, Main Street',
    city: 'Coimbatore, Tamil Nadu',
    phone: '',
    gstin: '',
    fssai: '',
    footer: 'Thank you for shopping! வாருங்கள் மீண்டும் வாருங்கள்!'
  },
  billCounter: 1
};
let currentBill = [];
let editingProductId = null;
let selectedPayMethod = 'Cash';
let selectedBillLanguage = 'en';
let selectedBillSize = 'normal';
let activeCategory = 'All';
const PRODUCT_NAME_TA = {
  'Tata Salt 1kg': 'டாடா உப்பு 1 கிலோ',
  'India Gate Basmati Rice 5kg': 'இந்தியா கேட் பாஸ்மதி அரிசி 5 கிலோ',
  'Toor Dal 1kg': 'துவரம் பருப்பு 1 கிலோ',
  'Moong Dal 1kg': 'பாசிப்பருப்பு 1 கிலோ',
  'Chana Dal 1kg': 'கடலை பருப்பு 1 கிலோ',
  'Maida 1kg': 'மைதா 1 கிலோ',
  'Atta 5kg': 'ஆட்டா 5 கிலோ',
  'Idli Rice 1kg': 'இட்லி அரிசி 1 கிலோ',
  'Rajma 500g': 'ராஜ்மா 500 கிராம்',
  'Sooji / Rava 500g': 'சூஜி / ரவை 500 கிராம்',
  'Aavin Full Cream Milk 1L': 'ஆவின் பால் 1 லிட்டர்',
  'Amul Butter 500g': 'அமுல் வெண்ணெய் 500 கிராம்',
  'Amul Paneer 200g': 'அமுல் பனீர் 200 கிராம்',
  'Curd 500ml': 'தயிர் 500 மில்லி',
  'Eggs (12 nos)': 'முட்டை (12)',
  'Cheese Slice 200g': 'சீஸ் ஸ்லைஸ் 200 கிராம்',
  'Ghee 1L': 'நெய் 1 லிட்டர்',
  'Sunflower Oil 1L': 'சூரியகாந்தி எண்ணெய் 1 லிட்டர்',
  'Coconut Oil 1L': 'தேங்காய் எண்ணெய் 1 லிட்டர்',
  'Groundnut Oil 1L': 'வேர்க்கடலை எண்ணெய் 1 லிட்டர்',
  'Sesame Oil 500mL': 'எள்ளெண்ணெய் 500 மில்லி',
  'Vanaspati 1kg': 'வனஸ்பதி 1 கிலோ',
  'Chilli Powder 500g': 'மிளகாய் தூள் 500 கிராம்',
  'Turmeric Powder 200g': 'மஞ்சள் தூள் 200 கிராம்',
  'Coriander Powder 200g': 'கொத்தமல்லி தூள் 200 கிராம்',
  'Sambar Powder 200g': 'சாம்பார் தூள் 200 கிராம்',
  'Garam Masala 100g': 'கரம் மசாலா 100 கிராம்',
  'Mustard Seeds 200g': 'கடுகு 200 கிராம்',
  'Cumin Seeds 100g': 'சீரகம் 100 கிராம்',
  'Pepper 100g': 'மிளகு 100 கிராம்',
  'Britannia Marie Biscuit 200g': 'பிரிட்டானியா மரி பிஸ்கட் 200 கிராம்',
  'Sunfeast Dark Fantasy 300g': 'சன்‌ஃபீஸ்ட் டார்க் ஃபான்டசி 300 கிராம்',
  "Lay's Chips 26g": 'லேய்ஸ் சிப்ஸ் 26 கிராம்',
  'Kurkure 50g': 'குர்குரே 50 கிராம்',
  'Parle-G 100g': 'பார்லே-ஜி 100 கிராம்',
  'Murukku 200g': 'முறுக்கு 200 கிராம்',
  'Peanut Chikki 200g': 'வேர்க்கடலை சிக்கி 200 கிராம்',
  'Coca-Cola 600mL': 'கோகா-கோலா 600 மில்லி',
  'Pepsi 600mL': 'பெப்ஸி 600 மில்லி',
  'Mango Frooti 200mL': 'மேங்கோ ஃப்ரூட்டி 200 மில்லி',
  'Bru Coffee 200g': 'ப்ரூ காபி 200 கிராம்',
  'Tata Tea Gold 500g': 'டாடா டீ கோல்ட் 500 கிராம்',
  'Boost 500g': 'பூஸ்ட் 500 கிராம்',
  'Mineral Water 1L': 'மினரல் வாட்டர் 1 லிட்டர்',
  'Tender Coconut Water 250mL': 'இளநீர் 250 மில்லி',
  'Colgate Toothpaste 200g': 'கோல்கேட் பற்பசை 200 கிராம்',
  'Lux Soap 125g': 'லக்ஸ் சோப்பு 125 கிராம்',
  'Dove Shampoo 340mL': 'டவ் ஷாம்பு 340 மில்லி',
  'Dettol Handwash 200mL': 'டெட்டால் கைசோப்பு 200 மில்லி',
  'Clinic Plus Shampoo 175mL': 'க்ளினிக் ப்ளஸ் ஷாம்பு 175 மில்லி',
  'Vicks VapoRub 50g': 'விக்ஸ் வேப்போ ரப் 50 கிராம்',
  'Parachute Coconut Oil 500mL': 'பாராசூட் தேங்காய் எண்ணெய் 500 மில்லி',
  'Surf Excel 1kg': 'சர்ஃப் எக்செல் 1 கிலோ',
  'Vim Dishwash Bar 200g': 'விம் பாத்திரம் கழுவும் சோப்பு 200 கிராம்',
  'Harpic Toilet Cleaner 1L': 'ஹார்பிக் டாய்லெட் கிளீனர் 1 லிட்டர்',
  'Domex Floor Cleaner 1L': 'டோமேக்ஸ் தரை சுத்திகரிப்பு திரவம் 1 லிட்டர்',
  'Lizol 1L': 'லிசால் 1 லிட்டர்',
  'Phenyl 1L': 'பெனியல் 1 லிட்டர்',
  'Maggi Noodles 70g': 'மேக்கி நூடுல்ஸ் 70 கிராம்',
  'MTR Ready-to-eat Sambar': 'எம்டிஆர் ரெடி-டூ-ஈட் சாம்பார்',
  "Haldiram's Bhujia 400g": 'ஹால்டிராம்ஸ் புஜியா 400 கிராம்',
  'Amul Chocolate 40g': 'அமுல் சாக்லேட் 40 கிராம்',
  'Kissan Jam 500g': 'கிஸ்ஸான் ஜாம் 500 கிராம்',
  'Aashirvaad Pasta 400g': 'ஆஷிர்வாத் பாஸ்தா 400 கிராம்',
  'Tamarind 500g': 'புளி 500 கிராம்',
  'Vermicelli 200g': 'சேமியா 200 கிராம்',
  'Tomato 1kg': 'தக்காளி 1 கிலோ',
  'Onion 1kg': 'வெங்காயம் 1 கிலோ',
  'Potato 1kg': 'உருளைக்கிழங்கு 1 கிலோ',
  'Carrot 500g': 'கேரட் 500 கிராம்',
  'Beans 500g': 'பீன்ஸ் 500 கிராம்',
  'Brinjal 500g': 'கத்திரிக்காய் 500 கிராம்',
  'Ladies Finger 500g': 'வெண்டைக்காய் 500 கிராம்',
  'Drumstick 250g': 'முருங்கைக்காய் 250 கிராம்',
  'Banana Dozen': 'வாழைப்பழம் (டஜன்)',
  'Apple 1kg': 'ஆப்பிள் 1 கிலோ',
  'Mango 1kg': 'மாம்பழம் 1 கிலோ',
  'Papaya 1kg': 'பப்பாளி 1 கிலோ',
  'A4 Paper 500 Sheets': 'A4 காகிதம் 500 தாள்கள்',
  'Natraj Pencil (12)': 'நடராஜ் பென்சில் (12)',
  'Ballpoint Pen Blue': 'பால் பாயிண்ட் பேனா நீலம்',
  'Notebook 200 Pages': 'நோட்புக் 200 பக்கங்கள்',
  'Classic Cigarette 10s': 'கிளாசிக் சிகரெட் 10',
  'Vimal Gutka': 'விமல் குட்கா',
  'McCain Fries 450g': 'மக்கெய்ன் ஃப்ரைஸ் 450 கிராம்',
  'Vadilal Ice Cream 500mL': 'வடிலால் ஐஸ் கிரீம் 500 மில்லி'
};

function getLocalizedProductName(name, lang) {
  if (lang === 'ta') return PRODUCT_NAME_TA[name] || name;
  return name;
}

// ============================
// INIT
// ============================
function init() {
  loadState();
  loadSampleProducts();
  generateBillNo();
  updateDateTime();
  setInterval(updateDateTime, 1000);
  renderCatPills();
  renderProductGrid();
  renderProductsTable();
  renderHistory();
  updateDashboard();
  renderSettings();
  renderCatList();
  updateNavStore();
}

function loadState() {
  try {
    const saved = localStorage.getItem('superstore_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    }
  } catch(e) {}
}

function saveState() {
  localStorage.setItem('superstore_state', JSON.stringify(state));
}

function loadSampleProducts() {
  if (state.products.length > 0) return;
  state.categories = ['Grains & Pulses','Dairy & Eggs','Oils & Fats','Spices & Masala','Snacks & Bakery','Beverages','Personal Care','Cleaning','Vegetables','Fruits','Frozen & Ready','Stationery','Tobacco','Packaged Foods'];
  const prods = [
    // Grains & Pulses
    {name:'Tata Salt 1kg',cat:'Grains & Pulses',mrp:25,price:22,unit:'Kg',stock:100,hsn:'2501',barcode:'8901234567890',desc:'Iodized salt'},
    {name:'India Gate Basmati Rice 5kg',cat:'Grains & Pulses',mrp:450,price:420,unit:'Kg',stock:40,hsn:'1006',barcode:'8902134567891'},
    {name:'Toor Dal 1kg',cat:'Grains & Pulses',mrp:140,price:130,unit:'Kg',stock:60,hsn:'0713'},
    {name:'Moong Dal 1kg',cat:'Grains & Pulses',mrp:135,price:125,unit:'Kg',stock:50,hsn:'0713'},
    {name:'Chana Dal 1kg',cat:'Grains & Pulses',mrp:110,price:100,unit:'Kg',stock:55,hsn:'0713'},
    {name:'Maida 1kg',cat:'Grains & Pulses',mrp:38,price:35,unit:'Kg',stock:80,hsn:'1101'},
    {name:'Atta 5kg',cat:'Grains & Pulses',mrp:210,price:195,unit:'Kg',stock:30,hsn:'1101'},
    {name:'Idli Rice 1kg',cat:'Grains & Pulses',mrp:55,price:50,unit:'Kg',stock:70,hsn:'1006'},
    {name:'Rajma 500g',cat:'Grains & Pulses',mrp:80,price:72,unit:'g',stock:40,hsn:'0713'},
    {name:'Sooji / Rava 500g',cat:'Grains & Pulses',mrp:30,price:28,unit:'g',stock:60,hsn:'1103'},
    // Dairy & Eggs
    {name:'Aavin Full Cream Milk 1L',cat:'Dairy & Eggs',mrp:68,price:68,unit:'L',stock:50,hsn:'0401'},
    {name:'Amul Butter 500g',cat:'Dairy & Eggs',mrp:260,price:255,unit:'g',stock:20,hsn:'0405'},
    {name:'Amul Paneer 200g',cat:'Dairy & Eggs',mrp:80,price:78,unit:'g',stock:25,hsn:'0406'},
    {name:'Curd 500ml',cat:'Dairy & Eggs',mrp:35,price:33,unit:'mL',stock:30,hsn:'0403'},
    {name:'Eggs (12 nos)',cat:'Dairy & Eggs',mrp:90,price:84,unit:'Dozen',stock:50,hsn:'0407'},
    {name:'Cheese Slice 200g',cat:'Dairy & Eggs',mrp:120,price:115,unit:'g',stock:15,hsn:'0406'},
    {name:'Ghee 1L',cat:'Dairy & Eggs',mrp:650,price:620,unit:'L',stock:20,hsn:'0405'},
    // Oils & Fats
    {name:'Sunflower Oil 1L',cat:'Oils & Fats',mrp:145,price:138,unit:'L',stock:40,hsn:'1512'},
    {name:'Coconut Oil 1L',cat:'Oils & Fats',mrp:195,price:185,unit:'L',stock:30,hsn:'1513'},
    {name:'Groundnut Oil 1L',cat:'Oils & Fats',mrp:200,price:190,unit:'L',stock:25,hsn:'1508'},
    {name:'Sesame Oil 500mL',cat:'Oils & Fats',mrp:180,price:175,unit:'mL',stock:20,hsn:'1515'},
    {name:'Vanaspati 1kg',cat:'Oils & Fats',mrp:120,price:112,unit:'Kg',stock:15,hsn:'1516'},
    // Spices & Masala
    {name:'Chilli Powder 500g',cat:'Spices & Masala',mrp:100,price:90,unit:'g',stock:60,hsn:'0904'},
    {name:'Turmeric Powder 200g',cat:'Spices & Masala',mrp:50,price:45,unit:'g',stock:70,hsn:'0910'},
    {name:'Coriander Powder 200g',cat:'Spices & Masala',mrp:45,price:40,unit:'g',stock:65,hsn:'0909'},
    {name:'Sambar Powder 200g',cat:'Spices & Masala',mrp:65,price:58,unit:'g',stock:50,hsn:'2103'},
    {name:'Garam Masala 100g',cat:'Spices & Masala',mrp:75,price:68,unit:'g',stock:40,hsn:'0910'},
    {name:'Mustard Seeds 200g',cat:'Spices & Masala',mrp:30,price:28,unit:'g',stock:80,hsn:'1205'},
    {name:'Cumin Seeds 100g',cat:'Spices & Masala',mrp:40,price:37,unit:'g',stock:70,hsn:'0909'},
    {name:'Pepper 100g',cat:'Spices & Masala',mrp:55,price:50,unit:'g',stock:60,hsn:'0904'},
    // Snacks & Bakery
    {name:'Britannia Marie Biscuit 200g',cat:'Snacks & Bakery',mrp:30,price:28,unit:'Pack',stock:80,hsn:'1905'},
    {name:'Sunfeast Dark Fantasy 300g',cat:'Snacks & Bakery',mrp:90,price:85,unit:'Pack',stock:40,hsn:'1905'},
    {name:'Lay\'s Chips 26g',cat:'Snacks & Bakery',mrp:20,price:20,unit:'Pack',stock:100,hsn:'2005'},
    {name:'Kurkure 50g',cat:'Snacks & Bakery',mrp:20,price:20,unit:'Pack',stock:80,hsn:'2005'},
    {name:'Parle-G 100g',cat:'Snacks & Bakery',mrp:10,price:10,unit:'Pack',stock:150,hsn:'1905'},
    {name:'Murukku 200g',cat:'Snacks & Bakery',mrp:60,price:55,unit:'Pack',stock:30,hsn:'1905'},
    {name:'Peanut Chikki 200g',cat:'Snacks & Bakery',mrp:40,price:36,unit:'Pack',stock:35,hsn:'1704'},
    // Beverages
    {name:'Coca-Cola 600mL',cat:'Beverages',mrp:40,price:40,unit:'Bottle',stock:60,hsn:'2202'},
    {name:'Pepsi 600mL',cat:'Beverages',mrp:40,price:40,unit:'Bottle',stock:60,hsn:'2202'},
    {name:'Mango Frooti 200mL',cat:'Beverages',mrp:20,price:20,unit:'mL',stock:80,hsn:'2009'},
    {name:'Bru Coffee 200g',cat:'Beverages',mrp:180,price:168,unit:'g',stock:30,hsn:'2101'},
    {name:'Tata Tea Gold 500g',cat:'Beverages',mrp:290,price:270,unit:'g',stock:25,hsn:'0902'},
    {name:'Boost 500g',cat:'Beverages',mrp:310,price:290,unit:'g',stock:20,hsn:'1901'},
    {name:'Mineral Water 1L',cat:'Beverages',mrp:20,price:18,unit:'Bottle',stock:100,hsn:'2201'},
    {name:'Tender Coconut Water 250mL',cat:'Beverages',mrp:30,price:28,unit:'mL',stock:50,hsn:'2009'},
    // Personal Care
    {name:'Colgate Toothpaste 200g',cat:'Personal Care',mrp:120,price:110,unit:'g',stock:50,hsn:'3306'},
    {name:'Lux Soap 125g',cat:'Personal Care',mrp:50,price:46,unit:'g',stock:80,hsn:'3401'},
    {name:'Dove Shampoo 340mL',cat:'Personal Care',mrp:280,price:265,unit:'mL',stock:25,hsn:'3305'},
    {name:'Dettol Handwash 200mL',cat:'Personal Care',mrp:100,price:92,unit:'mL',stock:40,hsn:'3401'},
    {name:'Clinic Plus Shampoo 175mL',cat:'Personal Care',mrp:130,price:122,unit:'mL',stock:30,hsn:'3305'},
    {name:'Vicks VapoRub 50g',cat:'Personal Care',mrp:90,price:84,unit:'g',stock:20,hsn:'3004'},
    {name:'Parachute Coconut Oil 500mL',cat:'Personal Care',mrp:180,price:170,unit:'mL',stock:30,hsn:'3305'},
    // Cleaning
    {name:'Surf Excel 1kg',cat:'Cleaning',mrp:200,price:188,unit:'Kg',stock:40,hsn:'3402'},
    {name:'Vim Dishwash Bar 200g',cat:'Cleaning',mrp:30,price:28,unit:'g',stock:60,hsn:'3405'},
    {name:'Harpic Toilet Cleaner 1L',cat:'Cleaning',mrp:120,price:110,unit:'L',stock:25,hsn:'3402'},
    {name:'Domex Floor Cleaner 1L',cat:'Cleaning',mrp:110,price:100,unit:'L',stock:20,hsn:'3402'},
    {name:'Lizol 1L',cat:'Cleaning',mrp:145,price:135,unit:'L',stock:20,hsn:'3808'},
    {name:'Phenyl 1L',cat:'Cleaning',mrp:60,price:55,unit:'L',stock:30,hsn:'3808'},
    // Packaged Foods
    {name:'Maggi Noodles 70g',cat:'Packaged Foods',mrp:14,price:14,unit:'Pack',stock:200,hsn:'1902'},
    {name:'MTR Ready-to-eat Sambar',cat:'Packaged Foods',mrp:75,price:70,unit:'Pack',stock:30,hsn:'2106'},
    {name:'Haldiram\'s Bhujia 400g',cat:'Packaged Foods',mrp:180,price:168,unit:'Pack',stock:25,hsn:'2005'},
    {name:'Amul Chocolate 40g',cat:'Packaged Foods',mrp:30,price:28,unit:'Pack',stock:80,hsn:'1806'},
    {name:'Kissan Jam 500g',cat:'Packaged Foods',mrp:145,price:138,unit:'g',stock:20,hsn:'2007'},
    {name:'Aashirvaad Pasta 400g',cat:'Packaged Foods',mrp:60,price:55,unit:'Pack',stock:30,hsn:'1902'},
    {name:'Tamarind 500g',cat:'Packaged Foods',mrp:40,price:36,unit:'g',stock:50,hsn:'2001'},
    {name:'Vermicelli 200g',cat:'Packaged Foods',mrp:25,price:22,unit:'Pack',stock:60,hsn:'1902'},
    // Vegetables
    {name:'Tomato 1kg',cat:'Vegetables',mrp:50,price:45,unit:'Kg',stock:30,hsn:'0702'},
    {name:'Onion 1kg',cat:'Vegetables',mrp:40,price:35,unit:'Kg',stock:50,hsn:'0703'},
    {name:'Potato 1kg',cat:'Vegetables',mrp:35,price:30,unit:'Kg',stock:60,hsn:'0701'},
    {name:'Carrot 500g',cat:'Vegetables',mrp:30,price:26,unit:'g',stock:25,hsn:'0706'},
    {name:'Beans 500g',cat:'Vegetables',mrp:35,price:30,unit:'g',stock:20,hsn:'0708'},
    {name:'Brinjal 500g',cat:'Vegetables',mrp:25,price:22,unit:'g',stock:20,hsn:'0709'},
    {name:'Ladies Finger 500g',cat:'Vegetables',mrp:30,price:27,unit:'g',stock:15,hsn:'0709'},
    {name:'Drumstick 250g',cat:'Vegetables',mrp:20,price:18,unit:'g',stock:15,hsn:'0709'},
    // Fruits
    {name:'Banana Dozen',cat:'Fruits',mrp:60,price:55,unit:'Dozen',stock:20,hsn:'0803'},
    {name:'Apple 1kg',cat:'Fruits',mrp:180,price:165,unit:'Kg',stock:15,hsn:'0808'},
    {name:'Mango 1kg',cat:'Fruits',mrp:120,price:110,unit:'Kg',stock:20,hsn:'0804'},
    {name:'Papaya 1kg',cat:'Fruits',mrp:50,price:45,unit:'Kg',stock:15,hsn:'0807'},
    // Stationery
    {name:'A4 Paper 500 Sheets',cat:'Stationery',mrp:350,price:320,unit:'Pack',stock:10,hsn:'4802'},
    {name:'Natraj Pencil (12)',cat:'Stationery',mrp:50,price:45,unit:'Pack',stock:30,hsn:'9609'},
    {name:'Ballpoint Pen Blue',cat:'Stationery',mrp:10,price:8,unit:'Nos',stock:100,hsn:'9608'},
    {name:'Notebook 200 Pages',cat:'Stationery',mrp:80,price:72,unit:'Nos',stock:40,hsn:'4820'},
    // Tobacco
    {name:'Classic Cigarette 10s',cat:'Tobacco',mrp:120,price:120,unit:'Pack',stock:50,hsn:'2402'},
    {name:'Vimal Gutka',cat:'Tobacco',mrp:3,price:3,unit:'Sachet',stock:200,hsn:'2403'},
    // Frozen
    {name:'McCain Fries 450g',cat:'Frozen & Ready',mrp:220,price:210,unit:'Pack',stock:10,hsn:'2004'},
    {name:'Vadilal Ice Cream 500mL',cat:'Frozen & Ready',mrp:160,price:150,unit:'mL',stock:12,hsn:'2105'},
  ];
  prods.forEach((p,i) => {
    state.products.push({
      id: Date.now() + i,
      name: p.name, cat: p.cat, mrp: p.mrp, price: p.price,
      unit: p.unit, stock: p.stock || 99,
      hsn: p.hsn || '', barcode: p.barcode || '', desc: p.desc || ''
    });
  });
  saveState();
}

// ============================
// NAVIGATION
// ============================
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const tabs = ['billing','products','history','dashboard','settings'];
  document.querySelectorAll('.nav-tab')[tabs.indexOf(page)].classList.add('active');
  if (page === 'products') { updateProductStats(); renderProductsTable(); }
  if (page === 'history') renderHistory();
  if (page === 'dashboard') updateDashboard();
  if (page === 'settings') renderSettings();
}

// ============================
// BILL NO & DATETIME
// ============================
function generateBillNo() {
  const d = new Date();
  const no = 'INV-' + d.getFullYear() + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0') + '-' + String(state.billCounter).padStart(4,'0');
  document.getElementById('bill-no').value = no;
  return no;
}
function updateDateTime() {
  const now = new Date();
  document.getElementById('bill-datetime').value = now.toLocaleString('en-IN');
}

// ============================
// PRODUCT GRID (BILLING)
// ============================
function renderCatPills() {
  const el = document.getElementById('cat-pills');
  const cats = ['All', ...state.categories];
  el.innerHTML = cats.map(c => `<div class="cat-pill ${c === activeCategory ? 'active' : ''}" onclick="setCat('${c}')">${c}</div>`).join('');
}
function setCat(cat) {
  activeCategory = cat;
  renderCatPills();
  renderProductGrid();
}
function filterProducts() {
  renderProductGrid();
}
function renderProductGrid() {
  const q = document.getElementById('product-search').value.toLowerCase();
  let prods = state.products;
  if (activeCategory !== 'All') prods = prods.filter(p => p.cat === activeCategory);
  if (q) prods = prods.filter(p => p.name.toLowerCase().includes(q) || (p.barcode||'').includes(q));
  const el = document.getElementById('product-grid');
  if (!prods.length) { el.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><p>No products found</p></div>'; return; }
  el.innerHTML = prods.map(p => `
    <div class="product-card ${p.stock <= 5 ? 'low-stock' : ''}" onclick="addToBill(${p.id})">
      <div class="cat">${p.cat}</div>
      <div class="name">${p.name}</div>
      <div class="price">₹${p.price.toFixed(2)}</div>
      <div class="unit">${p.unit} ${p.stock <= 5 ? '⚠️ Low' : ''}</div>
    </div>
  `).join('');
}

// ============================
// BILLING LOGIC
// ============================
function addToBill(id) {
  const prod = state.products.find(p => p.id === id);
  if (!prod) return;
  const existing = currentBill.find(b => b.id === id);
  if (existing) {
    existing.qty++;
  } else {
    currentBill.push({ id, name: prod.name, price: prod.price, qty: 1, unit: prod.unit, hsn: prod.hsn, mrp: prod.mrp });
  }
  renderBillItems();
  updateSummary();
}

function renderBillItems() {
  const el = document.getElementById('bill-items-list');
  if (!currentBill.length) {
    el.innerHTML = '<div class="empty-state"><div class="icon">🛒</div><p>Click products above to add them</p></div>';
    return;
  }
  el.innerHTML = currentBill.map((item, i) => `
    <div class="bill-item">
      <div style="flex:1;">
        <div class="bill-item-name">${item.name}</div>
        <div class="bill-item-unit">₹${item.price.toFixed(2)} / ${item.unit}</div>
      </div>
      <div class="qty-ctrl">
        <button onclick="changeQty(${i},-1)">−</button>
        <input type="number" value="${item.qty}" min="0" onchange="setQty(${i},this.value)" style="width:50px;text-align:center;">
        <button onclick="changeQty(${i},1)">+</button>
      </div>
      <div class="bill-item-price">₹${(item.price * item.qty).toFixed(2)}</div>
      <button class="btn btn-icon" style="background:rgba(239,68,68,0.1);color:var(--red);border:none;cursor:pointer;font-size:14px;" onclick="removeItem(${i})">✕</button>
    </div>
  `).join('');
}

function changeQty(i, d) {
  currentBill[i].qty = Math.max(0, currentBill[i].qty + d);
  if (currentBill[i].qty === 0) currentBill.splice(i, 1);
  renderBillItems();
  updateSummary();
}
function setQty(i, v) {
  const q = parseFloat(v);
  if (isNaN(q) || q <= 0) { currentBill.splice(i, 1); }
  else currentBill[i].qty = q;
  renderBillItems();
  updateSummary();
}
function removeItem(i) {
  currentBill.splice(i, 1);
  renderBillItems();
  updateSummary();
}
function clearBill() {
  if (currentBill.length && !confirm('Clear all items from the bill?')) return;
  currentBill = [];
  renderBillItems();
  updateSummary();
  document.getElementById('cust-name').value = '';
  document.getElementById('cust-mobile').value = '';
  document.getElementById('bill-discount').value = 0;
  document.getElementById('bill-notes').value = '';
  generateBillNo();
}

function getSubtotal() { return currentBill.reduce((s, i) => s + i.price * i.qty, 0); }
function updateSummary() {
  const sub = getSubtotal();
  const discPct = parseFloat(document.getElementById('bill-discount').value) || 0;
  const gstPct = parseFloat(document.getElementById('bill-gst').value) || 0;
  const disc = sub * discPct / 100;
  const taxable = sub - disc;
  const gst = taxable * gstPct / 100;
  const total = taxable + gst;
  document.getElementById('sum-subtotal').textContent = '₹' + sub.toFixed(2);
  document.getElementById('sum-discount').textContent = '-₹' + disc.toFixed(2);
  document.getElementById('sum-gst').textContent = '₹' + gst.toFixed(2);
  document.getElementById('sum-total').textContent = '₹' + total.toFixed(2);
  document.getElementById('disc-pct').textContent = discPct;
  document.getElementById('gst-pct').textContent = gstPct;
}

// ============================
// PAYMENT MODAL
// ============================
function openPayModal() {
  if (!currentBill.length) { showToast('Add items to the bill first!', 'red'); return; }
  const sub = getSubtotal();
  const discPct = parseFloat(document.getElementById('bill-discount').value) || 0;
  const gstPct = parseFloat(document.getElementById('bill-gst').value) || 0;
  const disc = sub * discPct / 100;
  const taxable = sub - disc;
  const total = taxable + taxable * gstPct / 100;
  document.getElementById('pay-total-display').textContent = '₹' + total.toFixed(2);
  cashInput = '';
  document.getElementById('cash-received').value = '';
  document.getElementById('change-display').style.display = 'none';
  document.getElementById('upi-ref').value = '';
  document.getElementById('card-last4').value = '';
  document.getElementById('bill-language').value = selectedBillLanguage;
  document.getElementById('bill-size').value = selectedBillSize;
  selectPayMethod('Cash');
  openModal('pay-modal');
}

function selectPayMethod(m) {
  selectedPayMethod = m;
  ['Cash','UPI','Card','Credit'].forEach(x => {
    document.getElementById('pm-' + x.toLowerCase()).classList.toggle('selected', x === m);
  });
  document.getElementById('cash-section').style.display = m === 'Cash' ? 'block' : 'none';
  document.getElementById('upi-section').style.display = m === 'UPI' ? 'block' : 'none';
  document.getElementById('card-section').style.display = m === 'Card' ? 'block' : 'none';
  document.getElementById('credit-section').style.display = m === 'Credit' ? 'block' : 'none';
}

let cashInput = '';
function sanitizeCashInput(value) {
  let sanitized = value.replace(/[^\d.]/g, '');
  const parts = sanitized.split('.');
  if (parts.length > 2) sanitized = parts[0] + '.' + parts.slice(1).join('');
  return sanitized;
}
function updateCashChangeDisplay() {
  const total = parseFloat(document.getElementById('pay-total-display').textContent.replace('₹',''));
  const received = parseFloat(cashInput) || 0;
  const change = received - total;
  if (received > 0) {
    document.getElementById('change-display').style.display = 'block';
    document.getElementById('change-value').textContent = change >= 0 ? '₹' + change.toFixed(2) : '⚠ Short by ₹' + Math.abs(change).toFixed(2);
    document.getElementById('change-value').style.color = change >= 0 ? 'var(--green)' : 'var(--red)';
  } else {
    document.getElementById('change-display').style.display = 'none';
  }
}
function numPad(k) {
  if (k === 'clear') { cashInput = ''; }
  else if (k === '.' && cashInput.includes('.')) { return; }
  else { cashInput += k; }
  document.getElementById('cash-received').value = cashInput;
  updateCashChangeDisplay();
}

document.getElementById('cash-received').addEventListener('input', (e) => {
  cashInput = sanitizeCashInput(e.target.value);
  e.target.value = cashInput;
  updateCashChangeDisplay();
});

// ============================
// COMPLETE BILL & PRINT
// ============================
function completeBill() {
  const sub = getSubtotal();
  const discPct = parseFloat(document.getElementById('bill-discount').value) || 0;
  const gstPct = parseFloat(document.getElementById('bill-gst').value) || 0;
  const disc = sub * discPct / 100;
  const taxable = sub - disc;
  const gst = taxable * gstPct / 100;
  const total = taxable + gst;

  selectedBillLanguage = document.getElementById('bill-language').value || 'en';
  selectedBillSize = document.getElementById('bill-size').value || 'normal';
  const bill = {
    billNo: document.getElementById('bill-no').value,
    datetime: new Date().toISOString(),
    customer: document.getElementById('cust-name').value || 'Walk-in',
    mobile: document.getElementById('cust-mobile').value,
    notes: document.getElementById('bill-notes').value,
    items: JSON.parse(JSON.stringify(currentBill)),
    subtotal: sub, discount: disc, discountPct: discPct,
    gst: gst, gstPct: gstPct, total: total,
    payment: selectedPayMethod,
    language: selectedBillLanguage,
    size: selectedBillSize,
    cashReceived: parseFloat(document.getElementById('cash-received').value) || total,
    change: selectedPayMethod === 'Cash' ? (parseFloat(document.getElementById('cash-received').value) || total) - total : 0
  };

  state.bills.push(bill);
  state.billCounter++;
  saveState();
  closeModal('pay-modal');
  printBill(bill);
  showToast('Bill completed! Printing...');
  setTimeout(() => {
    clearBill();
    generateBillNo();
  }, 500);
}

function setPrintPageSize(size) {
  let styleTag = document.getElementById('print-page-style');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'print-page-style';
    document.head.appendChild(styleTag);
  }
  if (size === 'a4') {
    styleTag.textContent = '@media print { @page { size: A4 portrait; margin: 10mm; } }';
  } else {
    styleTag.textContent = '@media print { @page { size: 80mm auto; margin: 3mm; } }';
  }
}

function printBill(bill) {
  const lang = bill.language || 'en';
  const size = bill.size || 'normal';
  const i18n = {
    en: {
      billNo: 'Bill No',
      date: 'Date',
      customer: 'Customer',
      product: 'Product',
      qty: 'Qty',
      price: 'Price',
      amt: 'Amt',
      subtotal: 'Subtotal',
      discount: 'Discount',
      total: 'TOTAL',
      payment: 'Payment',
      cash: 'Cash',
      change: 'Change',
      shortBy: 'Short by',
      items: 'Items',
      totalQty: 'Total Qty',
      paymentMap: { Cash: 'Cash', UPI: 'UPI', Card: 'Card', Credit: 'Credit' }
    },
    ta: {
      billNo: 'பில் எண்',
      date: 'தேதி',
      customer: 'வாடிக்கையாளர்',
      product: 'பொருள்',
      qty: 'அளவு',
      price: 'விலை',
      amt: 'தொகை',
      subtotal: 'இடைத் தொகை',
      discount: 'தள்ளுபடி',
      total: 'மொத்தம்',
      payment: 'கட்டணம்',
      cash: 'ரொக்கம்',
      change: 'மீதி',
      shortBy: 'குறைவு',
      items: 'பொருட்கள்',
      totalQty: 'மொத்த அளவு',
      paymentMap: { Cash: 'ரொக்கம்', UPI: 'யுபிஐ', Card: 'கார்டு', Credit: 'கடன்' }
    }
  };
  const t = i18n[lang];
  const s = state.settings;
  const dt = new Date(bill.datetime);
  const dateStr = dt.toLocaleDateString('en-IN') + '  ' + dt.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'});
  const colgroupHtml = size === 'a4'
    ? '<colgroup><col style="width:52%"><col style="width:14%"><col style="width:17%"><col style="width:17%"></colgroup>'
    : '<colgroup><col style="width:46%"><col style="width:16%"><col style="width:19%"><col style="width:19%"></colgroup>';
  const paymentLabel = (t.paymentMap && t.paymentMap[bill.payment]) || bill.payment;
  const changeLabel = bill.change >= 0 ? `${t.change}: ₹${bill.change.toFixed(2)}` : `${t.shortBy}: ₹${Math.abs(bill.change).toFixed(2)}`;
  let itemsHtml = bill.items.map(item => `
    <tr>
      <td>${getLocalizedProductName(item.name, lang)}</td>
      <td style="text-align:center">${item.qty} ${item.unit}</td>
      <td style="text-align:right">₹${item.price.toFixed(2)}</td>
      <td style="text-align:right">₹${(item.price * item.qty).toFixed(2)}</td>
    </tr>
  `).join('');

  let gstBreakup = '';
  if (bill.gstPct > 0) {
    const cgst = bill.gst / 2;
    const sgst = bill.gst / 2;
    gstBreakup = `
      <tr><td colspan="3">CGST @ ${bill.gstPct/2}%</td><td style="text-align:right">₹${cgst.toFixed(2)}</td></tr>
      <tr><td colspan="3">SGST @ ${bill.gstPct/2}%</td><td style="text-align:right">₹${sgst.toFixed(2)}</td></tr>
    `;
  }

  const printArea = document.getElementById('print-area');
  printArea.className = `print-size-${size} print-lang-${lang}`;
  printArea.innerHTML = `
    <div class="print-header">
      <div class="store-name-print">${s.storeName}</div>
      <div class="store-sub">${s.address}</div>
      <div class="store-sub">${s.city}</div>
      ${s.phone ? `<div class="store-sub">Ph: ${s.phone}</div>` : ''}
      ${s.gstin ? `<div class="store-sub">GSTIN: ${s.gstin}</div>` : ''}
      ${s.fssai ? `<div class="store-sub">FSSAI: ${s.fssai}</div>` : ''}
    </div>
    <hr class="print-divider-solid">
    <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
      <span><b>${t.billNo}:</b> ${bill.billNo}</span>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
      <span><b>${t.date}:</b> ${dateStr}</span>
    </div>
    <div style="font-size:12px;margin-bottom:4px;"><b>${t.customer}:</b> ${bill.customer}${bill.mobile ? ' | ' + bill.mobile : ''}</div>
    <hr class="print-divider">
    <table class="print-table">
      ${colgroupHtml}
      <thead><tr><th>${t.product}</th><th style="text-align:center">${t.qty}</th><th style="text-align:right">${t.price}</th><th style="text-align:right">${t.amt}</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>
    <hr class="print-divider">
    <table class="print-table">
      ${colgroupHtml}
      <tr><td colspan="3">${t.subtotal}</td><td style="text-align:right">₹${bill.subtotal.toFixed(2)}</td></tr>
      ${bill.discount > 0 ? `<tr><td colspan="3">${t.discount} (${bill.discountPct}%)</td><td style="text-align:right">-₹${bill.discount.toFixed(2)}</td></tr>` : ''}
      ${gstBreakup}
      <tr class="print-total-row"><td colspan="3"><b>${t.total}</b></td><td style="text-align:right"><b>₹${bill.total.toFixed(2)}</b></td></tr>
    </table>
    <hr class="print-divider">
    <div style="font-size:12px;margin-bottom:4px;"><b>${t.payment}:</b> ${paymentLabel}</div>
    ${bill.payment === 'Cash' ? `
      <div style="font-size:12px;"><b>${t.cash}:</b> ₹${bill.cashReceived.toFixed(2)} | <b>${changeLabel}</b></div>
    ` : ''}
    <hr class="print-divider">
    <div class="print-footer">
      <div>${s.footer}</div>
      <div style="margin-top:6px;font-size:10px;">${t.items}: ${bill.items.length} | ${t.totalQty}: ${bill.items.reduce((s,i)=>s+i.qty,0)}</div>
      ${bill.notes ? `<div style="font-style:italic;margin-top:4px;">${bill.notes}</div>` : ''}
    </div>
  `;
  setPrintPageSize(size);
  setTimeout(() => window.print(), 300);
}

// ============================
// PRODUCTS PAGE
// ============================
function updateProductStats() {
  document.getElementById('stat-total-products').textContent = state.products.length;
  document.getElementById('stat-categories').textContent = state.categories.length;
  document.getElementById('stat-low-stock').textContent = state.products.filter(p => p.stock > 0 && p.stock <= 10).length;
  document.getElementById('stat-out-stock').textContent = state.products.filter(p => p.stock === 0).length;
}
function renderProductsTable() {
  const q = (document.getElementById('prod-search').value||'').toLowerCase();
  const cat = document.getElementById('prod-cat-filter').value;
  const stock = document.getElementById('prod-stock-filter').value;
  let prods = state.products;
  if (q) prods = prods.filter(p => p.name.toLowerCase().includes(q) || (p.barcode||'').includes(q));
  if (cat) prods = prods.filter(p => p.cat === cat);
  if (stock === 'low') prods = prods.filter(p => p.stock > 0 && p.stock <= 10);
  if (stock === 'out') prods = prods.filter(p => p.stock === 0);

  const sel = document.getElementById('prod-cat-filter');
  const cur = sel.value;
  sel.innerHTML = '<option value="">All Categories</option>' + state.categories.map(c => `<option ${c===cur?'selected':''} value="${c}">${c}</option>`).join('');

  const tbody = document.getElementById('products-tbody');
  if (!prods.length) { tbody.innerHTML = '<tr><td colspan="9" class="empty-state"><p>No products found</p></td></tr>'; updateProductStats(); return; }
  tbody.innerHTML = prods.map((p,i) => `
    <tr>
      <td class="text-muted fs-12">${i+1}</td>
      <td><div style="font-weight:600">${p.name}</div>${p.desc?`<div class="fs-12 text-muted">${p.desc}</div>`:''}</td>
      <td><span class="badge badge-blue">${p.cat}</span></td>
      <td class="font-mono">₹${p.mrp.toFixed(2)}</td>
      <td class="font-mono text-green fw-700">₹${p.price.toFixed(2)}</td>
      <td>${p.unit}</td>
      <td>
        <span class="badge ${p.stock === 0 ? 'badge-red' : p.stock <= 10 ? 'badge-orange' : 'badge-green'}">${p.stock === 0 ? 'Out of Stock' : p.stock <= 10 ? 'Low: ' + p.stock : p.stock}</span>
      </td>
      <td class="font-mono fs-12 text-muted">${p.hsn||'—'}</td>
      <td>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" onclick="editProduct(${p.id})">✏️</button>
          <button class="btn btn-sm" style="background:rgba(239,68,68,0.15);color:var(--red);border:none;cursor:pointer;" onclick="deleteProduct(${p.id})">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
  updateProductStats();
}

function openAddProductModal() {
  editingProductId = null;
  document.getElementById('product-modal-title').textContent = 'Add New Product';
  ['pm-name','pm-mrp','pm-price','pm-stock','pm-hsn','pm-barcode','pm-desc'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('pm-unit').value = 'Nos';
  const catSel = document.getElementById('pm-cat');
  catSel.innerHTML = state.categories.map(c => `<option>${c}</option>`).join('');
  openModal('product-modal');
}

function editProduct(id) {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  editingProductId = id;
  document.getElementById('product-modal-title').textContent = 'Edit Product';
  const catSel = document.getElementById('pm-cat');
  catSel.innerHTML = state.categories.map(c => `<option ${c===p.cat?'selected':''}>${c}</option>`).join('');
  document.getElementById('pm-name').value = p.name;
  document.getElementById('pm-mrp').value = p.mrp;
  document.getElementById('pm-price').value = p.price;
  document.getElementById('pm-unit').value = p.unit;
  document.getElementById('pm-stock').value = p.stock;
  document.getElementById('pm-hsn').value = p.hsn||'';
  document.getElementById('pm-barcode').value = p.barcode||'';
  document.getElementById('pm-desc').value = p.desc||'';
  openModal('product-modal');
}

function saveProduct() {
  const name = document.getElementById('pm-name').value.trim();
  const cat = document.getElementById('pm-cat').value;
  const mrp = parseFloat(document.getElementById('pm-mrp').value);
  const price = parseFloat(document.getElementById('pm-price').value);
  if (!name || isNaN(mrp) || isNaN(price)) { showToast('Fill all required fields!', 'red'); return; }
  const prod = {
    id: editingProductId || Date.now(),
    name, cat, mrp, price,
    unit: document.getElementById('pm-unit').value,
    stock: parseInt(document.getElementById('pm-stock').value) || 0,
    hsn: document.getElementById('pm-hsn').value,
    barcode: document.getElementById('pm-barcode').value,
    desc: document.getElementById('pm-desc').value
  };
  if (editingProductId) {
    const idx = state.products.findIndex(p => p.id === editingProductId);
    state.products[idx] = prod;
  } else {
    state.products.push(prod);
  }
  saveState();
  closeModal('product-modal');
  renderProductsTable();
  renderProductGrid();
  renderCatPills();
  showToast(editingProductId ? 'Product updated!' : 'Product added!');
}

function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  state.products = state.products.filter(p => p.id !== id);
  saveState();
  renderProductsTable();
  renderProductGrid();
  showToast('Product deleted!');
}

// ============================
// HISTORY
// ============================
function renderHistory() {
  const from = document.getElementById('hist-from').value;
  const to = document.getElementById('hist-to').value;
  let bills = [...state.bills].reverse();
  if (from) bills = bills.filter(b => new Date(b.datetime) >= new Date(from));
  if (to) bills = bills.filter(b => new Date(b.datetime) <= new Date(to + 'T23:59:59'));
  const tbody = document.getElementById('history-tbody');
  if (!bills.length) { tbody.innerHTML = '<tr><td colspan="10" class="empty-state"><p>No bills found</p></td></tr>'; return; }
  tbody.innerHTML = bills.map(b => {
    const dt = new Date(b.datetime);
    return `<tr>
      <td class="font-mono fs-12 text-orange">${b.billNo}</td>
      <td class="fs-12">${dt.toLocaleDateString('en-IN')} ${dt.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</td>
      <td>${b.customer}${b.mobile?'<br><span class="fs-12 text-muted">'+b.mobile+'</span>':''}</td>
      <td>${b.items.length} items</td>
      <td class="font-mono">₹${b.subtotal.toFixed(2)}</td>
      <td class="font-mono">₹${b.gst.toFixed(2)}</td>
      <td class="font-mono text-red">${b.discount > 0 ? '-₹'+b.discount.toFixed(2) : '—'}</td>
      <td class="font-mono fw-700 text-green">₹${b.total.toFixed(2)}</td>
      <td><span class="badge badge-blue">${b.payment}</span></td>
      <td><button class="btn btn-secondary btn-sm" onclick="reprintBill(${state.bills.indexOf(state.bills.find(x=>x.billNo===b.billNo))})">🖨 Reprint</button></td>
    </tr>`;
  }).join('');
}

function reprintBill(idx) {
  const bill = state.bills[state.bills.length - 1 - (idx)];
  // Find by billNo from reversed array
  const allBills = [...state.bills].reverse();
  printBill(allBills[idx]);
}

// ============================
// DASHBOARD
// ============================
function updateDashboard() {
  const today = new Date().toDateString();
  const thisMonth = new Date().getMonth() + '' + new Date().getFullYear();
  const todayBills = state.bills.filter(b => new Date(b.datetime).toDateString() === today);
  const monthBills = state.bills.filter(b => new Date(b.datetime).getMonth() + '' + new Date(b.datetime).getFullYear() === thisMonth);
  const todaySales = todayBills.reduce((s,b) => s + b.total, 0);
  const monthSales = monthBills.reduce((s,b) => s + b.total, 0);
  const totalRev = state.bills.reduce((s,b) => s + b.total, 0);
  document.getElementById('dash-today').textContent = '₹' + todaySales.toFixed(2);
  document.getElementById('dash-bills').textContent = todayBills.length;
  document.getElementById('dash-month').textContent = '₹' + monthSales.toFixed(2);
  document.getElementById('dash-total').textContent = '₹' + totalRev.toFixed(2);

  // Top products
  const prodSales = {};
  todayBills.forEach(b => b.items.forEach(i => { prodSales[i.name] = (prodSales[i.name]||0) + i.qty; }));
  const sorted = Object.entries(prodSales).sort((a,b) => b[1]-a[1]).slice(0,8);
  const tpEl = document.getElementById('dash-top-products');
  tpEl.innerHTML = sorted.length ? sorted.map(([n,q]) => `
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px;">
      <span>${n}</span><span class="font-mono text-orange fw-700">${q} sold</span>
    </div>`).join('') : '<div class="empty-state"><div class="icon">📦</div><p>No sales today yet</p></div>';

  // Recent bills
  const recent = [...state.bills].reverse().slice(0,5);
  const rbEl = document.getElementById('dash-recent-bills');
  rbEl.innerHTML = recent.length ? recent.map(b => `
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px;">
      <div><div class="text-orange font-mono">${b.billNo}</div><div class="text-muted fs-12">${b.customer}</div></div>
      <div class="text-green fw-700 font-mono">₹${b.total.toFixed(2)}</div>
    </div>`).join('') : '<div class="empty-state"><div class="icon">🧾</div><p>No bills yet</p></div>';
}

// ============================
// SETTINGS
// ============================
function renderSettings() {
  const s = state.settings;
  document.getElementById('set-store-name').value = s.storeName||'';
  document.getElementById('set-address').value = s.address||'';
  document.getElementById('set-city').value = s.city||'';
  document.getElementById('set-phone').value = s.phone||'';
  document.getElementById('set-gstin').value = s.gstin||'';
  document.getElementById('set-fssai').value = s.fssai||'';
  document.getElementById('set-footer').value = s.footer||'';
  renderCatList();
}
function saveSettings() {
  state.settings = {
    storeName: document.getElementById('set-store-name').value || 'My Superstore',
    address: document.getElementById('set-address').value,
    city: document.getElementById('set-city').value,
    phone: document.getElementById('set-phone').value,
    gstin: document.getElementById('set-gstin').value,
    fssai: document.getElementById('set-fssai').value,
    footer: document.getElementById('set-footer').value,
  };
  saveState();
  updateNavStore();
  showToast('Settings saved!');
}
function updateNavStore() {
  document.getElementById('nav-store-name').textContent = state.settings.storeName || 'My Superstore';
}
function renderCatList() {
  document.getElementById('cat-list').innerHTML = state.categories.map((c,i) => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
      <span style="font-size:14px;">${c}</span>
      <button class="btn btn-sm" style="background:rgba(239,68,68,0.1);color:var(--red);border:none;cursor:pointer;" onclick="deleteCategory(${i})">✕</button>
    </div>`).join('') || '<div class="text-muted fs-12">No categories yet</div>';
}
function addCategory() {
  const v = document.getElementById('new-cat').value.trim();
  if (!v || state.categories.includes(v)) { showToast('Category already exists!', 'red'); return; }
  state.categories.push(v);
  document.getElementById('new-cat').value = '';
  saveState();
  renderCatList();
  renderCatPills();
  showToast('Category added!');
}
function deleteCategory(i) {
  if (!confirm('Delete category "' + state.categories[i] + '"?')) return;
  state.categories.splice(i, 1);
  saveState();
  renderCatList();
  renderCatPills();
  renderProductGrid();
}

// ============================
// MODALS
// ============================
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); }));

// ============================
// DATA EXPORT / IMPORT
// ============================
function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'superstore_backup_' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  showToast('Data exported!');
}
function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!confirm('This will replace all current data. Continue?')) return;
      state = { ...state, ...data };
      saveState();
      init();
      showToast('Data imported!');
    } catch(err) { showToast('Invalid file!', 'red'); }
  };
  reader.readAsText(file);
}
function resetData() {
  if (!confirm('WARNING: This will delete ALL products and bills. Type RESET to confirm.')) return;
  const r = prompt('Type RESET to confirm:');
  if (r !== 'RESET') return;
  localStorage.removeItem('superstore_state');
  state = { products: [], categories: [], bills: [], settings: state.settings, billCounter: 1 };
  saveState();
  loadSampleProducts();
  init();
  showToast('Data reset!');
}

// ============================
// TOAST
// ============================
let toastTimer;
function showToast(msg, type='green') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.style.background = type === 'red' ? 'var(--red)' : 'var(--green)';
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

// ============================
// BOOT
// ============================
init();
