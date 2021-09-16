import { useFetch } from '../hooks/useFetch';

export function useFacilities() {
  const { data, error, isLoading } = useFetch('/facilities');

  return {
    facilities: data,
    isError: error,
    isLoading,
  };
}
