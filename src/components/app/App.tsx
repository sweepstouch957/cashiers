"use client";

import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainDashboard } from './components/MainDashboard';
import { ParticipationHistory } from './components/ParticipationHistory';
import { RewardsSection } from './components/RewardsSection';
import { RedeemedHistory } from './components/RedeemedHistory';
import { AchievementModal } from './components/AchievementModal';
import { TvAchievementModal } from './components/TvAchievementModal';
import { RewardAchievementModal } from './components/RewardAchievementModal';
import { Home, History, Gift, Award } from 'lucide-react';

const bluetoothSpeakerImg = '/assets/b41f0840ee1ec3b2591756608ba9369b6039b239.png';
const wirelessEarbudsImg = '/assets/e83506e82c30c2bae54ad5ee0532834af2e58e0b.png';
const insulatedCoffeeMugImg = '/assets/3a6154ae3798cda7574d362abf563c59cd7789e9.png';
const travelMugSocksGiftBoxImg = '/assets/f8870a94021208a11f892c069c9942fee61c7ad5.png';
const stanleyQuencherImg = '/assets/55aff019b1abef550d68dc89fcd201509dc1b512.png';
const electricSpinningScrubberImg = '/assets/08eb4c5478dde1338e613170b8c0ddee68b754d3.png';
const sephoraGiftCardImg = '/assets/f756bb15c98d5420a2a71bbf8f5c43bb928254e0.png';
const workOrthoticInsolesImg = '/assets/ce7cd9f8ee8a3bf44c875972964a8b983cc3b33e.png';
const solDeJaneiroJetSetImg = '/assets/b9ba81748ddd4e996ebda7620e4db5f7c7657cc8.png';
const ufreeBeardTrimmerImg = '/assets/87b30d25c74ca0e7b91d57194160bcc23d20c057.png';
const homeSpaKitImg = '/assets/487bd229e31a56ac2ed0047cf39aed5e4acec7d0.png';
const olaplexKitImg = '/assets/6eff6cfa66ae70c380a4370970535622ac4f9369.png';
const frameoPictureFrameImg = '/assets/7a0ebdf2c7dd8f029d18f42adcf78304e2d8381e.png';
const sgvMiniProjectorImg = '/assets/b87089a3797aa827fb6d4b6bd4af345993aa61d5.png';
const wavytalkSteamBrushImg = '/assets/2a6c79032ee91f0ef54e089ad1f26cfa49cd6cbe.png';
const skinCareKitImg = '/assets/5c5c216f5d640e8ac572977e46123ef939b283b7.png';
const echoDotImg = '/assets/e5abad9407a980f947e9eb2037a3eb46836e1a44.png';
const confuBlowDryerImg = '/assets/8dc9ca75d102e356585ea3869b17534c965fa1fa.png';
const trulyShaveSetImg = '/assets/01b488057ac31473e3d1ddcbc124787696ef4689.png';
const gourmiaAirFryerImg = '/assets/287a26709336827bbe1eb15b0301cc3c6b4f336e.png';
const samsungTvImg = '/assets/ab0cbb27441fa385f8f8205736b4c683db84b5b4.png';

type Screen = 'login' | 'dashboard' | 'history' | 'rewards' | 'redeemed';

interface Registration {
  phoneNumber: string;
  isNew: boolean;
  isManual: boolean;
  timestamp: Date;
}

interface DailyStats {
  date: string;
  totalRegistrations: number;
  newNumbers: number;
  existingNumbers: number;
  manualRegistrations: number;
  shiftRegistrations: number;
  registrations: Registration[];
}

interface RedeemedReward {
  id: string;
  name: string;
  description: string;
  pointsSpent: number;
  redeemedDate: string;
  imageUrl: string;
}

