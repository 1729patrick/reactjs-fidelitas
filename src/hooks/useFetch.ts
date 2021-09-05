import useSWR from 'swr';
import api from '../utils/Api';

const fetcher = (url: string) => {
  return api.get(url).then(res => res.data);
};

export function useFetch<Data = any, Error = any>(url: string | null) {
  const { data, error } = useSWR<Data, Error>(url, fetcher, {
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
  });

  return { data, error, isLoading: !error && !data };
}
