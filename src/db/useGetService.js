import { useQuery } from 'react-query';
import { GetServices } from '../_apis_/auth/service';

export default function useServicesData() {
  const { isFetching, data, error } = useQuery('all-services', GetServices, {
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });
  return { data, isFetching, error };
}
