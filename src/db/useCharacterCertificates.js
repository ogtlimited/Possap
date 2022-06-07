import { useQuery } from 'react-query';
import getCharacterCertificates from '../_apis_/auth/getCharacterCertificates';

export default function useCharacterCertificates() {
  const { isFetching, data, error } = useQuery('character-certificates', getCharacterCertificates, {
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  return { data, isFetching, error };
}
