import axiosInstance from '../../utils/auth-fetch';
import getUrlString from '../../utils/get-url-string';
import { POLICEREQUESTS } from '../../constants/api-routes';

export default async function getCharacterCertificates() {
  const url = getUrlString(POLICEREQUESTS);
  const response = await axiosInstance.get(url);
  return response;
}
