export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  weight: string;
  category?: string;
  features?: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  products: string[];
  benefits: string[];
  pricing: {
    monthly: number;
    quarterly: number;
    halfYearly: number;
  };
  idealFor: string[];
  color: string;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'muscle-building',
    name: 'Muscle Building Plan',
    tagline: 'Build Lean Muscle Mass',
    description: 'Perfect combination of whey protein and creatine for maximum muscle growth and strength gains.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800',
    products: ['Whey Protein Isolate', 'Creatine Monohydrate'],
    benefits: [
      'Gain 2-4 kg lean muscle per month',
      'Increased strength and power',
      'Faster recovery between workouts',
      'Premium quality supplements'
    ],
    pricing: {
      monthly: 3499,
      quarterly: 9999,
      halfYearly: 18999
    },
    idealFor: ['Beginners', 'Intermediate lifters', 'Muscle gain focused'],
    color: 'blue'
  },
  {
    id: 'lean-gains',
    name: 'Lean Gains Plan',
    tagline: 'Get Shredded & Strong',
    description: 'Optimal stack for building lean muscle while maintaining low body fat. Perfect for aesthetic physique.',
    image: 'https://images.unsplash.com/photo-1540206063137-4a88ca974d1a?w=800',
    products: ['Whey Protein Isolate', 'BCAA Powder', 'L-Carnitine'],
    benefits: [
      'Build lean muscle without fat',
      'Preserve muscle during cutting',
      'Enhanced fat metabolism',
      'Improved muscle definition'
    ],
    pricing: {
      monthly: 3999,
      quarterly: 11499,
      halfYearly: 21999
    },
    idealFor: ['Cutting phase', 'Body recomposition', 'Athletes'],
    color: 'green'
  },
  {
    id: 'performance',
    name: 'Performance Plan',
    tagline: 'Peak Athletic Performance',
    description: 'Complete performance stack for serious athletes. Boost energy, endurance, and recovery.',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800',
    products: ['Pre-Workout', 'Whey Protein', 'BCAA', 'Glutamine'],
    benefits: [
      'Explosive workout energy',
      'Enhanced endurance',
      'Rapid recovery',
      'Peak performance levels'
    ],
    pricing: {
      monthly: 4499,
      quarterly: 12999,
      halfYearly: 24999
    },
    idealFor: ['Athletes', 'CrossFit', 'High-intensity training'],
    color: 'red'
  },
  {
    id: 'mass-gainer',
    name: 'Mass Gainer Plan',
    tagline: 'Maximum Size & Strength',
    description: 'High-calorie stack designed for hardgainers. Pack on serious mass and strength quickly.',
    image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800',
    products: ['Mass Gainer', 'Casein Protein', 'Creatine'],
    benefits: [
      'Gain 4-6 kg per month',
      'Sustained protein release',
      '1000+ calories per serving',
      'Strength gains guaranteed'
    ],
    pricing: {
      monthly: 3799,
      quarterly: 10999,
      halfYearly: 20999
    },
    idealFor: ['Hardgainers', 'Bulking phase', 'Strength athletes'],
    color: 'purple'
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Whey Protein Isolate",
    price: 2499,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800",
    description: "Premium whey protein isolate with 90% protein content for muscle building",
    weight: "1kg",
    category: "whey-proteins",
    features: ["25g Protein per serving", "Low carbs & fat", "Fast absorption", "Great taste"]
  },
  {
    id: "2", 
    name: "Casein Protein",
    price: 2199,
    image: "https://images.unsplash.com/photo-1609899464726-209befaac5bc?w=800",
    description: "Slow-release protein for overnight muscle recovery and growth",
    weight: "1kg",
    category: "whey-proteins",
    features: ["24g Protein per serving", "8-hour release", "Anti-catabolic", "Night-time recovery"]
  },
  {
    id: "3",
    name: "Mass Gainer XXL",
    price: 1899,
    image: "https://images.unsplash.com/photo-1613685044678-0a9ae422cf5a?w=800",
    description: "High-calorie mass gainer for serious weight and muscle gain",
    weight: "3kg",
    category: "mass-gainers",
    features: ["1250 Calories", "50g Protein", "250g Carbs", "Added vitamins"]
  },
  {
    id: "4",
    name: "BCAA Energy",
    price: 1299,
    image: "https://images.unsplash.com/photo-1609899517237-77d357b047cf?w=800",
    description: "Essential amino acids for muscle recovery and endurance",
    weight: "300g",
    category: "recovery",
    features: ["2:1:1 Ratio", "Zero sugar", "Electrolytes", "30 servings"]
  },
  {
    id: "5",
    name: "Creatine Monohydrate",
    price: 999,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800",
    description: "Pure creatine monohydrate for strength and power",
    weight: "250g",
    category: "recovery",
    features: ["5g per serving", "Micronized", "Unflavored", "83 servings"]
  },
  {
    id: "6",
    name: "Pre-Workout Explosion",
    price: 1599,
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800",
    description: "Intense energy and focus for explosive workouts",
    weight: "300g",
    category: "pre-workouts",
    features: ["300mg Caffeine", "Beta-Alanine", "L-Citrulline", "30 servings"]
  },
  {
    id: "7",
    name: "Glutamine Powder",
    price: 1199,
    image: "https://images.unsplash.com/photo-1609899464726-209befaac5bc?w=800",
    description: "Pure L-Glutamine for immune support and recovery",
    weight: "300g",
    category: "recovery",
    features: ["5g per serving", "Immune support", "Gut health", "60 servings"]
  },
  {
    id: "8",
    name: "L-Carnitine Liquid",
    price: 1399,
    image: "https://images.unsplash.com/photo-1609899517237-77d357b047cf?w=800",
    description: "Fat metabolism support and energy production",
    weight: "500ml",
    category: "recovery",
    features: ["3000mg per serving", "Fat burning", "Energy boost", "31 servings"]
  }
];

