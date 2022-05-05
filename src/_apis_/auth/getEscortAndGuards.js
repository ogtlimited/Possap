import axios from 'axios';
import getUrlString from '../../utils/get-url-string';
import { ALLESCORTSANDSERVICES } from '../../constants/api-routes';

export default async function getEscortAndGuards() {
  const url = getUrlString(ALLESCORTSANDSERVICES);
  const response = await axios.get(url);
  return response;
}
