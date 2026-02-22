"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";

const logo = "/assets/8750bb9a23d750ca362e5565b58d2d4ce0cb21c4.png";

export function LoginScreen() {
  const { login, error: authError } = useAuth();
  const [cashierCode, setCashierCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalError(null);
    setCashierCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cashierCode.trim()) return;

    setIsSubmitting(true);
    setLocalError(null);

    try {
      await login(undefined, undefined, cashierCode);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al iniciar sesión.";
      setLocalError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = localError || authError;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#FC0680] to-[#FF4DA6] p-6">
      <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="w-56 h-56 flex items-center justify-center mx-auto mb-6">
            <img
              src={logo}
              alt="Sweeps Touch"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-white text-2xl font-semibold mb-3">
            Cashier Rewards
          </h1>
          <p className="text-white/90 text-base">
            Enter your cashier code to start earning
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-center mb-8 text-foreground text-xl font-semibold">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="cashierCode"
                className="block mb-3 text-foreground text-center font-medium"
              >
                Cashier Code
              </label>

              <input
                id="cashierCode"
                type="text"
                value={cashierCode}
                onChange={handleCodeChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-4 bg-input-background rounded-xl border-2 transition-all text-center text-xl tracking-wider font-medium ${displayError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-border focus:ring-[#FC0680]"
                  } focus:outline-none focus:ring-2 disabled:opacity-50`}
                placeholder="Enter your code"
                required
              />

              {displayError && (
                <div className="flex items-center justify-center gap-2 mt-3 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p>{displayError}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FC0680] hover:bg-[#C90566] text-white py-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-98 text-lg font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
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