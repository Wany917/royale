// types/product-types.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  created_at: string;
  updated_at: string;
  preset_code: string;
  is_vip: boolean;
  features?: string[];
}
