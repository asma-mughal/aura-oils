// Product and collection data for the oils store

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  variants?: {
    id: string;
    name: string;
    price: number;
  }[];
  benefits?: string[];
  ingredients?: string[];
  howToUse?: string;
  rating: number;
  reviewCount: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export const collections: Collection[] = [
  {
    id: "1",
    name: "Hair Oils",
    slug: "hair-oil",
    description: "Nourish and strengthen your hair with our premium organic hair oils",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop",
    productCount: 4,
  },
  {
    id: "2",
    name: "Essential Oils",
    slug: "essential-oils",
    description: "Pure, therapeutic-grade essential oils for aromatherapy and wellness",
    image: "https://images.unsplash.com/photo-1600857062241-98c0c7dbfa1f?w=800&auto=format&fit=crop",
    productCount: 6,
  },
  {
    id: "3",
    name: "Body Oils",
    slug: "body-oils",
    description: "Luxurious body oils for deep hydration and silky smooth skin",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop",
    productCount: 4,
  },
  {
    id: "4",
    name: "Bundles",
    slug: "bundles",
    description: "Curated oil bundles at special prices for complete care",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&auto=format&fit=crop",
    productCount: 3,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Miracle Hair Oil",
    slug: "organic-miracle-hair-oil",
    description: "A powerful blend of over 15 natural oils and herbs designed to promote hair growth, reduce hair fall, and add incredible shine. This miracle oil penetrates deep into the scalp to nourish hair follicles and strengthen hair from root to tip.",
    shortDescription: "Premium organic hair oil for growth and shine",
    price: 2500,
    compareAtPrice: 3000,
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600857062241-98c0c7dbfa1f?w=800&auto=format&fit=crop",
    ],
    category: "hair-oil",
    tags: ["bestseller", "organic", "hair-growth"],
    inStock: true,
    variants: [
      { id: "1a", name: "100ml", price: 2500 },
      { id: "1b", name: "200ml", price: 4500 },
    ],
    benefits: [
      "Promotes natural hair growth",
      "Reduces hair fall significantly",
      "Adds shine and softness",
      "Prevents dandruff and scalp issues",
    ],
    ingredients: ["Coconut Oil", "Argan Oil", "Castor Oil", "Bhringraj", "Amla", "Brahmi", "Hibiscus"],
    howToUse: "Apply generously to scalp and hair. Massage for 5-10 minutes. Leave for at least 2 hours or overnight for best results. Wash with mild shampoo.",
    rating: 4.8,
    reviewCount: 156,
  },
  {
    id: "2",
    name: "Pure Argan Oil",
    slug: "pure-argan-oil",
    description: "100% pure, cold-pressed Moroccan Argan Oil. Known as 'liquid gold', this precious oil is rich in vitamin E and fatty acids, perfect for hair, skin, and nails.",
    shortDescription: "Cold-pressed Moroccan Argan Oil",
    price: 3500,
    images: [
      "https://images.unsplash.com/photo-1600857062241-98c0c7dbfa1f?w=800&auto=format&fit=crop",
    ],
    category: "essential-oils",
    tags: ["pure", "premium", "multi-use"],
    inStock: true,
    benefits: [
      "Deeply moisturizes hair and skin",
      "Reduces frizz and split ends",
      "Anti-aging properties for skin",
      "Strengthens brittle nails",
    ],
    ingredients: ["100% Pure Argania Spinosa Kernel Oil"],
    howToUse: "Apply a few drops to damp hair or clean skin. Can be used daily.",
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Lavender Essential Oil",
    slug: "lavender-essential-oil",
    description: "Premium therapeutic-grade lavender essential oil, steam-distilled from the finest French lavender flowers. Perfect for aromatherapy, relaxation, and natural skincare.",
    shortDescription: "Therapeutic-grade French lavender oil",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop",
    ],
    category: "essential-oils",
    tags: ["aromatherapy", "relaxation", "therapeutic"],
    inStock: true,
    benefits: [
      "Promotes relaxation and sleep",
      "Soothes skin irritations",
      "Natural stress relief",
      "Pleasant, calming scent",
    ],
    ingredients: ["100% Pure Lavandula Angustifolia Oil"],
    howToUse: "Add a few drops to diffuser for aromatherapy. Dilute with carrier oil for topical use.",
    rating: 4.7,
    reviewCount: 67,
  },
  {
    id: "4",
    name: "Rosemary Hair Growth Oil",
    slug: "rosemary-hair-growth-oil",
    description: "Specially formulated rosemary-infused oil proven to stimulate hair growth. Clinical studies show rosemary oil can be as effective as minoxidil for hair growth.",
    shortDescription: "Rosemary-infused hair growth formula",
    price: 2200,
    compareAtPrice: 2800,
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop",
    ],
    category: "hair-oil",
    tags: ["hair-growth", "rosemary", "natural"],
    inStock: true,
    variants: [
      { id: "4a", name: "50ml", price: 2200 },
      { id: "4b", name: "100ml", price: 3800 },
    ],
    benefits: [
      "Stimulates hair follicles",
      "Improves circulation to scalp",
      "Prevents premature greying",
      "Thickens hair naturally",
    ],
    ingredients: ["Rosemary Essential Oil", "Jojoba Oil", "Vitamin E", "Peppermint Oil"],
    howToUse: "Apply to scalp daily. Massage for 5 minutes. No need to rinse.",
    rating: 4.6,
    reviewCount: 112,
  },
  {
    id: "5",
    name: "Luxury Body Oil Blend",
    slug: "luxury-body-oil-blend",
    description: "An indulgent blend of sweet almond, jojoba, and rose hip oils enriched with vitamin E. This luxurious body oil absorbs quickly, leaving skin silky smooth without any greasy residue.",
    shortDescription: "Luxurious quick-absorbing body oil",
    price: 2800,
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop",
    ],
    category: "body-oils",
    tags: ["luxury", "moisturizing", "body"],
    inStock: true,
    benefits: [
      "Deep hydration for all skin types",
      "Quick-absorbing formula",
      "Improves skin elasticity",
      "Subtle, natural fragrance",
    ],
    ingredients: ["Sweet Almond Oil", "Jojoba Oil", "Rosehip Oil", "Vitamin E", "Rose Extract"],
    howToUse: "Apply to damp skin after shower. Massage until absorbed.",
    rating: 4.8,
    reviewCount: 78,
  },
  {
    id: "6",
    name: "Complete Hair Care Bundle",
    slug: "complete-hair-care-bundle",
    description: "Everything you need for perfect hair! This bundle includes our bestselling Miracle Hair Oil, Rosemary Growth Oil, and a scalp massager. Save 20% compared to buying individually.",
    shortDescription: "Complete hair care set with 20% savings",
    price: 5500,
    compareAtPrice: 7000,
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&auto=format&fit=crop",
    ],
    category: "bundles",
    tags: ["bundle", "bestseller", "value"],
    inStock: true,
    benefits: [
      "Complete hair care solution",
      "20% savings vs individual purchase",
      "Free scalp massager included",
      "Perfect gift option",
    ],
    rating: 4.9,
    reviewCount: 45,
  },
  {
    id: "7",
    name: "Tea Tree Essential Oil",
    slug: "tea-tree-essential-oil",
    description: "Pure Australian tea tree oil with powerful antibacterial and antifungal properties. Essential for natural skincare, scalp health, and household cleaning.",
    shortDescription: "Pure Australian tea tree oil",
    price: 1500,
    images: [
      "https://images.unsplash.com/photo-1600857062241-98c0c7dbfa1f?w=800&auto=format&fit=crop",
    ],
    category: "essential-oils",
    tags: ["antibacterial", "scalp-health", "pure"],
    inStock: true,
    benefits: [
      "Natural antibacterial properties",
      "Clears acne and blemishes",
      "Treats dandruff effectively",
      "Versatile household uses",
    ],
    ingredients: ["100% Pure Melaleuca Alternifolia Leaf Oil"],
    howToUse: "Always dilute before topical use. Add to shampoo for scalp treatment.",
    rating: 4.7,
    reviewCount: 93,
  },
  {
    id: "8",
    name: "Coconut & Hibiscus Hair Oil",
    slug: "coconut-hibiscus-hair-oil",
    description: "Traditional Ayurvedic formula combining pure coconut oil with hibiscus flower extract. This time-tested recipe prevents hair breakage and promotes thick, lustrous hair.",
    shortDescription: "Ayurvedic coconut & hibiscus formula",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop",
    ],
    category: "hair-oil",
    tags: ["ayurvedic", "coconut", "traditional"],
    inStock: true,
    variants: [
      { id: "8a", name: "100ml", price: 1800 },
      { id: "8b", name: "250ml", price: 3500 },
    ],
    benefits: [
      "Prevents hair breakage",
      "Adds natural shine",
      "Conditions deeply",
      "Pleasant floral scent",
    ],
    ingredients: ["Virgin Coconut Oil", "Hibiscus Extract", "Curry Leaves", "Fenugreek"],
    howToUse: "Warm slightly and apply to scalp and hair. Leave for 1-2 hours before washing.",
    rating: 4.5,
    reviewCount: 134,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};



export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((c) => c.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.tags.includes("bestseller")).slice(0, 4);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.includes(lowerQuery))
  );
};
