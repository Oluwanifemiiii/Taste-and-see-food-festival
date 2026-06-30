export const CITIES = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Kano']

export const TICKET_TIERS = {
  regular: {
    label: 'Regular',
    price: 5000,
    benefits: ['Festival entry', 'Food tasting access', 'Cultural performances'],
  },
  premium: {
    label: 'Premium',
    price: 15000,
    benefits: ['All Regular benefits', 'Reserved seating', 'Cooking demonstrations', 'Priority food access'],
  },
  vip: {
    label: 'VIP Experience',
    price: 50000,
    benefits: ['All Premium benefits', 'Chef access', 'VIP lounge', 'Gift bag from Lamideflavrfoods'],
  },
}

export const EVENTS = [
  {
    id: 1,
    type: 'A',
    title: 'Yoruba Heritage Table',
    ethnic: 'Yoruba',
    date: 'Fri, July 10, 2026',
    time: '4:00 PM - 10:00 PM',
    city: 'Lagos',
    location: 'Balmoral Hall, Sheraton Hotels and Towers, Ikeja',
    shortLoc: 'Sheraton Hotel, Ikeja',
    status: 'Selling fast',
    capacity: 750,
    sold: 492,
    desc: 'A deep exploration of Yoruba culinary traditions with amala, gbegiri, ewedu, ofada rice, ayamase, ikokore, storytelling, bata performance, and a curated food marketplace.',
    dishes: ['Amala & Ewedu', 'Gbegiri', 'Ofada Rice', 'Ayamase', 'Ikokore', 'Moin Moin'],
    methods: ['Clay pot stewing', 'Stone-ground pepper', 'Firewood cooking'],
  },
  {
    id: 2,
    type: 'B',
    title: 'Old vs New: Pepper Grinding Challenge',
    ethnic: null,
    date: 'Sat, August 1, 2026',
    time: '3:00 PM - 9:00 PM',
    city: 'Lagos',
    location: 'Terra Kulture, Victoria Island',
    shortLoc: 'Terra Kulture, VI',
    status: 'Open',
    capacity: 600,
    sold: 214,
    desc: 'Grinding stone, mortar and pestle, manual blender, electric blender, and industrial blending are compared for texture, taste, aroma, cooking performance, and audience preference.',
    dishes: ['Pepper Soup Base', 'Ata Din Din', 'Stew Base', 'Suya Pepper Blend'],
    methods: ['Grinding stone', 'Mortar and pestle', 'Manual blender', 'Electric blender', 'Industrial blender'],
  },
  {
    id: 3,
    type: 'A',
    title: 'Igbo Umunna Food Festival',
    ethnic: 'Igbo',
    date: 'Sat, August 15, 2026',
    time: '4:00 PM - 10:00 PM',
    city: 'Abuja',
    location: 'Transcorp Hilton, Abuja',
    shortLoc: 'Transcorp Hilton',
    status: 'Open',
    capacity: 700,
    sold: 186,
    desc: 'A celebration of Igbo food memory through ofe nsala, oha soup, abacha, ugba, nkwobi, palm wine culture, masquerade storytelling, and entrepreneurship talks.',
    dishes: ['Ofe Nsala', 'Oha Soup', 'Abacha & Ugba', 'Nkwobi', 'Isiewu', 'Ofe Akwu'],
    methods: ['Traditional soup thickening', 'Palm wine pairing', 'Cassava processing'],
  },
  {
    id: 4,
    type: 'B',
    title: 'Beans Preparation Lab',
    ethnic: null,
    date: 'Sat, August 29, 2026',
    time: '3:00 PM - 9:00 PM',
    city: 'Ibadan',
    location: 'International Conference Centre, Ibadan',
    shortLoc: 'ICC Ibadan',
    status: 'Open',
    capacity: 500,
    sold: 133,
    desc: 'Traditional firewood cooking, charcoal, gas, pressure cooking, and industrial cooking are compared for taste, speed, cost, and nutritional retention.',
    dishes: ['Ewa Riro', 'Akara', 'Moin Moin', 'Gbegiri'],
    methods: ['Firewood', 'Charcoal', 'Gas', 'Pressure pot', 'Industrial cooker'],
  },
  {
    id: 5,
    type: 'A',
    title: 'Efik Kitchen: Cross River',
    ethnic: 'Efik',
    date: 'Sat, September 12, 2026',
    time: '5:00 PM - 11:00 PM',
    city: 'Port Harcourt',
    location: 'Hotel Presidential, Port Harcourt',
    shortLoc: 'Hotel Presidential',
    status: 'Open',
    capacity: 650,
    sold: 278,
    desc: 'A coastal table featuring edikaikong, afang, ekpang nkukwo, afia efere, ceremonial hospitality, and ingredient exhibitions from Cross River food custodians.',
    dishes: ['Edikaikong Soup', 'Afang Soup', 'Ekpang Nkukwo', 'Afia Efere', 'Fisherman Soup'],
    methods: ['Leaf layering', 'Periwinkle cleaning', 'Seafood stock building'],
  },
  {
    id: 6,
    type: 'B',
    title: 'Pounded Yam Evolution',
    ethnic: null,
    date: 'Sat, September 26, 2026',
    time: '3:00 PM - 9:00 PM',
    city: 'Enugu',
    location: 'Base Landmark Event Centre, Enugu',
    shortLoc: 'Base Landmark',
    status: 'Open',
    capacity: 540,
    sold: 112,
    desc: 'Traditional mortar and pestle, hand pounding machines, and electric pounders go head to head with audience tasting and chef-led texture analysis.',
    dishes: ['Pounded Yam', 'Ofe Nsala', 'Egusi Soup', 'Bitterleaf Soup'],
    methods: ['Mortar and pestle', 'Hand pounding machine', 'Electric pounder'],
  },
  {
    id: 7,
    type: 'A',
    title: 'Hausa-Fulani Northern Table',
    ethnic: 'Hausa-Fulani',
    date: 'Sat, October 10, 2026',
    time: '4:00 PM - 10:00 PM',
    city: 'Kano',
    location: 'Bristol Palace Hotel, Kano',
    shortLoc: 'Bristol Palace',
    status: 'Open',
    capacity: 800,
    sold: 321,
    desc: 'Tuwon shinkafa, miyan kuka, kilishi, fura da nono, dan wake, suya craft, and Northern hospitality presented with music, textile culture, and culinary demonstrations.',
    dishes: ['Tuwon Shinkafa', 'Miyan Kuka', 'Kilishi', 'Fura da Nono', 'Dan Wake', 'Suya'],
    methods: ['Millet fermentation', 'Kilishi drying', 'Spice rub preparation'],
  },
  {
    id: 8,
    type: 'B',
    title: 'Palm Oil Processing Chronicles',
    ethnic: null,
    date: 'Sat, October 24, 2026',
    time: '3:00 PM - 9:00 PM',
    city: 'Lagos',
    location: 'Federal Palace Hotel, Victoria Island',
    shortLoc: 'Federal Palace',
    status: 'Open',
    capacity: 650,
    sold: 241,
    desc: 'Traditional extraction, semi-mechanized extraction, and industrial extraction are compared through taste, yield, nutrition, sustainability, and food entrepreneur case studies.',
    dishes: ['Banga Soup', 'Palm Oil Rice', 'Palm Kernel Sauce', 'Palm Heart Stir-Fry'],
    methods: ['Traditional extraction', 'Semi-mechanized press', 'Industrial extraction'],
  },
]

