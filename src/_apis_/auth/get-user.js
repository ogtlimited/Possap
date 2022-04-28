import getUrlString from '../../utils/get-url-string';
import { USERS } from '../../constants/api-routes';
import axiosInstance from '../../utils/auth-fetch';

export default async function fetchUsers() {
  const url = getUrlString(USERS);
  const response = await axiosInstance.get(url);

  if (!response.ok) {
    throw new Error(`Error occurred while trying to login user`);
  }

  return response.json();
}
