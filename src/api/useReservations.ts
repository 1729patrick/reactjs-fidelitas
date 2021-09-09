import { useFetch } from '../hooks/useFetch';

export function useReservations() {
  const { data, error, isLoading } = useFetch('/user/reservations');

  return {
    reservations: data,
    isError: error,
    isLoading,
  };
}