interface RewardMilestone {
  name: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showTvAchievementModal, setShowTvAchievementModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentRewardAchieved, setCurrentRewardAchieved] = useState<RewardMilestone | null>(null);
  const [totalPoints, setTotalPoints] = useState(28);
  const [userName, setUserName] = useState('Sarah Johnson');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);

  // All reward milestones
  const rewardMilestones: RewardMilestone[] = [
    { name: 'Bluetooth Speaker', description: 'Portable Wireless & IPX5 Waterproof', pointsRequired: 29, imageUrl: bluetoothSpeakerImg },
    { name: 'Wireless Earbuds', description: 'Waterproof Bluetooth Earbuds for Laptop/Phones/Sports', pointsRequired: 35, imageUrl: wirelessEarbudsImg },
    { name: 'Insulated Coffee Mug', description: 'Dravizon Stainless Steel Vacuum Insulated Coffee Mug 510ML', pointsRequired: 37, imageUrl: insulatedCoffeeMugImg },
    { name: 'Travel Mug & Socks Gift Box', description: 'luxurious gift box containing an AD thermal travel mug & under boot knee high socks.', pointsRequired: 40, imageUrl: travelMugSocksGiftBoxImg },
    { name: 'STANLEY Quencher H2.0 Tumbler', description: 'combines functionality and style in one iconic design.', pointsRequired: 45, imageUrl: stanleyQuencherImg },
    { name: 'Electric Spinning Scrubber', description: 'Power Electric Scrubber for Cleaning.', pointsRequired: 48, imageUrl: electricSpinningScrubberImg },
    { name: 'Sephora Gift Card', description: 'Redeemable for a wide selection of beauty products at Sephora stores or online.', pointsRequired: 50, imageUrl: sephoraGiftCardImg },
    { name: 'SOL DE JANEIRO Jet Set', description: 'Caffeine-rich guarana visibly firms and tightens skin.', pointsRequired: 62, imageUrl: solDeJaneiroJetSetImg },
    { name: 'Ufree Beard Trimmer', description: 'Electric Razor for Nose, Body, Face & Mustache, Cordless Hair Clippers Shavers Grooming Kit.', pointsRequired: 65, imageUrl: ufreeBeardTrimmerImg },
    { name: 'Home Spa Kit', description: 'Luxury Spa Gift Box for Her | Cozy Self Care Valentine Gift.', pointsRequired: 70, imageUrl: homeSpaKitImg },
    { name: 'Olaplex Kit', description: 'FULL-ON SHINE SET, limited-edition set for shiny, smooth, strong hair in one use.', pointsRequired: 75, imageUrl: olaplexKitImg },
    { name: 'SGV Smart Mini Projector', description: 'Outdoor Projector with WiFi and Bluetooth for Home Theater Outdoor Movie.', pointsRequired: 90, imageUrl: sgvMiniProjectorImg },
    { name: 'Wavytalk Pro Steam', description: 'Wavytalk Pro Steam Hair Straightener Brush.', pointsRequired: 95, imageUrl: wavytalkSteamBrushImg },
    { name: 'Skin Care Kit', description: 'Rice Raw Pulp Rejuvenating Moisturizing Face Cream Cleanser Toner Lotion Eye Cream.', pointsRequired: 100, imageUrl: skinCareKitImg },
    { name: 'Echo Dot', description: 'Amazon Echo Dot (newest model).', pointsRequired: 105, imageUrl: echoDotImg },
    { name: 'CONFU Ionic Blow Dryer', description: 'Fast Drying Negative Ion Hairdryer Blowdryer.', pointsRequired: 106, imageUrl: confuBlowDryerImg },
    { name: 'Truly Luxury Shave Set', description: 'Complete 3-step shave set in a fuzzy, travel-ready pouch.', pointsRequired: 120, imageUrl: trulyShaveSetImg },
    { name: 'Gourmia Digital Air Fryer', description: '8 Qt Digital Air Fryer GAF826 – XL Capacity with 12 One-Touch Presets.', pointsRequired: 127, imageUrl: gourmiaAirFryerImg },
    { name: 'Samsung Smart TV 65-Inch 4K', description: 'Samsung Smart TV Crystal UHD U8000F 4K de 65 inches and built-in Alexa.', pointsRequired: 500, imageUrl: samsungTvImg },
  ];

  // Track daily registrations
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([
    {
      date: '2026-02-17', // Today (Tuesday)
      totalRegistrations: 0,
      newNumbers: 0,
      existingNumbers: 0,
      manualRegistrations: 0,
      shiftRegistrations: 0,
      registrations: []
    },
    {
      date: '2026-02-16', // Yesterday (Monday)
      totalRegistrations: 15,
      newNumbers: 12,
      existingNumbers: 3,
      manualRegistrations: 4,
      shiftRegistrations: 11,
      registrations: []
    },
    {
      date: '2026-02-15',
      totalRegistrations: 22,
      newNumbers: 18,
      existingNumbers: 4,
      manualRegistrations: 7,
      shiftRegistrations: 15,
      registrations: []
    },
    {
      date: '2026-02-14',
      totalRegistrations: 16,
      newNumbers: 12,
      existingNumbers: 4,
      manualRegistrations: 4,
      shiftRegistrations: 12,
      registrations: []
    },
    {
      date: '2026-02-13',
      totalRegistrations: 20,
      newNumbers: 16,
      existingNumbers: 4,
      manualRegistrations: 6,
      shiftRegistrations: 14,
      registrations: []
    }
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('dashboard');
    // Optionally reset other states if needed
  };

  const handlePhotoUpload = (photo: string) => {
    setUserPhoto(photo);
  };

  const handleAddPoints = (points: number) => {
    const newTotal = totalPoints + points;
    setTotalPoints(newTotal);
    
    // Check if we've crossed any reward milestone
    const achievedReward = rewardMilestones.find(
      milestone => newTotal >= milestone.pointsRequired && totalPoints < milestone.pointsRequired
    );
    
    if (achievedReward) {
      // Show special modal for 500 points (Samsung TV)
      if (achievedReward.pointsRequired === 500) {
        setShowTvAchievementModal(true);
      } 
      // Show special modal for 300 points (for legacy support)
      else if (achievedReward.pointsRequired === 300 || (newTotal >= 300 && totalPoints < 300 && !achievedReward)) {
        setShowAchievementModal(true);
      }
      // Show generic reward modal for all other milestones
      else {
        setCurrentRewardAchieved(achievedReward);
        setShowRewardModal(true);
      }
    }
  };

  const handleRedeemReward = (reward: { id: string; name: string; description: string; pointsRequired: number; imageUrl: string }) => {
    // Prevent negative points - only subtract if enough points available
    if (totalPoints >= reward.pointsRequired) {
      setTotalPoints(prev => prev - reward.pointsRequired);
      
      // Add to redeemed rewards
      const newRedeemedReward: RedeemedReward = {
        id: reward.id,
        name: reward.name,
        description: reward.description,
        pointsSpent: reward.pointsRequired,
        redeemedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        imageUrl: reward.imageUrl
      };
      
      setRedeemedRewards(prev => [newRedeemedReward, ...prev]);
    }
  };

  // Add a new registration
  const handleAddRegistration = (phoneNumber: string, isNew: boolean, isManual: boolean) => {
    const today = '2026-02-17';
    const newRegistration: Registration = {
      phoneNumber,
      isNew,
      isManual,
      timestamp: new Date()
    };

    setDailyStats(prev => {
      const todayStats = prev.find(s => s.date === today);
      
      if (todayStats) {
        // Update existing day
        return prev.map(stats => {
          if (stats.date === today) {
            return {
              ...stats,
              totalRegistrations: stats.totalRegistrations + 1,
              newNumbers: isNew ? stats.newNumbers + 1 : stats.newNumbers,
              existingNumbers: !isNew ? stats.existingNumbers + 1 : stats.existingNumbers,
              manualRegistrations: isManual ? stats.manualRegistrations + 1 : stats.manualRegistrations,
              shiftRegistrations: !isManual ? stats.shiftRegistrations + 1 : stats.shiftRegistrations,
              registrations: [...stats.registrations, newRegistration]
            };
          }
          return stats;
        });
      } else {
        // Create new day
        return [
          {
            date: today,
            totalRegistrations: 1,
            newNumbers: isNew ? 1 : 0,
            existingNumbers: isNew ? 0 : 1,
            manualRegistrations: isManual ? 1 : 0,
            shiftRegistrations: isManual ? 0 : 1,
            registrations: [newRegistration]
          },
          ...prev
        ];
      }
    });
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen bg-background max-w-md mx-auto safe-area-inset">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {currentScreen === 'dashboard' && (
          <MainDashboard 
            totalPoints={totalPoints} 
            onAddPoints={handleAddPoints}
            onNavigateToRewards={() => setCurrentScreen('rewards')}
            userName={userName}
            userPhoto={userPhoto}
            onPhotoUpload={handlePhotoUpload}
            onLogout={handleLogout}
            onAddRegistration={handleAddRegistration}
            todayStats={dailyStats.find(s => s.date === '2026-02-17')}
            dailyStats={dailyStats}
          />
        )}
        {currentScreen === 'history' && <ParticipationHistory dailyStats={dailyStats} totalPoints={totalPoints} />}
        {currentScreen === 'rewards' && <RewardsSection totalPoints={totalPoints} onRedeem={handleRedeemReward} />}
        {currentScreen === 'redeemed' && <RedeemedHistory redeemedRewards={redeemedRewards} />}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-border flex items-center justify-around py-2 px-4 safe-area-bottom">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
            currentScreen === 'dashboard'
              ? 'text-[#FC0680]'
              : 'text-muted-foreground'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </button>
        
        <button
          onClick={() => setCurrentScreen('history')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
            currentScreen === 'history'
              ? 'text-[#FC0680]'
              : 'text-muted-foreground'
          }`}
        >
          <History className="w-6 h-6" />
          <span className="text-xs">History</span>
        </button>
        
        <button
          onClick={() => setCurrentScreen('rewards')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
            currentScreen === 'rewards'
              ? 'text-[#FC0680]'
              : 'text-muted-foreground'
          }`}
        >
          <Gift className="w-6 h-6" />
          <span className="text-xs">Rewards</span>
        </button>
        
        <button
          onClick={() => setCurrentScreen('redeemed')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
            currentScreen === 'redeemed'
              ? 'text-[#FC0680]'
              : 'text-muted-foreground'
          }`}
        >
          <Award className="w-6 h-6" />
          <span className="text-xs">Redeemed</span>
        </button>
      </nav>

      {/* Achievement Modal */}
      {showAchievementModal && (
        <AchievementModal
          onClose={() => setShowAchievementModal(false)}
          onRedeem={() => {
            setShowAchievementModal(false);
            setCurrentScreen('rewards');
          }}
        />
      )}
      
      {/* TV Achievement Modal (500 points) */}
      {showTvAchievementModal && (
        <TvAchievementModal
          currentPoints={totalPoints}
          onClose={() => setShowTvAchievementModal(false)}
          onRedeem={() => {
            setShowTvAchievementModal(false);
            setCurrentScreen('rewards');
          }}
        />
      )}
      
      {/* Reward Achievement Modal */}
      {showRewardModal && currentRewardAchieved && (
        <RewardAchievementModal
          reward={currentRewardAchieved}
          currentPoints={totalPoints}
          onClose={() => {
            setShowRewardModal(false);
            setCurrentRewardAchieved(null);
          }}
          onRedeem={() => {
            setShowRewardModal(false);
            setCurrentRewardAchieved(null);
            setCurrentScreen('rewards');
          }}
        />
      )}
    </div>
  );
}