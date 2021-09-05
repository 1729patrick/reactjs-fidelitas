import { useFetch } from '../hooks/useFetch';

export function useProducts() {
  const { data, error, isLoading } = useFetch('/products');

  return {
    products: data,
    isError: error,
    isLoading,
  };
}
