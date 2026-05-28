export const PHONE = '+918151088552';
export const PHONE_DISPLAY = '+91 8151 088 552';
export const PHONE_RAW = '8151088552';
export const CONTACT_NAME = 'Krishna Niak';
export const CONTACT_EMAIL = 'naikkrishna750@gmail.com';
export const LOCATION_ADDRESS = 'Shop no 4 Nagappa Palace building, Opp. TVS Showroom, Gr. Floor, Shirali, Bhatkal';
export const LOCATION_MAP = 'https://maps.app.goo.gl/NWPFpJd3XViEMiE28';

export const getWhatsAppLink = (message = '') =>
  `https://wa.me/91${PHONE_RAW}?text=${encodeURIComponent(message)}`;

export const stats = [
  { value: 2000, suffix: '+', label: 'Happy Customers', icon: 'fa-users' },
  { value: 10, suffix: '+', label: 'Years Experience', icon: 'fa-calendar-check' },
  { value: 5000, suffix: '+', label: 'Devices Repaired', icon: 'fa-tools' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: 'fa-star' },
];

export const services = [
  {
    id: 1,
    icon: 'fa-video',
    title: 'CCTV Camera Installation',
    short: 'Professional CCTV setup for homes, offices & shops with remote viewing.',
    description:
      'We provide end-to-end CCTV surveillance solutions tailored to your security needs. Our technicians assess your premises, recommend the best camera placements, and install industry-grade systems that keep you safe 24/7.',
    features: [
      'Site survey & camera placement planning',
      'HD, Full HD & 4K camera options',
      'Night vision & motion detection',
      'Remote viewing via mobile app',
      'DVR/NVR configuration & cloud backup',
      '1-year installation warranty',
    ],
    startingPrice: '₹4,999',
    category: 'Security',
  },
  {
    id: 2,
    icon: 'fa-camera',
    title: 'IP / PTZ / Full HD Camera Setup',
    short: 'Advanced IP & PTZ camera systems with 360° coverage and smart tracking.',
    description:
      'Upgrade your surveillance with cutting-edge IP and PTZ cameras. We configure pan-tilt-zoom cameras for wide-area coverage and smart auto-tracking features suited for large premises, warehouses, and commercial spaces.',
    features: [
      'IP network camera installation',
      'PTZ auto-tracking configuration',
      'PoE switch setup & cabling',
      'VMS (Video Management Software) setup',
      'Integration with existing systems',
      'Remote monitoring & alert setup',
    ],
    startingPrice: '₹7,999',
    category: 'Security',
  },
  {
    id: 3,
    icon: 'fa-desktop',
    title: 'Computer Service & Gaming PC Build',
    short: 'Expert desktop repairs and custom gaming PC builds to your specs.',
    description:
      "Whether your desktop needs a fix or you want a beast gaming rig built from scratch, we've got you covered. We source quality components, assemble, test, and hand-deliver performance-tuned PCs with full support.",
    features: [
      'Hardware diagnostics & repair',
      'OS reinstallation & driver setup',
      'Custom gaming PC assembly',
      'Thermal paste & cooling upgrades',
      'RAM & storage upgrades',
      'Cable management & RGB setup',
    ],
    startingPrice: '₹499',
    category: 'Repair',
  },
  {
    id: 4,
    icon: 'fa-print',
    title: 'Printer Service & Cartridge Refilling',
    short: 'Printer repairs, head cleaning, and affordable cartridge refilling.',
    description:
      'Keep your printers running at peak performance with our expert servicing. We handle all major brands — HP, Canon, Epson, Brother — and offer genuine & compatible cartridge refilling at a fraction of the retail cost.',
    features: [
      'All brand printer servicing',
      'Printhead cleaning & alignment',
      'Ink & toner cartridge refilling',
      'Paper jam & roller replacement',
      'Network printer configuration',
      'Annual maintenance contracts',
    ],
    startingPrice: '₹299',
    category: 'Repair',
  },
  {
    id: 5,
    icon: 'fa-laptop',
    title: 'Laptop Service & Sales',
    short: 'Laptop repairs, screen replacements, and refurbished laptop sales.',
    description:
      'From cracked screens to motherboard-level repairs, our certified technicians restore your laptop to like-new condition. We also stock quality refurbished laptops with warranty, ideal for students and professionals on a budget.',
    features: [
      'Screen / display replacement',
      'Battery & keyboard replacement',
      'Motherboard & chip-level repair',
      'Data recovery & transfer',
      'Refurbished laptop sales with warranty',
      'Software troubleshooting & antivirus',
    ],
    startingPrice: '₹599',
    category: 'Repair',
  },
];

