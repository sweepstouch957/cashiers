"use client";

import { useState } from 'react';
import { X, Phone, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';

interface ManualRegistrationModalProps {
  onClose: () => void;
  onRegister: (phoneNumber: string, isNew: boolean) => void;
}

export function ManualRegistrationModal({ onClose, onRegister }: ManualRegistrationModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isNewNumber, setIsNewNumber] = useState(true);

  // Simulate existing numbers database
  const existingNumbers = [
    '(555) 234-5678',
    '(555) 876-5432',
    '(555) 345-6789',
    '(555) 456-7890',
  ];

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = numbers.slice(0, 10);
    
    // Only format when we have complete groups
    // Return plain numbers until we have enough to format
    if (limited.length < 10) {
      return limited;
    } else {
      // Format as (XXX) XXX-XXXX only when complete
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    
    // Check if we have 10 digits
    const numbers = formatted.replace(/\D/g, '');
    setIsValid(numbers.length === 10);
    
    // Check if the number is new
    setIsNewNumber(!existingNumbers.includes(formatted));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      setShowSuccess(true);
      setTimeout(() => {
        onRegister(phoneNumber, isNewNumber);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden">
        {!showSuccess ? (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-white">Register Customer</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <p className="text-muted-foreground text-sm mb-4">
                Enter the customer's phone number to register them and earn 1 point.
              </p>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="(555) 123-4567"
                    className="w-full pl-11 pr-4 py-3 border-2 border-border rounded-lg focus:border-[#FC0680] focus:outline-none transition-colors text-foreground"
                    autoFocus
                  />
                </div>
                {phoneNumber && !isValid && (
                  <p className="text-xs text-red-500 mt-1">
                    Please enter a valid 10-digit phone number
                  </p>
                )}
                {phoneNumber && isValid && !isNewNumber && (
                  <div className="flex items-center gap-1.5 mt-2 text-orange-600 text-xs">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Existing number - No points will be earned</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="flex-1 bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] text-white py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  Register
                </button>
              </div>
            </form>
          </>
        ) : (
          // Success State
          <div className="p-8 text-center">
            {isNewNumber ? (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-foreground mb-2">Successfully Registered!</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Customer: {phoneNumber}
                </p>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium text-sm">New Number</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#FC0680]/10 text-[#FC0680] px-4 py-2 rounded-full">
                  <span className="font-medium">+1 Point Earned</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-12 h-12 text-orange-500" />
                </div>
                <h3 className="text-foreground mb-2">Registration Recorded</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Customer: {phoneNumber}
                </p>
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium text-sm">Existing Number</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  No points earned - Number already registered
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}