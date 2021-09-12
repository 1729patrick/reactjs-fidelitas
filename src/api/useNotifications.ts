import { useFetch } from '../hooks/useFetch';

export function useNotifications() {
  const { data, error, isLoading } = useFetch('/restaurants/notifications/1');

  return {
    notifications: data,
    isError: error,
    isLoading,
  };
}
