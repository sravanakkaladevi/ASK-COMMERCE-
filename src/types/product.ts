export type ProductCategory =
  | "all"
  | "banarasi"
  | "kanjeevaram"
  | "organza"
  | "chanderi"
  | "tussar"
  | "bridal"
  | "gowns"
  | "lehengas"
  | "cocktail"
  | "resort";

export type OccasionType =
  | "Bridal & Wedding"
  | "Festive & Royal"
  | "Cocktail & Reception"
  | "Morning Puja & Rituals"
  | "Sangeet & Soirée"
  | "Everyday Heritage"
  | "Black Tie Evening"
  | "Resort & Soirée"
  | "Cocktail Hours";

export interface SareeProduct {
  id: string;
  name: string;
  subtitle: string;
  tag?: "NEW" | "LIMITED" | "HOT" | "BESTSELLER" | "PURE ZARI" | "ATELIER" | "ATELIER COUTURE" | "LIMITED EDITION";
  price: number;
  mrp: number;
  currency: string;
  fabric: string;
  weaveOrigin?: string;
  zariType?: string;
  embroidery?: string;
  occasion: OccasionType;
  category: ProductCategory;
  description: string;
  details: string[];
  images: string[];
  sizes: string[];
  colors: {
    name: string;
    hex: string;
    imageIndex?: number;
  }[];
  rating: number;
  reviewsCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  craftHours?: number;
  videoUrl?: string;
}

// Alias for backward compatibility
export type Product = SareeProduct;

export interface CartItem {
  id: string;
  product: SareeProduct;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  blouseCustomization?: string;
}

export interface SixMoodItem {
  id: string;
  title: string;
  tagline: string;
  colorHex: string;
  accentColor: string;
  image: string;
  category: ProductCategory;
  count: string;
}

export interface SilkArchiveItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  mrp: number;
  image: string;
  fabric: string;
  tag: string;
  rating: number;
}

export interface SwapperLook {
  id: string;
  title: string;
  price: number;
  mrp: number;
  rating: number;
  reviewsCount: number;
  description: string;
  fabric: string;
  weave: string;
  leadTime: string;
  mainImage: string;
  thumbnails: string[];
  colors: { name: string; hex: string; image: string }[];
  sizes: string[];
}

export interface AmbientMood {
  id: string;
  title: string;
  subtitle: string;
  ragaName: string;
  freq: number;
  accentColor: string;
  heroImage: string;
  gallery: { image: string; title: string; price: number }[];
}

export interface StoryArticle {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  image: string;
  author: string;
  category: string;
  date: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  quote: string;
  dressPurchased: string;
  avatar: string;
  verified: boolean;
  date: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  image: string;
  lookNumber: string;
  taggedProductId?: string;
  tagPosition?: { x: number; y: number };
}
