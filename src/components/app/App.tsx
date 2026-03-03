"use client";

import { useState, useCallback } from 'react';
import { useAuth } from '@/context/auth-context';
import { LoginScreen } from './components/LoginScreen';
import { MainDashboard } from './components/MainDashboard';
import { ParticipationHistory } from './components/ParticipationHistory';
import { RewardsSection } from './components/RewardsSection';
import { RedeemedHistory } from './components/RedeemedHistory';
import { AchievementModal } from './components/AchievementModal';
import { TvAchievementModal } from './components/TvAchievementModal';
import { RewardAchievementModal } from './components/RewardAchievementModal';
import { Home, History, Gift, Award, Loader2 } from 'lucide-react';
import type { Screen, RewardMilestone } from '@/interfaces';

// Services
import { useDailyTracking } from '@/services/tracking.service';
import { useClaimHistory } from '@/services/redeem.service';
import { useCashierSummary, useTrackParticipation } from '@/services/participation.service';
import { useI18n } from '@/i18n/i18n-context';

const bluetoothSpeakerImg = '/assets/b41f0840ee1ec3b2591756608ba9369b6039b239.png';
const wirelessEarbudsImg = '/assets/e83506e82c30c2bae54ad5ee0532834af2e58e0b.png';
const insulatedCoffeeMugImg = '/assets/3a6154ae3798cda7574d362abf563c59cd7789e9.png';
const travelMugSocksGiftBoxImg = '/assets/f8870a94021208a11f892c069c9942fee61c7ad5.png';
const stanleyQuencherImg = '/assets/55aff019b1abef550d68dc89fcd201509dc1b512.png';
const electricSpinningScrubberImg = '/assets/08eb4c5478dde1338e613170b8c0ddee68b754d3.png';
const sephoraGiftCardImg = '/assets/f756bb15c98d5420a2a71bbf8f5c43bb928254e0.png';
const solDeJaneiroJetSetImg = '/assets/b9ba81748ddd4e996ebda7620e4db5f7c7657cc8.png';
const ufreeBeardTrimmerImg = '/assets/87b30d25c74ca0e7b91d57194160bcc23d20c057.png';
const homeSpaKitImg = '/assets/487bd229e31a56ac2ed0047cf39aed5e4acec7d0.png';
const olaplexKitImg = '/assets/6eff6cfa66ae70c380a4370970535622ac4f9369.png';
const sgvMiniProjectorImg = '/assets/b87089a3797aa827fb6d4b6bd4af345993aa61d5.png';
const wavytalkSteamBrushImg = '/assets/2a6c79032ee91f0ef54e089ad1f26cfa49cd6cbe.png';
const skinCareKitImg = '/assets/5c5c216f5d640e8ac572977e46123ef939b283b7.png';
const echoDotImg = '/assets/e5abad9407a980f947e9eb2037a3eb46836e1a44.png';
const confuBlowDryerImg = '/assets/8dc9ca75d102e356585ea3869b17534c965fa1fa.png';
const trulyShaveSetImg = '/assets/01b488057ac31473e3d1ddcbc124787696ef4689.png';
const gourmiaAirFryerImg = '/assets/287a26709336827bbe1eb15b0301cc3c6b4f336e.png';
const samsungTvImg = '/assets/ab0cbb27441fa385f8f8205736b4c683db84b5b4.png';

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

export default function App() {
  const { user, logout, loading } = useAuth();

  const cashierId = user?._id;
  const storeId = user?.store?._id;

  // ── React Query: live data ──────────────────────────────────────────────────
  // Primary source of truth for totalPoints: /participations/summary
  const { data: cashierSummary } = useCashierSummary(cashierId, storeId);
  const { data: dailyStats = [] } = useDailyTracking(cashierId, storeId);
  const { data: redeemedRewards = [] } = useClaimHistory(cashierId, storeId);

  // ── Mutations ──────────────────────────────────────────────────────────────
  const { mutate: trackParticipationMutate } = useTrackParticipation();

  // ── Derived state from API ─────────────────────────────────────────────────
  // currentBalance = points after reward deductions (server-authoritative)
  const totalPoints = cashierSummary?.currentBalance ?? 0;
  const userName = user ? `${user.firstName} ${user.lastName}` : '';
  const userPhoto: string | null = user?.profileImage ?? null;



  // ── UI-only state (no backend equivalent yet) ───────────────────────────────
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showTvAchievementModal, setShowTvAchievementModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentRewardAchieved, setCurrentRewardAchieved] = useState<RewardMilestone | null>(null);

  const { t } = useI18n();

  // ── Data queries ───────────────────────────────────────────────────────────────

  const handleLogout = () => {
    logout();
    setCurrentScreen('dashboard');
  };

  /** Called by ManualRegistrationModal registration buttons */
  const handleAddRegistration = useCallback(
    (phoneNumber: string, isNew: boolean, _isManual: boolean) => {
      if (!cashierId || !storeId) return;

      const prevPoints = totalPoints;

      trackParticipationMutate(
        {
          cashierId,
          storeId,
          isNewUser: isNew,
        },
        {
          onSuccess: (data) => {
            const newTotal = prevPoints + data.pointsEarned;

            // Check milestone crossing
            const achievedReward = rewardMilestones.find(
              m => newTotal >= m.pointsRequired && prevPoints < m.pointsRequired
            );

            if (achievedReward) {
              if (achievedReward.pointsRequired === 500) {
                setShowTvAchievementModal(true);
              } else if (achievedReward.pointsRequired === 300) {
                setShowAchievementModal(true);
              } else {
                setCurrentRewardAchieved(achievedReward);
                setShowRewardModal(true);
              }
            }
          },
        }
      );
    },
    [cashierId, storeId, totalPoints, trackParticipationMutate]
  );

  // Legacy handler for direct "add points" calls from MainDashboard Quick Register
  const handleAddPoints = useCallback(
    (_points: number) => {
      // In the new flow, points are added via handleAddRegistration → API
      // This is a no-op kept for prop compatibility
    },
    []
  );



  // ── Guards ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-br from-[#FC0680] to-[#FF4DA6]">
        <Loader2 className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
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
            onLogout={handleLogout}
            onAddRegistration={handleAddRegistration}
            dailyStats={dailyStats}
          />
        )}
        {currentScreen === 'history' && <ParticipationHistory dailyStats={dailyStats} totalPoints={totalPoints} />}
        {currentScreen === 'rewards' && (
          <RewardsSection
            totalPoints={totalPoints}
            cashierId={cashierId}
            storeId={storeId}
          />
        )}
        {currentScreen === 'redeemed' && <RedeemedHistory redeemedRewards={redeemedRewards} />}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-border flex items-center justify-around py-2 px-4 safe-area-bottom">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${currentScreen === 'dashboard' ? 'text-[#FC0680]' : 'text-muted-foreground'
            }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">{t.nav.home}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('history')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${currentScreen === 'history' ? 'text-[#FC0680]' : 'text-muted-foreground'
            }`}
        >
          <History className="w-6 h-6" />
          <span className="text-xs">{t.nav.history}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('rewards')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${currentScreen === 'rewards' ? 'text-[#FC0680]' : 'text-muted-foreground'
            }`}
        >
          <Gift className="w-6 h-6" />
          <span className="text-xs">{t.nav.rewards}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('redeemed')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${currentScreen === 'redeemed' ? 'text-[#FC0680]' : 'text-muted-foreground'
            }`}
        >
          <Award className="w-6 h-6" />
          <span className="text-xs">{t.nav.redeemed}</span>
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