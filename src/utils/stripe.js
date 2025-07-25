import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// In production, you'd use environment variables
const stripePublishableKey = 'pk_test_your_stripe_publishable_key_here';
export const stripePromise = loadStripe(stripePublishableKey);

// Subscription plans configuration
export const subscriptionPlans = {
  starter: {
    priceId: 'price_starter_monthly', // Replace with actual Stripe price ID
    name: 'Starter Pack',
    price: 49,
    features: ['4 craft beers', 'Tasting notes', 'Free shipping']
  },
  premium: {
    priceId: 'price_premium_monthly', // Replace with actual Stripe price ID
    name: 'Premium Selection', 
    price: 69,
    features: ['6 premium beers', 'Exclusive releases', 'Member discounts']
  },
  connoisseur: {
    priceId: 'price_connoisseur_monthly', // Replace with actual Stripe price ID
    name: 'Connoisseur Collection',
    price: 89,
    features: ['8 rare beers', 'Virtual tastings', 'Exclusive merchandise']
  }
};

// Create checkout session for subscriptions
export const createSubscriptionCheckout = async (planId) => {
  const plan = subscriptionPlans[planId];
  if (!plan) {
    throw new Error('Invalid subscription plan');
  }

  try {
    // In a real app, this would call your backend API
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: plan.priceId,
        mode: 'subscription',
        successUrl: `${window.location.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/subscription`
      }),
    });

    const session = await response.json();
    
    if (session.error) {
      throw new Error(session.error);
    }

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Create checkout session for one-time purchases
export const createProductCheckout = async (products) => {
  try {
    // In a real app, this would call your backend API
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lineItems: products.map(product => ({
          price_data: {
            currency: 'nzd',
            product_data: {
              name: product.name,
              description: `${product.brewery} - ${product.style}`,
              images: [product.image],
            },
            unit_amount: Math.round(product.price * 100), // Convert to cents
          },
          quantity: product.quantity || 1,
        })),
        mode: 'payment',
        successUrl: `${window.location.origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/shop`
      }),
    });

    const session = await response.json();
    
    if (session.error) {
      throw new Error(session.error);
    }

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Mock backend response for demo purposes
// In production, remove this and implement proper backend
if (typeof window !== 'undefined') {
  window.mockStripeCheckout = true;
}