// redeem.service.ts
// Cashier-service: /api/cashier/rewards, /api/cashier/reward-history, /api/cashier/participations

import apiClient from '@/lib/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { RedeemedReward } from '@/interfaces';

// ─── Raw shapes from backend ─────────────────────────────────────────────────

export interface RewardClaimRecord {
  _id: string;
  cashierId: string;
  rewardId: {
    _id: string;
    name: string;
    imageUrl?: string;
    pointsCost: number;
  } | string;
  storeId: string;
  pointsSpent: number;
  status: 'pending' | 'fulfilled' | 'cancelled';
  claimedAt: string;
}

export interface ClaimHistoryResponse {
  total: number;
  page: number;
  data: RewardClaimRecord[];
}

export interface RegisterParticipationPayload {
  cashierId: string;
  storeId: string;
  phoneNumber: string;
  customerName?: string;
  isNewNumber: boolean;
  source: 'manual' | 'tablet' | 'tablet_registration';
}

export interface ParticipationResponse {
  message: string;
  participation: object;
  pointsAwarded: number;
}

// ─── Mappers ─────────────────────────────────────────────────────────────────

function toRedeemedReward(record: RewardClaimRecord): RedeemedReward {
  const reward = record.rewardId;
  const isPopulated = typeof reward === 'object' && reward !== null;

  return {
    id: record._id,
    name: isPopulated ? (reward as { name: string }).name : 'Reward',
    description: '',
    pointsSpent: record.pointsSpent,
    redeemedDate: record.claimedAt.split('T')[0],
    imageUrl: isPopulated ? ((reward as { imageUrl?: string }).imageUrl ?? '') : '',
  };
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export const getClaimHistory = async (
  cashierId: string,
  storeId?: string,
  limit = 50,
  page = 1
): Promise<RedeemedReward[]> => {
  const params: Record<string, string | number> = { cashierId, limit, page };
  if (storeId) params.storeId = storeId;

  const response = await apiClient.get<ClaimHistoryResponse>('/cashier/reward-history', { params });
  return (response.data.data ?? []).map(toRedeemedReward);
};

export const claimReward = async (rewardId: string, cashierId: string): Promise<{ remainingPoints: number }> => {
  const response = await apiClient.post(`/cashier/rewards/${rewardId}/claim`, { cashierId });
  return response.data;
};

export const registerParticipation = async (
  payload: RegisterParticipationPayload
): Promise<ParticipationResponse> => {
  const response = await apiClient.post('/cashier/participations', payload);
  return response.data;
};

// ─── React Query Hooks ─────────────────────────────────────────────────────────

export const useClaimHistory = (cashierId?: string, storeId?: string) => {
  return useQuery({
    queryKey: ['claim-history', cashierId, storeId],
    queryFn: () => getClaimHistory(cashierId!, storeId),
    enabled: !!cashierId,
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
};

export const useClaimReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ rewardId, cashierId }: { rewardId: string; cashierId: string }) =>
      claimReward(rewardId, cashierId),
    onSuccess: () => {
      // Invalidate points (cashier data) and claim history after a reward is claimed
      queryClient.invalidateQueries({ queryKey: ['cashier'] });
      queryClient.invalidateQueries({ queryKey: ['claim-history'] });
      // Also refresh rewards list, featured reward, and next-goal progress
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
      queryClient.invalidateQueries({ queryKey: ['featured-reward'] });
      queryClient.invalidateQueries({ queryKey: ['next-goal'] });
    },
  });
};

export const useRegisterParticipation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RegisterParticipationPayload) => registerParticipation(payload),
    onSuccess: () => {
      // Invalidate tracking + cashier (points) after a new participation
      queryClient.invalidateQueries({ queryKey: ['tracking-daily'] });
      queryClient.invalidateQueries({ queryKey: ['tracking-today'] });
      queryClient.invalidateQueries({ queryKey: ['tracking-weekly'] });
      queryClient.invalidateQueries({ queryKey: ['cashier'] });
    },
  });
};

// ─── Next Goal ────────────────────────────────────────────────────────────────

export interface BackendReward {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  pointsCost: number;
  priceUSD?: number;
  active?: boolean;
  quantity?: number;
}

export interface NextGoalResponse {
  currentBalance: number;
  rewardsUnlocked: BackendReward[];
  nextGoal: {
    reward: BackendReward;
    pointsNeeded: number;
    progressPercent: number;
    registrationsNeeded: number;
    message: string;        // server-generated motivational message
  } | null;
}

export const getNextGoal = async (
  cashierId: string,
  storeId?: string
): Promise<NextGoalResponse> => {
  const params: Record<string, string> = { cashierId };
  if (storeId) params.storeId = storeId;
  const res = await apiClient.get<NextGoalResponse>('/cashier/rewards/next-goal', { params });
  return res.data;
};

/**
 * Fetches the cashier's next reward goal from /cashier/rewards/next-goal.
 * Refreshes every 60 s and after any reward claim.
 */
export const useNextGoal = (cashierId?: string, storeId?: string) => {
  return useQuery({
    queryKey: ['next-goal', cashierId, storeId],
    queryFn: () => getNextGoal(cashierId!, storeId),
    enabled: !!cashierId,
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60,
  });
};
