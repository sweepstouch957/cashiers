import apiClient from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { Cashier } from '@/interfaces';

export const getCashiersByStore = async (
  storeId: string,
  limit = 50,
  page = 1
): Promise<Cashier[]> => {
  try {
    const response = await apiClient.get(`/cashier/cashiers`, {
      params: { storeId, limit, page },
    });
    return response.data.data || response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching cashiers:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener los cajeros');
  }
};

/** Fetch a single cashier by ID — includes participationPoints */
export const getCashierById = async (cashierId: string): Promise<Cashier & { participationPoints: number }> => {
  const response = await apiClient.get(`/cashier/cashiers/${cashierId}`);
  return response.data;
};

// ─── React Query Hooks ─────────────────────────────────────────────────────────

export const useCashiersByStore = (storeId: string, limit = 50, page = 1) => {
  return useQuery({
    queryKey: ['cashiers', storeId, limit, page],
    queryFn: () => getCashiersByStore(storeId, limit, page),
    enabled: !!storeId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/** Hook to get the logged-in cashier's full profile including live points */
export const useCashierProfile = (cashierId?: string) => {
  return useQuery({
    queryKey: ['cashier', cashierId],
    queryFn: () => getCashierById(cashierId!),
    enabled: !!cashierId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

