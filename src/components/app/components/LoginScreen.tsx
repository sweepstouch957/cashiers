"use client";

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const logo = '/assets/8750bb9a23d750ca362e5565b58d2d4ce0cb21c4.png';


interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [cashierCode, setCashierCode] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Check if the input contains any non-numeric characters
    if (value && !/^\d*$/.test(value)) {
      setShowWarning(true);
      return; // Don't update the value if it contains letters
    }
    
    setShowWarning(false);
    setCashierCode(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#FC0680] to-[#FF4DA6] p-6">
      <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="w-56 h-56 flex items-center justify-center mx-auto mb-6">
            <img src={logo} alt="Sweeps Touch" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          <h1 className="text-white text-2xl font-semibold mb-3">Cashier Rewards</h1>
          <p className="text-white/90 text-base">Enter your cashier code to start earning</p>
        </div>

        {/* Login Form */}
        <div className="w-full bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-center mb-8 text-foreground text-xl font-semibold">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="cashierCode" className="block mb-3 text-foreground text-center font-medium">
                Cashier Code
              </label>
              <input
                id="cashierCode"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                value={cashierCode}
                onChange={handleCodeChange}
                className={`w-full px-4 py-4 bg-input-background rounded-xl border-2 transition-all text-center text-xl tracking-wider font-medium ${
                  showWarning 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-border focus:ring-[#FC0680]'
                } focus:outline-none focus:ring-2`}
                placeholder="Enter your code"
                required
              />
              {showWarning && (
                <div className="flex items-center justify-center gap-2 mt-3 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p>Please insert your cashier code (numbers only)</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FC0680] hover:bg-[#C90566] text-white py-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-98 text-lg font-semibold"
            >
              Login
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-white/90">
          <p className="text-base font-medium">Start earning rewards today!</p>
        </div>
      </div>
    </div>
  );
}