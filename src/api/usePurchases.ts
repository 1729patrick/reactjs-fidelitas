import { useFetch } from '../hooks/useFetch';

export function usePurchases() {
  const { data, error, isLoading } = useFetch('/purchases');

  return {
    purchases: data,
    isError: error,
    isLoading,
  };
}

export function usePurchase(id: number) {
  const { data, error, isLoading } = useFetch(`/purchases/${id}`);

  return {
    purchase: data,
    isError: error,
    isLoading,
  };
}
