"use client";

import { Sparkles, Gift, X } from 'lucide-react';

interface RewardAchievementModalProps {
  onClose: () => void;
  onRedeem: () => void;
  reward: {
    name: string;
    description: string;
    pointsRequired: number;
    imageUrl: string;
  };
  currentPoints: number;
}

export function RewardAchievementModal({ onClose, onRedeem, reward, currentPoints }: RewardAchievementModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto p-6 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Celebration Animation */}
        <div className="text-center mb-4">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FC0680] to-[#FF4DA6] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            {/* Decorative sparkles */}
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Sparkles className="w-5 h-5 text-[#FC0680]" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce delay-100">
              <Sparkles className="w-4 h-4 text-[#FF4DA6]" />
            </div>
          </div>
          
          <h2 className="text-foreground mb-1 text-xl">Congratulations! 🎉</h2>
          <p className="text-muted-foreground text-sm">
            You've unlocked a new reward!
          </p>
        </div>

        {/* Achievement Details */}
        <div className="bg-gradient-to-br from-[#FC0680]/10 to-[#FF4DA6]/10 rounded-2xl p-4 mb-4 border-2 border-[#FC0680]/20">
          {/* Large Product Image */}
          <div className="mb-3 -mx-4 -mt-4">
            <div className="relative aspect-square bg-white rounded-t-2xl overflow-hidden">
              <img 
                src={reward.imageUrl} 
                alt={reward.name} 
                className="w-full h-full object-contain p-4"
              />
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              {/* "New Reward" badge */}
              <div className="absolute top-3 left-3 bg-[#FC0680] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                NEW REWARD!
              </div>
            </div>
          </div>
          
          {/* Reward Info */}
          <div className="px-0">
            <div className="mb-3 text-center">
              <p className="font-bold text-base text-foreground">{reward.name}</p>
            </div>
            
            {/* Description and Points - Side by Side */}
            <div className="flex gap-2 mb-2">
              <div className="flex-1 bg-white/80 rounded-lg p-2.5 min-h-[100px] flex flex-col">
                <p className="text-xs text-muted-foreground mb-1">Description</p>
                <p className="text-xs text-foreground flex-1">{reward.description}</p>
              </div>
              
              <div className="w-[100px] bg-white/50 rounded-lg p-2.5 min-h-[100px] flex flex-col items-center justify-center">
                <p className="text-xs text-muted-foreground mb-1">Your Points</p>
                <p className="text-2xl font-bold text-[#FC0680]">{currentPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mb-4 text-center">
          <p className="text-xs text-foreground mb-1">
            🏆 Amazing work! You've reached {reward.pointsRequired} points!
          </p>
          <p className="text-xs text-muted-foreground">
            Keep registering customers to unlock more rewards! 🌟
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={onRedeem}
            className="w-full bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] text-white py-2.5 rounded-xl shadow-lg hover:shadow-xl active:scale-98 transition-all font-medium text-sm"
          >
            View Rewards
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-white border-2 border-gray-200 text-foreground py-2.5 rounded-xl hover:bg-gray-50 active:scale-98 transition-all font-medium text-sm"
          >
            Continue
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