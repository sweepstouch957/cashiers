"use client";

import { Calendar, UserPlus, Clock, CheckCircle, Users, Phone, Tablet } from 'lucide-react';
import type { DailyStats } from '@/interfaces';
import { useI18n } from '@/i18n/i18n-context';

interface ParticipationHistoryProps {
  dailyStats: DailyStats[];
  totalPoints: number;
}

export function ParticipationHistory({ dailyStats, totalPoints }: ParticipationHistoryProps) {
  const { t, locale } = useI18n();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return t.history.today;
    if (date.toDateString() === yesterday.toDateString()) return t.history.yesterday;
    return date.toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  const totalRegistrations = dailyStats.reduce((s, r) => s + r.totalRegistrations, 0);
  const totalNewNumbers = dailyStats.reduce((s, r) => s + r.newNumbers, 0);
  const totalExistingNumbers = dailyStats.reduce((s, r) => s + r.existingNumbers, 0);
  const totalManualRegistrations = dailyStats.reduce((s, r) => s + r.manualRegistrations, 0);
  const totalShiftRegistrations = dailyStats.reduce((s, r) => s + r.shiftRegistrations, 0);

  return (
    <div className="min-h-full bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <h1 className="text-white mb-2">{t.history.title}</h1>
        <p className="text-white/90">{t.history.subtitle}</p>
      </div>

      {/* Summary Stats */}
      <div className="px-6 -mt-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-border">
          <div className="grid grid-cols-2 divide-x divide-border mb-4">
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-1">
                <UserPlus className="w-4 h-4 text-[#FC0680]" />
                <span className="text-sm text-muted-foreground">{t.history.totalRegistrations}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{totalRegistrations}</p>
            </div>
            <div className="pl-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-[#FF4DA6]" />
                <span className="text-sm text-muted-foreground">{t.history.pointsEarned}</span>
              </div>
              <p className="text-2xl font-bold text-[#FC0680]">{totalPoints}</p>
            </div>
          </div>

          {/* New vs Existing */}
          <div className="pt-4 border-t border-border mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-muted-foreground">{t.history.newNumbers}</span>
                </div>
                <p className="text-xl font-bold text-green-600">{totalNewNumbers}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="text-xs text-muted-foreground">{t.history.existingNumbers}</span>
                </div>
                <p className="text-xl font-bold text-gray-600">{totalExistingNumbers}</p>
              </div>
            </div>
          </div>

          {/* Manual vs Shift */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground font-medium mb-3">{t.history.registrationMethod}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-xs text-muted-foreground">{t.history.manualEntry}</span>
                </div>
                <p className="text-xl font-bold text-purple-600">{totalManualRegistrations}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Tablet className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs text-muted-foreground">{t.history.tabletRegs}</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{totalShiftRegistrations}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Breakdown */}
      <div className="px-6 mt-6">
        <h3 className="mb-4 text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FC0680]" />
          {t.history.dailyBreakdown}
        </h3>
        <div className="space-y-3">
          {dailyStats.map((day) => (
            <div key={day.date} className="bg-white rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{formatDate(day.date)}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {t.history.totalRegsDay(day.totalRegistrations)}
                  </p>
                </div>
                <div className="bg-[#FC0680]/10 text-[#FC0680] px-3 py-1.5 rounded-full">
                  <span className="font-medium text-sm">+{day.newNumbers} pts</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-muted-foreground font-medium">{t.history.newNumbers}</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">{day.newNumbers}</p>
                  <p className="text-xs text-green-600 mt-0.5">{t.history.pointsEarnedCheck}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-muted-foreground font-medium">{t.history.existingNumbers}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-600">{day.existingNumbers}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.history.noPoints}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground font-medium mb-2">{t.history.registrationMethod}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-purple-50 rounded-lg p-2 border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-xs text-muted-foreground font-medium">{t.history.manual}</span>
                    </div>
                    <p className="text-base font-bold text-purple-600">{day.manualRegistrations}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Tablet className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs text-muted-foreground font-medium">{t.history.tablet}</span>
                    </div>
                    <p className="text-base font-bold text-blue-600">{day.shiftRegistrations}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}