// tracking.service.ts
// Cashier-service: /api/cashier/tracking/*

import apiClient from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { DailyStats } from '@/interfaces';

// ─── Raw shapes from backend ─────────────────────────────────────────────────

export interface DailyTrackingRecord {
  _id: string;
  cashierId: string;
  storeId: string;
  date: string;          // YYYY-MM-DD
  dayOfWeek: string;
  newNumbers: number;
  existingNumbers: number;
  pointsEarned: number;
  totalParticipations: number;
}

export interface TodaySummary {
  date: string;
  newNumbers: number;
  existingNumbers: number;
  pointsEarned: number;
  totalParticipations: number;
}

export interface WeeklyOverview {
  dateRange: { start: string; end: string };
  summary: {
    newNumbers: number;
    existingNumbers: number;
    pointsEarned: number;
    totalParticipations: number;
  };
  dailyBreakdown: DailyTrackingRecord[];
}

// ─── Mappers ─────────────────────────────────────────────────────────────────

/** Maps backend DailyTrackingRecord → UI DailyStats shape */
export function toDailyStats(record: DailyTrackingRecord): DailyStats {
  return {
    date: record.date,
    totalRegistrations: record.totalParticipations,
    newNumbers: record.newNumbers,
    existingNumbers: record.existingNumbers,
    pointsEarned: record.pointsEarned,
    // cashier-service doesn't track manual vs shift separately; default to 0
    manualRegistrations: 0,
    shiftRegistrations: record.totalParticipations,
  };
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export const getDailyTracking = async (
  cashierId: string,
  storeId: string,
  dateStart?: string,
  dateEnd?: string
): Promise<DailyStats[]> => {
  const params: Record<string, string> = { cashierId, storeId };
  if (dateStart) params.dateStart = dateStart;
  if (dateEnd) params.dateEnd = dateEnd;

  const response = await apiClient.get('/cashier/tracking/daily', { params });
  const records: DailyTrackingRecord[] = response.data;
  return records.map(toDailyStats);
};

export const getTodaySummary = async (
  cashierId: string,
  storeId: string
): Promise<TodaySummary> => {
  const response = await apiClient.get('/cashier/tracking/today', {
    params: { cashierId, storeId },
  });
  return response.data;
};

export const getWeeklyOverview = async (
  cashierId: string,
  storeId: string
): Promise<WeeklyOverview> => {
  const response = await apiClient.get('/cashier/tracking/weekly', {
    params: { cashierId, storeId },
  });
  return response.data;
};

// ─── React Query Hooks ─────────────────────────────────────────────────────────

export const useDailyTracking = (cashierId?: string, storeId?: string) => {
  return useQuery({
    queryKey: ['tracking-daily', cashierId, storeId],
    queryFn: () => getDailyTracking(cashierId!, storeId!),
    enabled: !!cashierId && !!storeId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useTodaySummary = (cashierId?: string, storeId?: string) => {
  return useQuery({
    queryKey: ['tracking-today', cashierId, storeId],
    queryFn: () => getTodaySummary(cashierId!, storeId!),
    enabled: !!cashierId && !!storeId,
    staleTime: 1000 * 30, // 30 seconds
  });
};

export const useWeeklyOverview = (cashierId?: string, storeId?: string) => {
  return useQuery({
    queryKey: ['tracking-weekly', cashierId, storeId],
    queryFn: () => getWeeklyOverview(cashierId!, storeId!),
    enabled: !!cashierId && !!storeId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