export const MASTERCLASSES = [
  { id: 'mc-1', title: 'Indigenous Soup Foundations', chef: 'Chef Lamide Adeyemi', date: 'July 19, 2026', city: 'Lagos', price: 25000, seats: 40 },
  { id: 'mc-2', title: 'Modern Plating for Nigerian Classics', chef: 'Chef Emeka Okafor', date: 'August 2, 2026', city: 'Lagos', price: 50000, seats: 30 },
  { id: 'mc-3', title: 'Food Business Starter Clinic', chef: 'Aisha Garba', date: 'August 16, 2026', city: 'Abuja', price: 100000, seats: 25 },
]

export const VENDOR_PACKAGES = [
  { id: 'food-vendor', title: 'Food Vendor Booth', price: 100000, max: 300000, includes: ['3m x 3m booth', 'Vendor profile listing', 'Two staff passes', 'Sales reporting support'] },
  { id: 'corporate-vendor', title: 'Corporate Vendor Booth', price: 250000, max: 1000000, includes: ['Premium booth placement', 'Sampling rights', 'Brand mention', 'Lead capture support'] },
]

export const SPONSOR_PACKAGES = [
  { id: 'headline', title: 'Headline Sponsor', price: 20000000, includes: ['Naming alignment', 'Main stage branding', 'VIP hospitality', 'Content integration'] },
  { id: 'gold', title: 'Gold Sponsor', price: 10000000, includes: ['Category exclusivity', 'Stage mentions', 'Premium booth', 'Digital campaign placement'] },
  { id: 'silver', title: 'Silver Sponsor', price: 5000000, includes: ['Event branding', 'Marketplace booth', 'Social media mentions', 'Partner listing'] },
]

