import { useFetch } from '../hooks/useFetch';

export function useClients() {
  const { data, error, isLoading } = useFetch(`/restaurants/users`);

  return {
    clients: data,
    isError: error,
    isLoading,
  };
}