export const productCategories = [
  { id: 'all', label: 'All Products', icon: 'fa-th' },
  { id: 'accessories', label: 'Computer Accessories', icon: 'fa-keyboard' },
  { id: 'laptops', label: 'Laptops', icon: 'fa-laptop' },
  { id: 'cctv', label: 'CCTV Equipment', icon: 'fa-video' },
  { id: 'printers', label: 'Printers', icon: 'fa-print' },
];

// Products will be fetched from the backend API
export const products = [];

export const whyChooseUs = [
  {
    icon: 'fa-shield-halved',
    title: 'Trusted & Certified',
    description: 'All our technicians are certified with years of hands-on experience in hardware and software.',
  },
  {
    icon: 'fa-bolt',
    title: 'Fast Turnaround',
    description: 'Most repairs completed same-day or within 24 hours. We respect your time.',
  },
  {
    icon: 'fa-tag',
    title: 'Transparent Pricing',
    description: 'No hidden charges. You get a clear quote before we begin any work.',
  },
  {
    icon: 'fa-rotate-left',
    title: 'Warranty on Repairs',
    description: 'All repair services come with a 90-day warranty on parts and labour.',
  },
  {
    icon: 'fa-headset',
    title: '24/7 Support',
    description: 'WhatsApp or call us anytime. Our support team is always a message away.',
  },
  {
    icon: 'fa-map-location-dot',
    title: 'Doorstep Service',
    description: "Can't visit us? We come to you! Doorstep service available across Bhatkal.",
  },
];

export const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Business Owner',
    text: 'Dev Computers installed a complete 16-camera CCTV system for my showroom. Excellent work, very professional team, and the remote viewing app works perfectly!',
    rating: 5,
    avatar: 'RS',
  },
  {
    name: 'Priya Nair',
    role: 'Software Engineer',
    text: 'Got my laptop screen replaced here. Quick service, genuine parts, and a fair price. The staff are friendly and explained everything clearly. Highly recommended!',
    rating: 5,
    avatar: 'PN',
  },
  {
    name: 'Amit Patel',
    role: 'Gaming Enthusiast',
    text: 'They built me a custom gaming PC within my budget. The cable management looks fantastic and the performance is outstanding. Will definitely come back for upgrades!',
    rating: 5,
    avatar: 'AP',
  },
  {
    name: 'Sunita Reddy',
    role: 'School Principal',
    text: 'Our school\'s 20 computers were all serviced by Dev Computers. They came to our premises, worked efficiently, and the annual maintenance contract is very affordable.',
    rating: 4,
    avatar: 'SR',
  },
  {
    name: 'Kiran Mathew',
    role: 'Photographer',
    text: 'Bought a refurbished laptop from them — it\'s in perfect condition with Windows 11. They gave a 6-month warranty and even helped set up my software. Great experience!',
    rating: 5,
    avatar: 'KM',
  },
  {
    name: 'Deepak Joshi',
    role: 'Accountant',
    text: 'My office printer was giving trouble. Dev Computers fixed it same day and also set up the network printing. Super fast and affordable. My go-to shop now!',
    rating: 5,
    avatar: 'DJ',
  },
];

export const timeSlots = [
  '9:00 AM – 10:00 AM',
  '10:00 AM – 11:00 AM',
  '11:00 AM – 12:00 PM',
  '12:00 PM – 1:00 PM',
  '2:00 PM – 3:00 PM',
  '3:00 PM – 4:00 PM',
  '4:00 PM – 5:00 PM',
  '5:00 PM – 6:00 PM',
];
