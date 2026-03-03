// participation.service.ts
// Cashier-service: /cashier/participations/*

import apiClient from '@/lib/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ─── Response shapes ──────────────────────────────────────────────────────────

export interface CashierSummary {
  cashier: {
    _id: string;
    firstName?: string;
    lastName?: string;
    participationPoints?: number;
  };
  participations: {
    total: number;
    newCustomers: number;
    existingCustomers: number;
  };
  pointsFromParticipations: number; // raw earned (no deductions)
  currentBalance: number;           // after reward claims — use this for totalPoints
  pointRates: {
    newCustomer: number;
    existingCustomer: number;
  };
}

export interface TrackParticipationPayload {
  cashierId: string;
  storeId: string;
  isNewUser?: boolean;
  sweepstakeParticipantId?: string;
  registeredAt?: string;
}

export interface TrackParticipationResponse {
  message: string;
  isNew: boolean;
  pointsEarned: number;
  withinWorkHours: boolean;
  date: string;
}

export interface ParticipationRecord {
  _id: string;
  registeredBy: string;
  store: string;
  isNewUser: boolean;
  pointsEarned: number;
  registeredAt: string;
  source: string;
  customer?: {
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface ListParticipationsResponse {
  total: number;
  page: number;
  data: ParticipationRecord[];
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

/** GET /cashier/participations/summary — source of truth for totalPoints */
export const getCashierSummary = async (
  cashierId: string,
  storeId?: string
): Promise<CashierSummary> => {
  const params: Record<string, string> = { cashierId };
  if (storeId) params.storeId = storeId;
  const res = await apiClient.get('/cashier/participations/summary', { params });
  return res.data;
};

/** POST /cashier/participations/track — record a participation + update points */
export const trackParticipation = async (
  payload: TrackParticipationPayload
): Promise<TrackParticipationResponse> => {
  const res = await apiClient.post('/cashier/participations/track', payload);
  return res.data;
};

/** POST /cashier/participations/sync — recalculate points from real data */
export const syncCashierPoints = async (cashierId: string) => {
  const res = await apiClient.post('/cashier/participations/sync', { cashierId });
  return res.data;
};

/** GET /cashier/participations — list records */
export const listParticipations = async (
  cashierId: string,
  storeId?: string,
  startDate?: string,
  endDate?: string,
  limit = 50,
  page = 1
): Promise<ListParticipationsResponse> => {
  const params: Record<string, string | number> = { cashierId, limit, page };
  if (storeId) params.storeId = storeId;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  const res = await apiClient.get('/cashier/participations', { params });
  return res.data;
};

// ─── React Query Hooks ─────────────────────────────────────────────────────────

/**
 * Primary hook for totalPoints.
 * Returns the cashier summary including currentBalance (points after reward deductions)
 * and pointsFromParticipations (raw earned).
 * Refreshed every 30 seconds.
 */
export const useCashierSummary = (cashierId?: string, storeId?: string) => {
  return useQuery({
    queryKey: ['cashier-summary', cashierId, storeId],
    queryFn: () => getCashierSummary(cashierId!, storeId),
    enabled: !!cashierId,
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // background refresh every minute
  });
};

export const useListParticipations = (
  cashierId?: string,
  storeId?: string,
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryKey: ['participations', cashierId, storeId, startDate, endDate],
    queryFn: () => listParticipations(cashierId!, storeId, startDate, endDate),
    enabled: !!cashierId,
    staleTime: 1000 * 60 * 2,
  });
};

/**
 * Track a participation — invalidates summary + tracking queries so points
 * and today's stats update immediately.
 */
export const useTrackParticipation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TrackParticipationPayload) => trackParticipation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashier-summary'] });
      queryClient.invalidateQueries({ queryKey: ['tracking-daily'] });
      queryClient.invalidateQueries({ queryKey: ['tracking-today'] });
      queryClient.invalidateQueries({ queryKey: ['cashier'] }); // useCashierProfile
      queryClient.invalidateQueries({ queryKey: ['participations'] });
    },
  });
};

export const useSyncCashierPoints = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cashierId: string) => syncCashierPoints(cashierId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashier-summary'] });
      queryClient.invalidateQueries({ queryKey: ['cashier'] });
    },
  });
};
