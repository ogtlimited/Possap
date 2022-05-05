import axios from 'axios';
import getUrlString from '../../utils/get-url-string';
import { ALLCHARACTERCERTIFICATES } from '../../constants/api-routes';

export default async function getCharacterCertificates() {
  const url = getUrlString(ALLCHARACTERCERTIFICATES);
  const response = await axios.get(url);
  return response;
}
