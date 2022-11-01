import axiosInstance from '../../utils/auth-fetch';
import getUrlString from '../../utils/get-url-string';
import { POLICEREQUESTS } from '../../constants/api-routes';

export default async function getPoliceRequests({ queryKey }) {
  const [_key, id] = queryKey;
  const url = getUrlString(`${POLICEREQUESTS}/${id}`);
  const response = await axiosInstance.get(url);
  return response;
}