export const MERCH = [
  { id: 'apron', title: 'Adire Festival Apron', price: 18000, category: 'Aprons' },
  { id: 'cookbook', title: 'Taste & See Heritage Cookbook', price: 30000, category: 'Cookbooks' },
  { id: 'tee', title: 'Eat. Remember. Return. T-Shirt', price: 15000, category: 'T-Shirts' },
  { id: 'spice-kit', title: 'Regional Spice Discovery Kit', price: 22000, category: 'Souvenirs' },
]

export const REPORTS = [
  { id: 'report-2026', title: 'Annual Taste and See Food Report 2026', status: 'Pre-order', price: 35000, focus: 'Consumer taste trends, indigenous ingredient mapping, farmer/vendor insights.' },
  { id: 'archive-1', title: 'Nigeria Culinary Heritage Archive Vol. 1', status: 'In production', price: 50000, focus: 'Documented techniques, oral histories, and old-vs-new experiment results.' },
]

export const IMPACT_METRICS = [
  ['100,000+', 'Five-year annual attendees target'],
  ['6', 'Nigerian cities in expansion plan'],
  ['250+', 'Ethnic food traditions to document'],
  ['1,000+', 'Projected vendor and creative jobs'],
]

export const PARTNERS = ['Lamideflavrfoods', 'Tourism Lagos', 'Culinary Schools Network', 'Farmers Market NG', 'Hospitality Guild', 'Food Creators Hub']

export const MARKETING_CHANNELS = [
  'Instagram',
  'TikTok',
  'YouTube',
  'Facebook',
  'X',
  'Food bloggers',
  'Celebrity chefs',
  'Travel influencers',
]

export const PARTNERSHIP_TYPES = [
  'Hotels',
  'Airlines',
  'Tourism agencies',
  'Culinary schools',
  'Restaurants',
  'Agricultural companies',
]

export const OPERATIONS_ROLES = [
  'Festival Director',
  'Operations Manager',
  'Marketing Manager',
  'Vendor Relations Manager',
  'Finance Manager',
  'Technical Team',
  'Event Coordinators',
  'Volunteer Coordinators',
]

export const FINANCIAL_PROJECTION = {
  revenue: [
    ['Ticket Sales', 52000000],
    ['Vendor Booths', 39000000],
    ['Sponsorships', 100000000],
    ['Merchandise', 15000000],
    ['Masterclasses', 18000000],
    ['Digital Content', 10000000],
  ],
  expenses: [
    ['Venue', 40000000],
    ['Production', 35000000],
    ['Marketing', 25000000],
    ['Staff', 30000000],
    ['Logistics', 20000000],
    ['Security', 10000000],
    ['Miscellaneous', 15000000],
  ],
}

export const FIVE_YEAR_INITIATIVES = [
  '100+ food experiences annually',
  'Pan-African expansion strategy',
  'International food tours',
  'Food documentary series',
  'Taste and See Culinary Museum',
  'Taste and See Television Network',
  'Taste and See Awards',
]

export const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG')

export const PRICE_MAP = Object.fromEntries(Object.entries(TICKET_TIERS).map(([key, tier]) => [key, tier.price]))

export const getTicketLabel = (key) => TICKET_TIERS[key]?.label || TICKET_TIERS.premium.label
