import axios from 'axios';
import getUrlString from '../../utils/get-url-string';
import { ALLPOLICEEXTRACTS } from '../../constants/api-routes';

export default async function getPoliceExtracts() {
  const url = getUrlString(ALLPOLICEEXTRACTS);
  const response = await axios.get(url);
  return response;
}
