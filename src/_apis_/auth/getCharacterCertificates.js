import axiosInstance from '../../utils/auth-fetch';
import getUrlString from '../../utils/get-url-string';
import { ALLCHARACTERCERTIFICATES } from '../../constants/api-routes';

export default async function getCharacterCertificates() {
  const url = getUrlString(ALLCHARACTERCERTIFICATES);
  const response = await axiosInstance.get(url);
  return response;
}
