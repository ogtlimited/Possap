import axiosInstance from '../../utils/auth-fetch';
import getUrlString from '../../utils/get-url-string';
import { ALLPOLICEEXTRACTS } from '../../constants/api-routes';

export default async function getPoliceExtracts() {
  const url = getUrlString(ALLPOLICEEXTRACTS);
  const response = await axiosInstance.get(url);
  return response;
}
