import { useFetch } from '../hooks/useFetch';

export function useReservations() {
  const { data, error, isLoading } = useFetch('/restaurants/reservations');

  return {
    reservations: data,
    isError: error,
    isLoading,
  };
}
