"use client";

import { Calendar, UserPlus, Clock, CheckCircle, Users, Phone, Tablet } from 'lucide-react';

interface DailyStats {
  date: string;
  totalRegistrations: number;
  newNumbers: number;
  existingNumbers: number;
  manualRegistrations: number;
  shiftRegistrations: number;
}

interface ParticipationHistoryProps {
  dailyStats: DailyStats[];
  totalPoints: number;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date('2026-02-17');
  const yesterday = new Date('2026-02-16');

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
};

export function ParticipationHistory({ dailyStats, totalPoints }: ParticipationHistoryProps) {
  const totalRegistrations = dailyStats.reduce((sum, reg) => sum + reg.totalRegistrations, 0);
  const totalNewNumbers = dailyStats.reduce((sum, reg) => sum + reg.newNumbers, 0);
  const totalExistingNumbers = dailyStats.reduce((sum, reg) => sum + reg.existingNumbers, 0);
  const totalManualRegistrations = dailyStats.reduce((sum, reg) => sum + reg.manualRegistrations, 0);
  const totalShiftRegistrations = dailyStats.reduce((sum, reg) => sum + reg.shiftRegistrations, 0);

  return (
    <div className="min-h-full bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <h1 className="text-white mb-2">Participation History</h1>
        <p className="text-white/90">Track your daily performance</p>
      </div>

      {/* Summary Stats */}
      <div className="px-6 -mt-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-border">
          <div className="grid grid-cols-2 divide-x divide-border mb-4">
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-1">
                <UserPlus className="w-4 h-4 text-[#FC0680]" />
                <span className="text-sm text-muted-foreground">Total Registrations</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{totalRegistrations}</p>
            </div>
            <div className="pl-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-[#FF4DA6]" />
                <span className="text-sm text-muted-foreground">Points Earned</span>
              </div>
              <p className="text-2xl font-bold text-[#FC0680]">{totalPoints}</p>
            </div>
          </div>
          
          {/* New vs Existing Breakdown */}
          <div className="pt-4 border-t border-border mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">New Numbers</span>
                </div>
                <p className="text-xl font-bold text-green-600">{totalNewNumbers}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Existing Numbers</span>
                </div>
                <p className="text-xl font-bold text-gray-600">{totalExistingNumbers}</p>
              </div>
            </div>
          </div>

          {/* Manual vs Shift Breakdown */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground font-medium mb-3">Registration Method</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-xs text-muted-foreground">Manual Entry</span>
                </div>
                <p className="text-xl font-bold text-purple-600">{totalManualRegistrations}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Tablet className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs text-muted-foreground">Tablet Registrations</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{totalShiftRegistrations}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Registration List */}
      <div className="px-6 mt-6">
        <h3 className="mb-4 text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FC0680]" />
          Daily Breakdown
        </h3>
        <div className="space-y-3">
          {dailyStats.map((day) => (
            <div
              key={day.date}
              className="bg-white rounded-xl p-4 shadow-sm border border-border"
            >
              {/* Date Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{formatDate(day.date)}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {day.totalRegistrations} total registrations
                  </p>
                </div>
                <div className="bg-[#FC0680]/10 text-[#FC0680] px-3 py-1.5 rounded-full">
                  <span className="font-medium text-sm">+{day.newNumbers} pts</span>
                </div>
              </div>

              {/* New vs Existing Stats */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-muted-foreground font-medium">New Numbers</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">{day.newNumbers}</p>
                  <p className="text-xs text-green-600 mt-0.5">✓ Points earned</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-muted-foreground font-medium">Existing Numbers</span>
                  </div>
                  <p className="text-lg font-bold text-gray-600">{day.existingNumbers}</p>
                  <p className="text-xs text-gray-500 mt-0.5">No points</p>
                </div>
              </div>

              {/* Manual vs Shift Breakdown */}
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground font-medium mb-2">Registration Method</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-purple-50 rounded-lg p-2 border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-xs text-muted-foreground font-medium">Manual</span>
                    </div>
                    <p className="text-base font-bold text-purple-600">{day.manualRegistrations}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Tablet className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs text-muted-foreground font-medium">Tablet</span>
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