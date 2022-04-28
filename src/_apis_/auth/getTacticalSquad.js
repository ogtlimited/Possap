import axios from 'axios';
import axiosInstance from '../../utils/auth-fetch';
import getUrlString from '../../utils/get-url-string';
import { TACTICALPATH } from '../../constants/api-routes';

export default async function getTacticalSquad() {
  const url = getUrlString(TACTICALPATH);
  const response = await axios.get(url);
  return response;
}
