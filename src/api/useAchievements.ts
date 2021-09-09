import { useFetch } from '../hooks/useFetch';

export function useAchievements() {
  const { data, error, isLoading } = useFetch(`/achievements`);

  return {
    achievements: data,
    isError: error,
    isLoading,
  };
}
