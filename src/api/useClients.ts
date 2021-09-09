import { useFetch } from '../hooks/useFetch';

export function useClients() {
  const { data, error, isLoading } = useFetch(`/restaurantUsers`);

  return {
    clients: data,
    isError: error,
    isLoading,
  };
}
