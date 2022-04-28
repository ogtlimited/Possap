import axios from 'axios';
import getUrlString from '../../utils/get-url-string';
import { REGISTER } from '../../constants/api-routes';

export default async function RegisterUser(data) {
  const url = getUrlString(REGISTER);
  console.log(data);
  const response = await axios.post(url, data);
  console.log(response);
  // if (!response.ok) {
  //   throw new Error(`Error occurred while trying to create user`);
  // }

  return response;
}
