import { PricingCalculation, PricingTier } from '../types';

export const ORIGINAL_SINGLE_PRICE = 130000;
export const PROMO_PRICE_1 = 115000;
export const PROMO_PRICE_2 = 110000;
export const PROMO_PRICE_3_PLUS = 105000;

export const formatNaira = (amount: number): string => {
  return '₦' + amount.toLocaleString('en-NG');
};

export const calculateOrderPricing = (quantity: number): PricingCalculation => {
  const safeQty = Math.max(1, Math.floor(quantity || 1));
  let unitPrice = PROMO_PRICE_1;

  if (safeQty === 1) {
    unitPrice = PROMO_PRICE_1;
  } else if (safeQty === 2) {
    unitPrice = PROMO_PRICE_2;
  } else {
    unitPrice = PROMO_PRICE_3_PLUS;
  }

  const subtotal = safeQty * unitPrice;
  const originalTotal = safeQty * ORIGINAL_SINGLE_PRICE;
  const savings = originalTotal - subtotal;
  const discountPerUnit = ORIGINAL_SINGLE_PRICE - unitPrice;

  return {
    quantity: safeQty,
    unitPrice,
    subtotal,
    originalUnitPrice: ORIGINAL_SINGLE_PRICE,
    originalTotal,
    savings,
    discountPerUnit,
    formattedUnitPrice: formatNaira(unitPrice),
    formattedSubtotal: formatNaira(subtotal),
    formattedOriginalTotal: formatNaira(originalTotal),
    formattedSavings: formatNaira(savings),
  };
};

export const PRICING_TIERS: PricingTier[] = [
  {
    quantity: 1,
    label: '1 Piece',
    badge: 'Single Unit',
    unitPrice: 115000,
    totalPrice: 115000,
    originalUnitPrice: 130000,
    originalTotalPrice: 130000,
    savings: 15000,
    isPopular: false,
  },
  {
    quantity: 2,
    label: '2 Pieces',
    badge: 'Save ₦40,000 • Most Popular',
    unitPrice: 110000,
    totalPrice: 220000,
    originalUnitPrice: 130000,
    originalTotalPrice: 260000,
    savings: 40000,
    isPopular: true,
  },
  {
    quantity: 3,
    label: '3 Pieces or More',
    badge: 'Save ₦75,000+ • Best Value',
    unitPrice: 105000,
    totalPrice: 315000,
    originalUnitPrice: 130000,
    originalTotalPrice: 390000,
    savings: 75000,
    isBestValue: true,
  },
];
