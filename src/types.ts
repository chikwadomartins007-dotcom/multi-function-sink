export interface PricingTier {
  quantity: number;
  label: string;
  badge?: string;
  unitPrice: number;
  totalPrice: number;
  originalUnitPrice: number;
  originalTotalPrice: number;
  savings: number;
  isPopular?: boolean;
  isBestValue?: boolean;
}

export interface PricingCalculation {
  quantity: number;
  unitPrice: number;
  subtotal: number;
  originalUnitPrice: number;
  originalTotal: number;
  savings: number;
  discountPerUnit: number;
  formattedUnitPrice: string;
  formattedSubtotal: string;
  formattedOriginalTotal: string;
  formattedSavings: string;
}

export interface ProductImageItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: 'hero' | 'gallery' | 'feature' | 'lifestyle' | 'accessories';
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  alternativePhone: string;
  email: string;
  deliveryAddress: string;
  state: string;
  city: string;
  quantity: number;
  preferredDeliveryOption: 'standard' | 'priority';
  notes?: string;
  unitPrice: number;
  totalPrice: number;
  savings: number;
  orderDate: string;
  orderId: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BenefitItem {
  number: string;
  title: string;
  description: string;
  highlight: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
}
