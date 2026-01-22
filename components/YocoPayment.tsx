'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    YocoSDK: any;
  }
}

interface YocoPaymentProps {
  amount: number;
  currency?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function YocoPayment({ amount, currency = 'ZAR', onSuccess, onError }: YocoPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Load Yoco SDK
    const script = document.createElement('script');
    script.src = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!window.YocoSDK) {
      alert('Payment system is loading. Please try again.');
      return;
    }

    setIsLoading(true);

    try {
      const yoco = new window.YocoSDK({
        publicKey: process.env.NEXT_PUBLIC_YOCO_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx', // Replace with actual key
      });

      const result = await yoco.showPopup({
        amountInCents: amount * 100, // Convert to cents
        currency: currency,
        name: 'Vellon 2.0 Pro',
        description: 'Professional CV optimization suite',
        callback: async (result: any) => {
          if (result.error) {
            onError?.(result.error);
            setIsLoading(false);
          } else {
            // Payment successful
            try {
              // Set pro status
              localStorage.setItem('vellon_pro_status', 'active');

              // Call success callback
              onSuccess?.();

              // Redirect to success page
              router.push('/apps/cv-optimizer-pro?upgrade=success');
            } catch (error) {
              console.error('Error processing payment success:', error);
              onError?.(error);
            }
          }
        }
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      onError?.(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="inline-block bg-white text-accent font-bold py-3 px-6 rounded-2xl hover:bg-gray-100 hover:shadow-lg transition-all duration-200 w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          'Upgrade to Pro Now'
        )}
      </button>

      <div className="text-center text-xs text-black">
        <p>Secure payment powered by Yoco</p>
        <p className="mt-1">🔒 SSL Encrypted • 💳 All major cards accepted</p>
      </div>
    </div>
  );
}