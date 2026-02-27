import apiClient from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { Cashier } from '@/interfaces';



export const getCashiersByStore = async (
  storeId: string,
  limit = 50,
  page = 1
): Promise<Cashier[]> => {
  try {
    const response = await apiClient.get(`/auth/cashiers`, {
      params: {
        storeId,
        limit,
        page,
      },
    });

    // Ajusta según la estructura exacta del backend
    // Ejemplo: { success: true, data: [...] }
    return response.data.data || response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching cashiers:', error);
    throw new Error(
      error.response?.data?.message || 'Error al obtener los cajeros'
    );
  }
};


export const useCashiersByStore = (storeId: string, limit = 50, page = 1) => {
  return useQuery({
    queryKey: ['cashiers', storeId, limit, page],
    queryFn: () => getCashiersByStore(storeId, limit, page),
    enabled: !!storeId, // Solo ejecuta si hay storeId
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
