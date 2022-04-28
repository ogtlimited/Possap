import axios from 'axios';
import axiosInstance from '../../utils/auth-fetch';
import getUrlString from '../../utils/get-url-string';
import { NIN } from '../../constants/api-routes';

export default async function getNIN(nin) {
  const queryParams = {
    nin
  };
  const url = getUrlString(NIN, queryParams);
  const response = await axios.get(url);
  return response;

  // return null;
}
