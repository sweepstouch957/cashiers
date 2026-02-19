"use client";

import { Sparkles, Gift, X } from 'lucide-react';

interface AchievementModalProps {
  onClose: () => void;
  onRedeem: () => void;
}

export function AchievementModal({ onClose, onRedeem }: AchievementModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Celebration Animation */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-[#FC0680] to-[#FF4DA6] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            {/* Decorative sparkles */}
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Sparkles className="w-6 h-6 text-[#FC0680]" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce delay-100">
              <Sparkles className="w-5 h-5 text-[#FF4DA6]" />
            </div>
          </div>
          
          <h2 className="text-foreground mb-2">Congratulations! 🎉</h2>
          <p className="text-muted-foreground">
            You've reached a milestone!
          </p>
        </div>

        {/* Achievement Details */}
        <div className="bg-gradient-to-br from-[#FC0680]/10 to-[#FF4DA6]/10 rounded-2xl p-5 mb-6 border-2 border-[#FC0680]/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Gift className="w-6 h-6 text-[#FC0680]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">New Reward Unlocked!</p>
              <p className="text-sm text-muted-foreground">$300 Gift Card</p>
            </div>
          </div>
          
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <p className="text-sm text-muted-foreground mb-1">Your Points</p>
            <p className="text-3xl font-bold text-[#FC0680]">300+</p>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mb-6 text-center">
          <p className="text-sm text-foreground mb-2">
            Amazing work! You've been consistently registering customers and building our customer base.
          </p>
          <p className="text-sm text-muted-foreground">
            Your dedication is paying off! 🌟
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onRedeem}
            className="w-full bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] text-white py-3 rounded-xl shadow-lg hover:shadow-xl active:scale-98 transition-all font-medium"
          >
            Redeem Now
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-white border-2 border-gray-200 text-foreground py-3 rounded-xl hover:bg-gray-50 active:scale-98 transition-all font-medium"
          >
            Maybe Later
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#FC0680] to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
}
