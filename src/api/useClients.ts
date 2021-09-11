import { useFetch } from '../hooks/useFetch';

export function useClients() {
  const { data, error, isLoading } = useFetch(`/user/restaurantUsers`);

  return {
    clients: data,
    isError: error,
    isLoading,
  };
}
