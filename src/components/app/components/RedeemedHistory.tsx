"use client";

import { Award, Calendar, CheckCircle, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RedeemedReward {
  id: string;
  name: string;
  description: string;
  pointsSpent: number;
  redeemedDate: string;
  imageUrl: string;
}

interface RedeemedHistoryProps {
  redeemedRewards: RedeemedReward[];
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export function RedeemedHistory({ redeemedRewards }: RedeemedHistoryProps) {
  const totalPointsSpent = redeemedRewards.reduce((sum, reward) => sum + reward.pointsSpent, 0);

  return (
    <div className="min-h-full bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <h1 className="text-white mb-2">Redeemed Rewards</h1>
        <p className="text-white/90">Your reward redemption history</p>
      </div>

      {/* Summary Stats */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-border">
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#FC0680]" />
                <span className="text-sm text-muted-foreground">Total Redeemed</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{redeemedRewards.length}</p>
            </div>
            <div className="pl-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-[#FF4DA6]" />
                <span className="text-sm text-muted-foreground">Points Spent</span>
              </div>
              <p className="text-2xl font-bold text-[#FC0680]">{totalPointsSpent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Earn Extra Card */}
      <div className="px-6 mb-8">
        <div className="rounded-2xl p-5 shadow-xl bg-gradient-to-br from-[#FC0680] to-[#C10063] text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-[#FFD43B] text-[#4A2A00] font-semibold text-xs px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              HOT OPPORTUNITY
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs px-3 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              Earn Extra
            </span>
          </div>

          <h2 className="text-xl font-extrabold mb-3">
            💰 Want to earn <span className="text-white">MORE</span> points?
          </h2>
          <p className="text-white/90 leading-relaxed mb-5">
            We have extra work available! Register more customers now and{' '}
            <span className="font-bold">double your point earnings</span> 🚀
          </p>

          <a
            href="https://jobs.sweepstouch.com"
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <button
              type="button"
              className="w-full bg-white text-[#FC0680] font-bold rounded-xl py-4 px-4 shadow-md active:scale-[0.99] transition"
            >
              <span className="inline-flex items-center justify-center gap-2">
                Yes, I want extra work!
                <Zap className="w-5 h-5" />
              </span>
            </button>
          </a>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="flex items-center gap-2 font-bold">
                <Zap className="w-4 h-4" />
                2x Points
              </div>
              <div className="text-xs text-white/85 mt-0.5">Double rewards</div>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4" />
                Bonus
              </div>
              <div className="text-xs text-white/85 mt-0.5">Exclusive rewards</div>
            </div>
          </div>
        </div>
      </div>

      {/* Redeemed Rewards List */}
      <div className="px-6">
        {redeemedRewards.length === 0 ? (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-muted-foreground mb-2">No redeemed rewards yet</h3>
            <p className="text-sm text-muted-foreground">
              Start earning points and redeem your first reward!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {redeemedRewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-white rounded-xl overflow-hidden border border-border shadow-sm"
              >
                <div className="flex gap-4 p-4">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={reward.imageUrl}
                      alt={reward.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-foreground">{reward.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5 text-[#FC0680]">
                        <Award className="w-3.5 h-3.5" />
                        <span className="font-medium">{reward.pointsSpent} points</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(reward.redeemedDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Motivational Footer */}
      {redeemedRewards.length > 0 && (
        <div className="px-6 mt-6">
          <div className="bg-gradient-to-r from-[#FC0680]/10 to-[#FF4DA6]/10 border-l-4 border-[#FC0680] rounded-lg p-4">
            <p className="font-medium text-foreground mb-1">Great job! 🎉</p>
            <p className="text-sm text-muted-foreground">
              You've redeemed {redeemedRewards.length} rewards. Keep registering customers to earn more!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}