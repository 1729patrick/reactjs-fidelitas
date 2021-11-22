import { useFetch } from '../hooks/useFetch';

export function useAchievements() {
  const { data, error, isLoading } = useFetch(`/achievements`);
  console.log('data', data);
  return {
    achievements: data,
    isError: error,
    isLoading,
  };
}
