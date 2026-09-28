import React, { useState, useEffect, useRef } from 'react';
import { PromotionalBanner } from './components/PromotionalBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductGallery } from './components/ProductGallery';
import { BenefitsSection } from './components/BenefitsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LifestyleSection } from './components/LifestyleSection';
import { CompareSection } from './components/CompareSection';
import { PricingSection } from './components/PricingSection';
import { TrustSection } from './components/TrustSection';
import { FAQSection } from './components/FAQSection';
import { OrderForm } from './components/OrderForm';
import { DeliveryAndPolicySection } from './components/DeliveryAndPolicySection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { QuickOrderPopup } from './components/QuickOrderPopup';
import { QuickOrderModal } from './components/QuickOrderModal';
import { 
  trackDualEvent, 
  generateEventId, 
  PRODUCT_NAME, 
  PRODUCT_ID 
} from './utils/metaPixel';
import { initAttribution } from './utils/attribution';
import { calculateOrderPricing } from './utils/pricing';
import { OrderFormData } from './types';

export default function App() {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [completedOrder, setCompletedOrder] = useState<OrderFormData | null>(null);
  const [isQuickOrderModalOpen, setIsQuickOrderModalOpen] = useState<boolean>(false);

  const hasFiredViewContent = useRef(false);
  const hasFiredInitiateCheckout = useRef(false);
  const quickOrderTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger quick order form modal every 35 seconds
  useEffect(() => {
    if (completedOrder) return;

    // Start 35s countdown whenever modal is closed and no order has been completed yet
    if (!isQuickOrderModalOpen) {
      quickOrderTimerRef.current = setTimeout(() => {
        if (!completedOrder) {
          setIsQuickOrderModalOpen(true);
        }
      }, 35000);
    }

    return () => {
      if (quickOrderTimerRef.current) {
        clearTimeout(quickOrderTimerRef.current);
      }
    };
  }, [isQuickOrderModalOpen, completedOrder]);

  // Initialize Advertising Attribution and fire ViewContent once
  useEffect(() => {
    initAttribution();

    if (!hasFiredViewContent.current) {
      hasFiredViewContent.current = true;
      const viewContentEventId = generateEventId('ViewContent');
      trackDualEvent('ViewContent', {
        content_name: PRODUCT_NAME,
        content_type: 'product',
        content_ids: [PRODUCT_ID],
        currency: 'NGN',
        value: 115000,
      }, { eventId: viewContentEventId });
    }
  }, []);

  const fireInitiateCheckout = (qty: number = 1) => {
    if (hasFiredInitiateCheckout.current) return;
    hasFiredInitiateCheckout.current = true;
    const pricing = calculateOrderPricing(qty);
    const checkoutEventId = generateEventId('InitiateCheckout');
    trackDualEvent('InitiateCheckout', {
      content_name: PRODUCT_NAME,
      content_type: 'product',
      content_ids: [PRODUCT_ID],
      currency: 'NGN',
      value: pricing.subtotal,
      num_items: qty,
    }, { eventId: checkoutEventId });
  };

  const openQuickOrderModal = (qty?: number) => {
    const targetQty = qty && qty >= 1 ? qty : selectedQuantity;
    if (qty && qty >= 1) {
      setSelectedQuantity(targetQty);
    }
    fireInitiateCheckout(targetQty);
    setIsQuickOrderModalOpen(true);
  };

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-600 selection:text-white pb-16 lg:pb-0">
      
      {/* 1. Promotional Banner */}
      <PromotionalBanner onOrderClick={() => openQuickOrderModal()} />

      {/* 2. Top Navigation */}
      <Navbar onOrderClick={() => openQuickOrderModal()} />

      <main>
        {/* 3. Hero Section (Above the Fold) */}
        <HeroSection
          onOrderClick={() => openQuickOrderModal()}
          onExploreGallery={scrollToGallery}
        />

        {/* 4. Product Gallery & Close-up Details */}
        <ProductGallery onOrderClick={() => openQuickOrderModal()} />

        {/* 5. Benefits: Why Your Kitchen Needs This Sink */}
        <BenefitsSection onOrderClick={() => openQuickOrderModal()} />

        {/* 6. How It Works (Wash -> Rinse -> Organize -> Drain) */}
        <HowItWorksSection />

        {/* 7. Lifestyle Showcase (Installed in Modern Kitchens) */}
        <LifestyleSection onOrderClick={() => openQuickOrderModal()} />

        {/* 8. Compare: Luxury Sink vs Standard Sink */}
        <CompareSection onOrderClick={() => openQuickOrderModal()} />

        {/* 9. Pricing & Quantity Discounts Section */}
        <PricingSection onSelectTier={(qty) => openQuickOrderModal(qty)} />

        {/* 9. Trust & Reassurance Section */}
        <TrustSection />

        {/* 10. Frequently Asked Questions */}
        <FAQSection />

        {/* 11. Order Form (Payment on Delivery with Formspree & CAPI tracking) */}
        <OrderForm
          initialQuantity={selectedQuantity}
          onOrderComplete={(order) => setCompletedOrder(order)}
          onInitiateCheckout={() => fireInitiateCheckout(selectedQuantity)}
        />

        {/* 12. Delivery Info, Terms & Conditions & Return Policy */}
        <DeliveryAndPolicySection />

        {/* 13. Final CTA Banner */}
        <FinalCTASection onOrderClick={() => openQuickOrderModal()} />
      </main>

      {/* 14. Footer */}
      <Footer onOrderClick={() => openQuickOrderModal()} />

      {/* 15. Mobile Sticky Bottom CTA Bar */}
      <MobileStickyCTA onOrderClick={() => openQuickOrderModal()} />

      {/* 16. Floating WhatsApp Contact Button */}
      <WhatsAppFloatingButton />

      {/* 17. Quick Order Notification Popup (toast ticker) */}
      <QuickOrderPopup 
        onOrderClick={() => openQuickOrderModal()} 
        onOpenQuickOrderModal={() => openQuickOrderModal()}
      />

      {/* 18. Quick Order Form Pop-up Modal (automatically opens every 35s) */}
      <QuickOrderModal
        isOpen={isQuickOrderModalOpen}
        onClose={() => setIsQuickOrderModalOpen(false)}
        initialQuantity={selectedQuantity}
        onOrderComplete={(order) => {
          setIsQuickOrderModalOpen(false);
          setCompletedOrder(order);
        }}
      />

      {/* 19. Order Confirmation Modal */}
      {completedOrder && (
        <OrderConfirmationModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}

    </div>
  );
}
