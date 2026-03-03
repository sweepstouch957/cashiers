// reward.service.ts
// Cashier-service: GET /cashier/rewards, GET /cashier/rewards/featured

import apiClient from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BackendReward {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string | null;
  pointsCost: number;
  priceUSD?: number;
  active: boolean;
  /** -1 = unlimited stock */
  quantity: number;
  featured: boolean;
  isFeaturedNow?: boolean;
  featuredStartDate?: string | null;
  featuredEndDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

/**
 * GET /cashier/rewards?storeId=&active=true
 * Returns all rewards (optionally filtered by storeId and active).
 */
export const getAllRewards = async (
  storeId?: string,
  activeOnly = true,
): Promise<BackendReward[]> => {
  const params: Record<string, string> = {};
  if (storeId) params.storeId = storeId;
  if (activeOnly) params.active = 'true';

  const res = await apiClient.get<BackendReward[]>('/cashier/rewards', { params });
  return res.data;
};

/**
 * GET /cashier/rewards/featured?storeId=
 * Returns the currently active featured reward, or null if none exists.
 */
export const getFeaturedReward = async (
  storeId?: string,
): Promise<BackendReward | null> => {
  const params: Record<string, string> = {};
  if (storeId) params.storeId = storeId;

  try {
    const res = await apiClient.get<BackendReward>('/cashier/rewards/featured', { params });
    return res.data;
  } catch (err: unknown) {
    // 404 means no featured reward is active right now — that's fine
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status === 404) return null;
    throw err;
  }
};

// ─── React Query Hooks ────────────────────────────────────────────────────────

/**
 * Returns all active rewards for the given store, sorted by pointsCost ascending.
 */
export const useAllRewards = (storeId?: string, activeOnly = true) => {
  return useQuery({
    queryKey: ['rewards', storeId, activeOnly],
    queryFn: async () => {
      const rewards = await getAllRewards(storeId, activeOnly);
      return [...rewards].sort((a, b) => a.pointsCost - b.pointsCost);
    },
    enabled: true,    // works even without storeId (loads store-agnostic rewards)
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Returns the current featured reward for the store, or null.
 */
export const useFeaturedReward = (storeId?: string) => {
  return useQuery({
    queryKey: ['featured-reward', storeId],
    queryFn: () => getFeaturedReward(storeId),
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
