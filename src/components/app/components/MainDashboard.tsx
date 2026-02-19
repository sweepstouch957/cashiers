"use client";

import { useState } from 'react';
import { Sparkles, TrendingUp, UserPlus, Gift } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { ManualRegistrationModal } from './ManualRegistrationModal';

const logo = '/assets/8750bb9a23d750ca362e5565b58d2d4ce0cb21c4.png';


interface DailyStats {
  date: string;
  totalRegistrations: number;
  newNumbers: number;
  existingNumbers: number;
  manualRegistrations: number;
  shiftRegistrations: number;
}

interface MainDashboardProps {
  totalPoints: number;
  onAddPoints: (points: number) => void;
  onNavigateToRewards: () => void;
  userName: string;
  userPhoto: string | null;
  onPhotoUpload: (photo: string) => void;
  onLogout: () => void;
  onAddRegistration: (phoneNumber: string, isNew: boolean, isManual: boolean) => void;
  todayStats?: DailyStats;
  dailyStats: DailyStats[];
}

export function MainDashboard({ 
  totalPoints, 
  onAddPoints, 
  onNavigateToRewards,
  userName,
  userPhoto,
  onPhotoUpload,
  onLogout,
  onAddRegistration,
  todayStats,
  dailyStats
}: MainDashboardProps) {
  const [showManualModal, setShowManualModal] = useState(false);
  
  const todayRegistrations = todayStats?.totalRegistrations || 0;
  const todayPoints = todayStats?.newNumbers || 0;
  
  // Define all available rewards
  const rewardTiers = [25, 50, 75, 100, 200, 300, 500];
  
  // Always show progress towards the biggest reward (500 points - Samsung TV 65")
  const biggestReward = 500;
  
  // Find the closest next reward for the motivational message
  const nextRewardThreshold = rewardTiers.find(tier => tier > totalPoints) || 500;
  const pointsToNextReward = nextRewardThreshold - totalPoints;
  
  // Progress is always calculated towards the biggest reward (500)
  const progress = (totalPoints / biggestReward) * 100;
  
  // Get reward name based on threshold
  const getRewardName = (points: number) => {
    switch(points) {
      case 25: return 'Free Coffee';
      case 50: return '$50 Gift Card';
      case 75: return 'Free Lunch';
      case 100: return '$100 Gift Card';
      case 200: return '$200 Gift Card';
      case 300: return '$300 Gift Card';
      case 500: return 'Samsung Smart TV 65-Inch 4K';
      default: return 'Next Reward';
    }
  };

  const handleQuickRegister = () => {
    // Quick register always assumes a new number (for demo purposes)
    // In production, this would integrate with the actual scanning system
    const mockPhoneNumber = `(555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
    onAddRegistration(mockPhoneNumber, true, false); // isNew=true, isManual=false
    onAddPoints(1);
  };

  const handleManualRegistration = () => {
    setShowManualModal(true);
  };

  // Calculate this week's data dynamically
  const getWeekData = () => {
    // Today is Tuesday, Feb 17, 2026
    const todayDate = '2026-02-17';
    
    // This week's dates (Monday to Sunday)
    const weekDates = [
      '2026-02-16', // Mon
      '2026-02-17', // Tue (TODAY)
      '2026-02-18', // Wed
      '2026-02-19', // Thu
      '2026-02-20', // Fri
      '2026-02-21', // Sat
      '2026-02-22'  // Sun
    ];
    
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = [];
    let totalWeekRegistrations = 0;
    
    for (let i = 0; i < 7; i++) {
      const dateStr = weekDates[i];
      
      // Find stats for this date
      const dayStats = dailyStats.find(s => s.date === dateStr);
      const count = dayStats?.totalRegistrations || 0;
      
      // Check if this is today
      const isToday = dateStr === todayDate;
      
      weekData.push({
        day: weekDays[i],
        count,
        isToday
      });
      
      totalWeekRegistrations += count;
    }
    
    return { weekData, totalWeekRegistrations };
  };

  const { weekData, totalWeekRegistrations } = getWeekData();
  
  // Calculate max count for scaling the bars
  const maxCount = Math.max(...weekData.map(d => d.count), 1);

  return (
    <div className="min-h-full bg-gradient-to-b from-[#FFADD9]/20 to-white pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] px-6 pt-16 pb-8 rounded-b-[2rem] shadow-lg safe-area-top">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center p-2">
              <img src={logo} alt="Sweeps Touch" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-white/90 text-sm">Welcome back,</h3>
              <h2 className="text-white font-semibold">{userName}</h2>
            </div>
          </div>
          <UserMenu 
            userName={userName}
            userPhoto={userPhoto}
            onPhotoUpload={onPhotoUpload}
            onLogout={onLogout}
          />
        </div>

        {/* Total Points Display */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-muted-foreground">Total Points</p>
            <Sparkles className="w-5 h-5 text-[#FC0680]" />
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold text-[#FC0680]">{totalPoints}</span>
            <span className="text-muted-foreground">points</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">Progress to Samsung Smart TV 65"</span>
              <span className="text-sm font-medium text-[#FC0680]">{Math.min(100, progress).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
            {totalPoints >= biggestReward ? (
              <p className="text-sm text-[#FC0680] font-medium text-center mt-2">
                Max reward unlocked! 🎉
              </p>
            ) : (
              <p className="text-sm text-muted-foreground text-center mt-2">
                {biggestReward - totalPoints} points to go! 🎉
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-r from-[#FC0680]/10 to-[#FF4DA6]/10 border-l-4 border-[#FC0680] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-[#FC0680] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground mb-1">You're on fire! 🔥</p>
              <p className="text-sm text-muted-foreground">
                {pointsToNextReward > 0 
                  ? `Just ${pointsToNextReward} more registrations to unlock your next reward!`
                  : "You've reached your goal! Check out available rewards."
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="px-6 mt-6">
        <h3 className="mb-4 text-foreground">Today's Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-[#FC0680]/10 rounded-full flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#FC0680]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{todayRegistrations}</p>
            <p className="text-sm text-muted-foreground">Registrations</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-[#FF4DA6]/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FF4DA6]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">+{todayPoints}</p>
            <p className="text-sm text-muted-foreground">Points Earned</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <h3 className="mb-4 text-foreground">Quick Actions</h3>
        <div className="space-y-3">
          <button
            onClick={handleQuickRegister}
            className="w-full bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] text-white py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            +1 point
          </button>

          <button
            onClick={handleManualRegistration}
            className="w-full bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <UserPlus className="w-5 h-5" />
            Boost Sign-ups
          </button>

          <button
            onClick={onNavigateToRewards}
            className="w-full bg-white border-2 border-[#FC0680] text-[#FC0680] py-4 rounded-xl shadow-sm hover:shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Gift className="w-5 h-5" />
            View Available Rewards
          </button>
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="px-6 mt-6">
        <h3 className="mb-4 text-foreground">This Week</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-muted-foreground">Weekly Progress</p>
            <span className="text-sm font-medium text-[#FC0680]">{totalWeekRegistrations} registrations</span>
          </div>
          <div className="space-y-2">
            {weekData.map((item) => (
              <div key={item.day} className="flex items-center gap-3">
                <span className={`text-sm w-10 ${item.isToday ? 'font-medium text-[#FC0680]' : 'text-muted-foreground'}`}>
                  {item.day}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-full rounded-full ${
                      item.isToday
                        ? 'bg-gradient-to-r from-[#FC0680] to-[#FF4DA6]'
                        : 'bg-gray-400'
                    }`}
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Manual Registration Modal */}
      {showManualModal && (
        <ManualRegistrationModal
          onClose={() => setShowManualModal(false)}
          onRegister={(phoneNumber, isNew) => {
            // Add to registration tracking
            onAddRegistration(phoneNumber, isNew, true); // isManual=true
            // Only add points if it's a new number
            if (isNew) {
              onAddPoints(1);
            }
            setShowManualModal(false);
          }}
        />
      )}
    </div>
  );
}