import axios from 'axios';
import { useQuery } from 'react-query';
import getUrlString from '../utils/get-url-string';

async function getEGService(id) {
  const url = getUrlString(`/api/v1/eag/${id}`);
  const response = await axios.get(url);
  return response;
}

export default function useEGServiceById(id) {
  const { isFetching, data, error } = useQuery(['police-data', id], () => getEGService(id));
  return { data: data?.data, isFetching, error };
}
