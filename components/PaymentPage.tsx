import React, { useEffect } from 'react';
import { Button } from './Button';
import { UserData } from '../types';

interface PaymentPageProps {
  userData: UserData;
  onSuccess: () => void;
  onBack: () => void;
}

// Declaration for Paystack inline
declare global {
  interface Window {
    PaystackPop: any;
  }
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ userData, onSuccess, onBack }) => {
  const AMOUNT_NAIRA = 12000;
  const AMOUNT_KOBO = AMOUNT_NAIRA * 100;
  const LIVE_KEY = "pk_live_21ad8f84a4b6a5d34c6d57dd516aafcc95f90e8c"; 

  useEffect(() => {
    // --- THE INTERCEPTOR (Force Iframe Permissions) ---
    // We use two strategies to ensure the Paystack iframe gets the 'allow="clipboard-write"' attribute
    // BEFORE the browser restricts it.

    // STRATEGY 1: Monkey Patch document.createElement
    // This catches the iframe creation at the exact moment of instantiation, before it even exists in the DOM.
    // This is the strongest fix for mobile browsers.
    const originalCreateElement = document.createElement;
    
    // Using 'any' to bypass strict TS overload matching for this specific patch
    document.createElement = function(tagName: string, options?: any) {
      const element = originalCreateElement.call(document, tagName, options);
      // Check if the created element is an iframe
      if (tagName && typeof tagName === 'string' && tagName.toLowerCase() === 'iframe') {
        try {
          element.setAttribute('allow', 'clipboard-write; payment; microphone; camera');
        } catch (e) {
          console.warn("Failed to set attribute on iframe creation", e);
        }
      }
      return element;
    } as any;

    // STRATEGY 2: MutationObserver
    // This watches the DOM for nodes added via other methods (like innerHTML) or if the patch is bypassed.
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is an iframe
          if (node.nodeName === 'IFRAME') {
            const iframe = node as HTMLIFrameElement;
            iframe.setAttribute('allow', 'clipboard-write; payment; microphone; camera');
          } 
          // Check if the added node is a container (div) that contains an iframe
          else if (node.nodeType === 1 && (node as Element).querySelectorAll) {
             const el = node as Element;
             const iframes = el.querySelectorAll('iframe');
             iframes.forEach((iframe) => {
               iframe.setAttribute('allow', 'clipboard-write; payment; microphone; camera');
             });
          }
        });
      });
    });

    // Start observing the body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      // Cleanup: Restore original function and disconnect observer
      document.createElement = originalCreateElement;
      observer.disconnect();
    };
  }, []);

  const handlePayment = () => {
    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: LIVE_KEY,
        email: userData.email,
        amount: AMOUNT_KOBO,
        currency: 'NGN',
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), 
        metadata: {
          custom_fields: [
            {
              display_name: "Mobile Number",
              variable_name: "mobile_number",
              value: userData.phone
            },
            {
              display_name: "Username",
              variable_name: "username",
              value: userData.username
            }
          ]
        },
        callback: function(_response: any) {
          onSuccess();
        },
        onClose: function() {
          // Optional: Handle modal close without payment
        }
      });
      handler.openIframe();
    } else {
      alert("Paystack SDK not loaded. Please refresh.");
    }
  };

  return (
    <div className="min-h-screen bg-stream-dark flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white text-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-emerald-600 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Complete Registration</h2>
            <p className="text-emerald-100">Activate your Stream Africa account</p>
        </div>
        
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-500">Service</span>
                <span className="font-semibold text-gray-800">Stream Africa Onboarding</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-500">User</span>
                <span className="font-semibold text-gray-800">{userData.name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold text-gray-800">{userData.email}</span>
            </div>
            
            <div className="flex justify-between items-center py-4">
                <span className="text-xl font-bold text-gray-700">Total</span>
                <span className="text-3xl font-extrabold text-emerald-600">₦{AMOUNT_NAIRA.toLocaleString()}</span>
            </div>

            <div className="space-y-3">
                <Button onClick={handlePayment} fullWidth className="bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg">
                    Pay Now with Paystack
                </Button>
                <button 
                    onClick={onBack}
                    className="w-full py-3 text-gray-500 font-medium hover:text-gray-800 transition-colors"
                >
                    Cancel and Go Back
                </button>
            </div>
            
            <div className="text-center mt-4">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                    Secured by Paystack
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};