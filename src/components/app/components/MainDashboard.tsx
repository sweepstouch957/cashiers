"use client";

import { useState } from 'react';
import { Sparkles, TrendingUp, UserPlus, Gift, User } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { ManualRegistrationModal } from './ManualRegistrationModal';
import type { DailyStats } from '@/interfaces';
import { useAuth } from '@/context/auth-context';
import { useTodaySummary, useWeeklyOverview } from '@/services/tracking.service';
import { useNextGoal } from '@/services/redeem.service';
import { useI18n } from '@/i18n/i18n-context';

const logo = '/assets/8750bb9a23d750ca362e5565b58d2d4ce0cb21c4.png';
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface MainDashboardProps {
  totalPoints: number;
  onAddPoints: (points: number) => void;
  onNavigateToRewards: () => void;
  userName: string;
  userPhoto: string | null;
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
  onLogout,
  onAddRegistration,
}: MainDashboardProps) {
  const { user } = useAuth();
  const { t } = useI18n();
  const cashierId = user?._id;
  const storeId = user?.store?._id;

  // ── Live API data ────────────────────────────────────────────────────────────
  const { data: todaySummary } = useTodaySummary(cashierId, storeId);
  const { data: weeklyData } = useWeeklyOverview(cashierId, storeId);
  const { data: nextGoalData } = useNextGoal(cashierId, storeId);

  // ── Today's Summary ──────────────────────────────────────────────────────────
  const todayRegistrations = todaySummary?.totalParticipations ?? 0;
  const todayPoints = todaySummary?.pointsEarned ?? 0;
  const todayNew = todaySummary?.newNumbers ?? 0;
  const todayExisting = todaySummary?.existingNumbers ?? 0;

  const [showManualModal, setShowManualModal] = useState(false);

  // ── Next Goal / Progress ─────────────────────────────────────────────────────
  // Prefer real API data; fall back to local computation from totalPoints
  const nextGoal = nextGoalData?.nextGoal ?? null;
  const rewardsUnlocked = nextGoalData?.rewardsUnlocked ?? [];

  // Progress toward the NEXT real reward (from API)
  const progressToNext = nextGoal
    ? nextGoal.progressPercent
    : totalPoints >= 500 ? 100 : 0;

  const nextRewardName = nextGoal?.reward?.name ?? 'Samsung Smart TV 65"';
  const nextRewardCost = nextGoal?.reward?.pointsCost ?? 500;

  const progressToMax = Math.min(100, Math.round((totalPoints / 500) * 100));

  // Motivational message — prefer server-generated one; fall back to local
  const motivationalMsg = nextGoal?.message
    ? nextGoal.message.replace(/^[🔥🚀]\s*/, '') // strip leading emoji (we add our own)
    : rewardsUnlocked.length > 0
      ? "You can redeem a reward right now! 🎁"
      : totalPoints >= 500
        ? "You've reached your goal! Check out available rewards. 🎉"
        : `Just ${nextRewardCost - totalPoints} more points to unlock your next reward!`;

  const motivationalEmoji = nextGoal?.registrationsNeeded === 1 ? '🔥' : '🚀';

  // ── Weekly chart ─────────────────────────────────────────────────────────────
  const todayStr = new Date().toISOString().split('T')[0];

  const weekData = (() => {
    if (!weeklyData?.dailyBreakdown) {
      return DAY_LABELS.map((day, i) => ({
        day, count: 0, pointsEarned: 0,
        isToday: i === (new Date().getDay() + 6) % 7, // Mon=0 offset
      }));
    }

    const { start } = weeklyData.dateRange;
    const monday = new Date(start + 'T00:00:00');

    return DAY_LABELS.map((day, i) => {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + i);
      const dateStr = dayDate.toISOString().split('T')[0];
      const record = weeklyData.dailyBreakdown.find(r => r.date === dateStr);
      return {
        day,
        count: record?.totalParticipations ?? 0,
        pointsEarned: record?.pointsEarned ?? 0,
        isToday: dateStr === todayStr,
      };
    });
  })();

  const totalWeekRegistrations = weeklyData?.summary?.totalParticipations
    ?? weekData.reduce((s, d) => s + d.count, 0);
  const totalWeekPoints = weeklyData?.summary?.pointsEarned
    ?? weekData.reduce((s, d) => s + d.pointsEarned, 0);
  const maxCount = Math.max(...weekData.map(d => d.count), 1);

  return (
    <div className="min-h-full bg-gradient-to-b from-[#FFADD9]/20 to-white pb-6">

      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] px-6 pt-16 pb-8 rounded-b-[2rem] shadow-lg safe-area-top">
        <div className="flex items-center justify-between mb-6">
          {/* Logo + Welcome */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center p-2">
              <img src={logo} alt="Sweeps Touch" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-white/90 text-sm">{t.dashboard.welcomeBack}</h3>
              <h2 className="text-white font-semibold">{userName}</h2>
            </div>
          </div>

          {/* User avatar button — UserMenu opens on click */}
          <div className="relative">
            <UserMenu
              userName={userName}
              userPhoto={userPhoto}
              onLogout={onLogout}
            />
            {/* Fallback icon if no photo — rendered inside UserMenu button already,
                but kept here as a safety net visible label */}
            {!userPhoto && (
              <span className="sr-only">
                <User className="w-6 h-6 text-[#FC0680]" />
              </span>
            )}
          </div>
        </div>

        {/* ── Total Points card ────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-muted-foreground">{t.dashboard.totalPoints}</p>
            <Sparkles className="w-5 h-5 text-[#FC0680]" />
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold text-[#FC0680]">{totalPoints}</span>
            <span className="text-muted-foreground">{t.dashboard.points}</span>
          </div>

          {/* Progress toward NEXT real reward (from API) */}
          {nextGoal && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">{t.dashboard.nextReward}: {nextRewardName}</span>
                <span className="text-sm font-medium text-[#FC0680]">{progressToNext}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                {t.dashboard.ptsNeeded(nextGoal.pointsNeeded, nextGoal.registrationsNeeded)}
              </p>
            </div>
          )}

          {/* Unlocked rewards badge */}
          {rewardsUnlocked.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                🎁 {rewardsUnlocked.length} reward{rewardsUnlocked.length > 1 ? 's' : ''} unlocked!
              </span>
              <button
                onClick={onNavigateToRewards}
                className="text-xs text-[#FC0680] underline"
              >
                Redeem
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Motivational Message ───────────────────────────────────────────────── */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-r from-[#FC0680]/10 to-[#FF4DA6]/10 border-l-4 border-[#FC0680] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-[#FC0680] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground mb-1">
                {t.dashboard.onFire} {motivationalEmoji}
              </p>
              <p className="text-sm text-muted-foreground">{motivationalMsg}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Today's Summary ────────────────────────────────────────────────────── */}
      <div className="px-6 mt-6">
        <h3 className="mb-4 text-foreground">{t.dashboard.todaySummary}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-[#FC0680]/10 rounded-full flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#FC0680]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{todayRegistrations}</p>
            <p className="text-sm text-muted-foreground">{t.dashboard.registrations}</p>
            {(todayNew > 0 || todayExisting > 0) && (
              <div className="mt-2 flex gap-1.5 flex-wrap">
                <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{todayNew} new</span>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{todayExisting} existing</span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-[#FF4DA6]/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FF4DA6]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">+{todayPoints}</p>
            <p className="text-sm text-muted-foreground">{t.dashboard.pointsEarned}</p>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ──────────────────────────────────────────────────────── */}
      <div className="px-6 mt-6">
        <h3 className="mb-4 text-foreground">{t.dashboard.quickActions}</h3>
        <div className="space-y-3">
          <button
            onClick={() => setShowManualModal(true)}
            className="w-full bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <UserPlus className="w-5 h-5" />
            {t.dashboard.boostSignUps}
          </button>
          <button
            onClick={onNavigateToRewards}
            className="w-full bg-white border-2 border-[#FC0680] text-[#FC0680] py-4 rounded-xl shadow-sm hover:shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Gift className="w-5 h-5" />
            {t.dashboard.viewRewards}
          </button>
        </div>
      </div>

      {/* ── Weekly Performance ─────────────────────────────────────────────────── */}
      <div className="px-6 mt-6">
        <h3 className="mb-4 text-foreground">{t.dashboard.thisWeek}</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-muted-foreground">{t.dashboard.weeklyProgress}</p>
            <div className="text-right">
              <span className="text-sm font-medium text-[#FC0680]">{totalWeekRegistrations} {t.dashboard.weeklyRegUnit}</span>
              {totalWeekPoints > 0 && (
                <span className="block text-xs text-muted-foreground">+{totalWeekPoints} pts</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            {weekData.map((item) => (
              <div key={item.day} className="flex items-center gap-3">
                <span className={`text-sm w-10 shrink-0 ${item.isToday ? 'font-semibold text-[#FC0680]' : 'text-muted-foreground'}`}>
                  {item.day}{item.isToday && <span className="ml-0.5 text-[10px]">•</span>}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.isToday
                      ? 'bg-gradient-to-r from-[#FC0680] to-[#FF4DA6]'
                      : item.count > 0 ? 'bg-[#FC0680]/40' : 'bg-transparent'
                      }`}
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className={`text-sm w-8 text-right shrink-0 ${item.isToday ? 'font-medium text-[#FC0680]' : 'text-muted-foreground'}`}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Manual Registration Modal ───────────────────────────────────────────── */}
      {showManualModal && (
        <ManualRegistrationModal
          onClose={() => setShowManualModal(false)}
          onRegister={(phoneNumber, isNew) => {
            onAddRegistration(phoneNumber, isNew, true);
            if (isNew) onAddPoints(1);
            setShowManualModal(false);
          }}
        />
      )}
    </div>
  );
}