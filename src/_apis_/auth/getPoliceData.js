import axios from 'axios';
import axiosInstance from '../../utils/auth-fetch';
import getUrlString from '../../utils/get-url-string';
import { POLICEDATA } from '../../constants/api-routes';

export default async function getPoliceData() {
  const url = getUrlString(POLICEDATA);
  const response = await axios.get(url);
  return response;
}
