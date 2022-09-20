import axios from 'axios';
import getUrlString from '../../utils/get-url-string';
import { SERVICEPATH } from '../../constants/api-routes';

export default async function CreateService(data) {
  const url = getUrlString(SERVICEPATH);
  console.log(data);
  const response = await axios.post(url, data);

  // if (!response.ok) {
  //   throw new Error(`Error occurred while trying to login user`);
  // }

  return response;
}

export async function GetServices() {
  const url = getUrlString(SERVICEPATH);
  const response = await axios.get(url);
  return response;
}