export const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;


export const testimonials = [
  {
    id: 1,
    name: "Raj Kumar",
    role: "Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    content: "The Muscle Building Plan transformed my physique in just 3 months. Gained 8kg of lean muscle!",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Marathon Runner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    content: "Performance Plan gave me the edge I needed. My recovery time improved dramatically.",
    rating: 5
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "Bodybuilder",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    content: "Best quality supplements I've ever used. The results speak for themselves!",
    rating: 5
  },
  {
    id: 4,
    name: "Neha Gupta",
    role: "CrossFit Athlete",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    content: "The convenience of monthly deliveries and quality products make protein2x7 unbeatable.",
    rating: 5
  }
];

export const faqs = [
  {
    question: "Is the food prepared hygienically?",
    answer: "Yes. We follow strict government food safety standards and our own hygiene methods. From washing raw ingredients to sanitizing utensils and storing food at the right temperature, everything is handled with care. Our trained team ensures your meals are always safe and hygienic."
  },
  {
    question: "Do you use good-quality raw materials?",
    answer: "Absolutely. We source all ingredients only from certified and trusted vendors to make sure every meal is fresh and of top quality."
  },
  {
    question: "How do you ensure the protein, like Paneer, is pure and not adulterated?",
    answer: "Our Paneer and protein products come from well-known, established brands that maintain strict quality standards. They would never compromise their reputation with adulteration."
  },
  {
    question: "What if I don't like the food?",
    answer: "We offer a trial package so you can try before committing. If you're happy, you can continue with our regular meal plans. We're confident that the same quality will be maintained in every meal. For concerns, you can always email us, and we'll help."
  },
  {
    question: "Can I pause or reschedule my meals if I'm traveling?",
    answer: "Yes, you can. Just send us an email, and we'll adjust your delivery calendar to suit your schedule."
  },
  {
    question: "Can I visit the kitchen to see how food is prepared?",
    answer: "Yes! You can book a visit by emailing us. We'll reserve a slot for you to: • Watch the food preparation process. • Enjoy a fresh meal at our private dining space. It would be our pleasure to host you."
  }
];