import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { UserData } from '../types';
import { PAYMENT_MODE, OPAY_PUBLIC_KEY, OPAY_MERCHANT_ID, OPAY_API_URL, BANK_DETAILS, THEME_COLOR, PAYMENT_TIMER_MINUTES, SUPPORT_CONTACT } from '../config';
import { CustomAlert } from './CustomAlert';
import { GoogleGenAI } from "@google/genai";

interface PaymentPageProps {
  userData: UserData;
  onSuccess: (reference: string, bankInfo?: string) => void;
  onBack: () => void;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ userData, onSuccess, onBack }) => {
  const AMOUNT_NAIRA = 12000;
  const AMOUNT_KOBO = AMOUNT_NAIRA * 100;
  const LIVE_KEY = "pk_live_21ad8f84a4b6a5d34c6d57dd516aafcc95f90e8c"; 
  
  const [activeTab, setActiveTab] = useState<'CARD' | 'TRANSFER' | 'OPAY'>(
    PAYMENT_MODE === 'TRUE' ? 'CARD' : 'TRANSFER'
  );
  
  const [selectedBankIndex, setSelectedBankIndex] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [loadingOpay, setLoadingOpay] = useState(false);
  const [alertState, setAlertState] = useState<{show: boolean, title: string, message: string, type: 'info'|'error'|'success'}>({show: false, title:'', message:'', type:'info'});
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(PAYMENT_TIMER_MINUTES * 60);

  // Verification State (Image Based)
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMsg, setVerificationMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isBlue = THEME_COLOR === 'BLUE';

  const showAlert = (title: string, message: string, type: 'info'|'error'|'success' = 'info') => {
      setAlertState({ show: true, title, message, type });
  };

  // Timer Logic
  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    
    // Only run timer if we are in Transfer mode
    if (activeTab === 'TRANSFER') {
        if (timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else {
            // Timer expired
            showAlert("Session Expired", "Your payment session has timed out. Please refresh to try again.", "error");
        }
    }

    return () => {
        if (timerId) clearInterval(timerId);
    };
  }, [activeTab, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePaystack = () => {
    const reference = "STREAM-" + Math.floor((Math.random() * 1000000000) + 1);
    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: LIVE_KEY,
        email: userData.email,
        amount: AMOUNT_KOBO,
        currency: 'NGN',
        ref: reference, 
        metadata: {
          custom_fields: [
            { display_name: "Mobile Number", variable_name: "mobile_number", value: userData.phone },
            { display_name: "Username", variable_name: "username", value: userData.username }
          ]
        },
        callback: function(response: any) {
          onSuccess(response.reference || reference);
        },
      });
      handler.openIframe();
    } else {
      showAlert("System Error", "Paystack SDK not loaded. Please refresh the page.", "error");
    }
  };

  const copyToClipboard = (text: string, label: string, index: number) => {
    // AUTO-SELECT LOGIC: When copying, automatically select this bank
    setSelectedBankIndex(index);
    
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleOpayCheckout = async () => {
      setLoadingOpay(true);
      const reference = "STREAM-" + Math.floor((Math.random() * 1000000000) + 1);
      try {
        const payload = {
          country: "NG",
          reference: reference,
          amount: {
            total: AMOUNT_KOBO.toString(),
            currency: "NGN"
          },
          returnUrl: window.location.origin, 
          callbackUrl: "https://your-site.com/api/opay-webhook",
          userInfo: {
            userEmail: userData.email,
            userName: userData.name,
            userMobile: userData.phone
          },
          product: {
            name: "Stream Africa Activation",
            description: "Lifetime Access Activation Fee"
          },
          payMethod: "BankCard"
        };

        const response = await fetch(OPAY_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPAY_PUBLIC_KEY}`,
            "MerchantId": OPAY_MERCHANT_ID
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (data.code === "00000" && data.data && data.data.cashierUrl) {
           window.location.href = data.data.cashierUrl;
        } else {
           showAlert("Payment Error", `OPay Initialization Failed: ${data.message || 'Unknown error'}`, 'error');
        }
      } catch (error) {
        showAlert("Connection Error", "Failed to connect to OPay. This might be a Network or CORS issue.", 'error');
      } finally {
        setLoadingOpay(false);
      }
  };

  // --- IMAGE HANDLING ---

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProofImage(file);
      setImagePreview(URL.createObjectURL(file));
      setIsVerified(false);
      setVerificationMsg('');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setProofImage(file);
      setImagePreview(URL.createObjectURL(file));
      setIsVerified(false);
      setVerificationMsg('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const confirmPaymentReceipt = async () => {
    if (!proofImage) {
        showAlert("Proof Required", "Please upload the payment receipt first.", "error");
        return;
    }

    if (timeLeft <= 0) {
        showAlert("Session Expired", "Payment session expired. Please restart the process.", "error");
        return;
    }

    setIsVerifying(true);
    setVerificationMsg('');

    try {
        const fullBase64 = await fileToBase64(proofImage);
        
        // Anti-Fraud: Hash the image base64
        const usedProofs = JSON.parse(localStorage.getItem('stream_used_proofs') || '[]');
        const proofHash = btoa(fullBase64.slice(0, 100) + proofImage.name + proofImage.size);
        
        if (usedProofs.includes(proofHash)) {
             throw new Error("Duplicate Receipt: This receipt has already been used.");
        }

        const selectedBank = BANK_DETAILS[selectedBankIndex];
        const apiKey = process.env.API_KEY;
        
        if (!apiKey) {
            throw new Error("Configuration Error: System is offline. Please contact support.");
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });
        
        // Get strict current time for prompt
        const now = new Date();
        const currentTimeString = now.toLocaleString('en-NG', { 
           weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
           hour: 'numeric', minute: 'numeric', hour12: true 
        });

        // Strip base64 prefix
        const match = fullBase64.match(/^data:(.+);base64,(.+)$/);
        const mimeType = match ? match[1] : 'image/jpeg';
        const base64Data = match ? match[2] : fullBase64.split(',')[1];

        // STRICT Prompt with Time Validation
        const promptText = `
        System Timestamp: ${currentTimeString}
        
        Verify this payment receipt image.
        
        MANDATORY CHECKS:
        1. Amount: ~12,000 NGN
        2. Status: Success / Successful / Sent
        3. Recipient: ${selectedBank.bankName} / ${selectedBank.accountNumber}
        4. TIME VALIDATION: The receipt time must be within the last 30 minutes of the System Timestamp above. If the date is not TODAY (${now.getDate()}), reject it.

        Return ONLY JSON:
        { "verified": boolean, "reason": "User-facing status message" }
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { inlineData: { mimeType: mimeType, data: base64Data } },
                    { text: promptText }
                ]
            },
            config: { responseMimeType: "application/json" }
        });

        const resultText = response.text || "{}";
        const result = JSON.parse(resultText);

        if (result.verified) {
            setIsVerified(true);
            setVerificationMsg("Payment Confirmed ✅");
            localStorage.setItem('stream_used_proofs', JSON.stringify([...usedProofs, proofHash]));
        } else {
            setIsVerified(false);
            setVerificationMsg(`Verification Failed: ${result.reason}`);
            showAlert("Verification Failed", result.reason, "error");
        }

    } catch (error: any) {
        console.error("Verification Error:", error);
        setIsVerified(false);
        setVerificationMsg('Could not verify receipt. Please ensure image is clear.');
        showAlert("System Error", error.message || "Please upload a clear receipt image.", "error");
    } finally {
        setIsVerifying(false);
    }
  };

  const handleTransferDone = () => {
      // Check environment key
      if (!isVerified && process.env.API_KEY) {
          showAlert("Confirmation Required", "Please click 'Confirm Payment' to verify your receipt first.", "error");
          return;
      }
      
      const bank = BANK_DETAILS[selectedBankIndex];
      const bankInfo = `${bank.bankName} (${bank.accountNumber})`;
      const refInfo = proofImage ? `Image: ${proofImage.name}` : 'Manual Transfer';
      onSuccess(refInfo, bankInfo);
  };

  const handleContactSupport = () => {
     if (SUPPORT_CONTACT.method === 'WHATSAPP') {
       const message = encodeURIComponent("Hello Admin, I am having problems with the transfer.");
       window.location.href = `https://wa.me/${SUPPORT_CONTACT.whatsappNumber}?text=${message}`;
     } else {
       window.location.href = SUPPORT_CONTACT.telegramUrl;
     }
  };

  const showPaystack = PAYMENT_MODE === 'TRUE';
  const showTransfer = PAYMENT_MODE === 'FALSE' || PAYMENT_MODE === 'NEUTRAL';
  const showOpay = PAYMENT_MODE === 'NEUTRAL';

  return (
    <div className="min-h-screen bg-stream-dark flex flex-col items-center justify-center p-4">
      <CustomAlert 
        isOpen={alertState.show}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        onClose={() => setAlertState(prev => ({...prev, show: false}))}
      />
      
      <div className="max-w-lg w-full bg-white text-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* HEADER: Updated to stream-dark to ensure white text is visible */}
        <div className="bg-stream-dark p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Complete Activation</h2>
            <p className="text-white/80">Unlock Lifetime Access</p>
        </div>
        
        <div className="p-6">
            <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-500 font-medium">Amount to Pay</span>
                {/* AMOUNT: Fixed visibility by using text-teal-700 instead of white */}
                <span className="text-2xl font-extrabold text-teal-700">₦{AMOUNT_NAIRA.toLocaleString()}</span>
            </div>

            {/* Method Toggles */}
            <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                {showPaystack && (
                    <button 
                        onClick={() => setActiveTab('CARD')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'CARD' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Card / Paystack
                    </button>
                )}
                {showTransfer && (
                    <button 
                        onClick={() => setActiveTab('TRANSFER')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'TRANSFER' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Bank Transfer
                    </button>
                )}
                {showOpay && (
                    <button 
                        onClick={() => setActiveTab('OPAY')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'OPAY' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Opay
                    </button>
                )}
            </div>

            {/* PAYSTACK VIEW */}
            {activeTab === 'CARD' && showPaystack && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <p className="text-sm text-center text-gray-500">
                        Secure instant payment via Debit Card, USSD, or Bank Transfer via Paystack.
                    </p>
                    {/* Button text is black by default now, so this is fine */}
                    <Button onClick={handlePaystack} fullWidth className="py-4 text-lg">
                        Pay ₦{AMOUNT_NAIRA.toLocaleString()} Now
                    </Button>
                </div>
            )}

            {/* TRANSFER VIEW */}
            {activeTab === 'TRANSFER' && showTransfer && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    
                    {/* Countdown Timer Badge */}
                    <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg p-3 animate-pulse">
                        <span className="text-red-600 text-sm font-semibold flex items-center gap-2">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           Session Expires In:
                        </span>
                        <span className="text-red-600 text-lg font-mono font-bold tracking-wider">
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-md">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                            <p className="text-xs text-red-700 font-bold leading-relaxed">
                                IMPORTANT: Do not make payments using OPay Bank. Transfers from OPay are not supported.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-center text-gray-500 mb-2">
                        Click on a bank account to select it, then make the transfer.
                    </p>
                    <div className="space-y-4">
                        {BANK_DETAILS.map((bank, index) => (
                            <div 
                                key={index} 
                                onClick={() => setSelectedBankIndex(index)}
                                className={`p-4 rounded-xl relative cursor-pointer border-2 transition-all ${
                                    selectedBankIndex === index 
                                    ? `border-teal-500 bg-teal-50 shadow-md` 
                                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                                }`}
                            >
                                {selectedBankIndex === index && (
                                    <div className="absolute top-3 right-3">
                                        <div className="bg-teal-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            Selected
                                        </div>
                                    </div>
                                )}
                                <div className="mb-2">
                                    <p className="text-xs text-gray-500 uppercase tracking-tight">Bank Name</p>
                                    <p className="font-bold text-gray-800">{bank.bankName}</p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-xs text-gray-500 uppercase tracking-tight">Account Number</p>
                                    <div className="flex items-center gap-2">
                                        <p className={`font-mono text-xl font-bold ${selectedBankIndex === index ? 'text-teal-700' : 'text-gray-700'} tracking-wider`}>{bank.accountNumber}</p>
                                        <button 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                // Auto-select this bank when copy is clicked
                                                copyToClipboard(bank.accountNumber, `acc-${index}`, index); 
                                            }}
                                            className="p-1.5 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                                        >
                                            {copied === `acc-${index}` ? (
                                                <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            ) : (
                                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-tight">Account Name</p>
                                    <p className="font-medium text-gray-800">{bank.accountName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                         <p className="text-xs text-yellow-800 leading-relaxed">
                             <strong>Notice:</strong> Please confirm you have sent ₦{AMOUNT_NAIRA.toLocaleString()} to <strong>{BANK_DETAILS[selectedBankIndex].bankName}</strong> before uploading proof.
                         </p>
                    </div>

                    {/* Verification Section (Drag & Drop) */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 text-center relative transition-all hover:border-blue-400"
                         onDragOver={handleDragOver}
                         onDrop={handleDrop}>
                        
                        <h4 className="font-bold text-gray-700 mb-2 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            Instant Payment Confirmation
                        </h4>
                        
                        {!imagePreview ? (
                            <div className="flex flex-col items-center justify-center py-4 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Drag & Drop Screenshot here</p>
                                <p className="text-xs text-gray-400 mt-1">or click to upload receipt</p>
                            </div>
                        ) : (
                            <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                <img src={imagePreview} alt="Payment Proof" className="w-full h-auto max-h-48 object-cover opacity-80" />
                                <button 
                                    onClick={() => { setProofImage(null); setImagePreview(null); setIsVerified(false); }}
                                    className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs py-1">
                                    {proofImage?.name}
                                </div>
                            </div>
                        )}

                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileSelect} 
                            accept="image/*" 
                            className="hidden" 
                        />

                        {verificationMsg && (
                            <div className={`text-xs font-bold mt-3 p-2 rounded ${isVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {verificationMsg}
                            </div>
                        )}

                        <div className="mt-4">
                            <Button 
                                onClick={confirmPaymentReceipt}
                                fullWidth 
                                className={`py-3 text-sm !bg-gray-800 hover:!bg-black`}
                                disabled={isVerifying || isVerified || timeLeft <= 0 || !proofImage}
                            >
                                {isVerifying ? 'Verifying...' : isVerified ? 'Confirmed' : 'Confirm Payment'}
                            </Button>
                        </div>
                    </div>

                    <Button 
                        onClick={handleTransferDone} 
                        fullWidth 
                        className={`py-4 text-lg transition-all duration-300 ${!isVerified ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                        disabled={!isVerified || timeLeft <= 0}
                    >
                        {isVerified ? 'I Have Made The Transfer' : 'Verify Receipt to Unlock'}
                    </Button>

                    {/* Contact Admin Link */}
                    <div className="text-center pt-2">
                        <button 
                            onClick={handleContactSupport}
                            className={`text-sm font-medium hover:underline ${isBlue ? 'text-sky-600' : 'text-emerald-600'} flex items-center justify-center gap-1 mx-auto`}
                        >
                            <span>Having problems with transactions? Contact admin</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* OPAY VIEW */}
            {activeTab === 'OPAY' && showOpay && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center">
                         <div className={`w-16 h-16 ${isBlue ? 'bg-sky-500' : 'bg-blue-500'} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg`}>
                             OPay
                         </div>
                         <h3 className="text-gray-800 font-bold mb-2">Pay with Opay Wallet</h3>
                         <p className="text-sm text-gray-500 mb-4">
                             Seamless Opay-to-Opay checkout. Click below to authorize securely.
                         </p>
                     </div>
                     <Button 
                        onClick={handleOpayCheckout} 
                        fullWidth 
                        disabled={loadingOpay}
                        className={`py-4 text-lg !bg-blue-500 hover:!bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed`}
                     >
                        {loadingOpay ? 'Initializing...' : 'Pay with Opay'}
                    </Button>
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100">
                <button 
                    onClick={onBack}
                    className="w-full py-3 text-gray-500 font-medium hover:text-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    <span>Cancel and Go Back</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
