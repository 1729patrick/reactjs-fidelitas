import { useFetch } from '../hooks/useFetch';

export function useProducts() {
  const { data, error, isLoading } = useFetch('/products');

  return {
    products: data,
    isError: error,
    isLoading,
  };
}

export function useProduct(id: number) {
  const { data, error, isLoading } = useFetch(`/products/${id}`);

  return {
    product: data,
    isError: error,
    isLoading,
  };
}
