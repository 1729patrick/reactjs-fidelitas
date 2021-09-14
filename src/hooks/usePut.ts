import useSWR, { useSWRConfig } from 'swr';
import api from '../utils/Api';

const fetcher = (url: string) => {
  return api.put(url).then(res => res.data);
};

export function usePut<Data = any, Error = any>(url: string | null) {
  const { data, error } = useSWR<Data, Error>(url, fetcher, {
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
  });

  return { data, error, isLoading: !error && !data };
}
