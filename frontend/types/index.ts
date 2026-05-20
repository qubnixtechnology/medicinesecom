// export interface Product {
//   id: string;
//   name: string;
//   slug: string;
//   category: string;
//   categorySlug: string;
//   brand: string;
//   price: number;
//   originalPrice?: number;
//   discount?: number;
//   description: string;
//   benefits: string[];
//   composition?: string;
//   dosage?: string;
//   usage?: string;
//   indications?: string[];
//   images: string[];
//   rating: number;
//   reviews: number;
//   inStock: boolean;
//   isPrescriptionRequired: boolean;
//   volume?: string;
//   flavour?: string;
//   ageGroup?: string;
// }

// export interface CartItem extends Product {
//   quantity: number;
// }

// export interface Category {
//   id: string;
//   name: string;
//   slug: string;
//   icon?: string;
//   count: number;
// }

// export interface Brand {
//   id: string;
//   name: string;
//   slug: string;
//   logo?: string;
//   count: number;
// }

export interface Product {
  id: number | string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  benefits: string[];
  composition?: string;
  dosage?: string;
  usage?: string;
  indications?: string[];
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isPrescriptionRequired: boolean;
  volume?: string;
  flavour?: string;
  ageGroup?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  count: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  count: number;
}