import { useFetch } from '../hooks/useFetch';

export function useRestaurantFacilities() {
  const { data, error, isLoading } = useFetch('/restaurants/facilities');

  return {
    restaurantFacilities: data,
    isError: error,
    isLoading,
  };
}
