import { useQuery } from 'react-query';
import getTacticalSquad from '../_apis_/auth/getTacticalSquad';

export default function useTacticalSquad() {
  const { isFetching, data, error } = useQuery('police-data', getTacticalSquad, {
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });
  console.log(data);
  return { data: data?.data, isFetching, error };
}
