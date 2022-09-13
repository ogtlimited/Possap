import { useMutation } from 'react-query';
import getUrlString from '../utils/get-url-string';
import axiosInstance from '../utils/auth-fetch';

const CreateEGService = () => {
  const url = getUrlString('/api/v1/eag');
  const mutation = useMutation((newEGService) => axiosInstance.post(url, newEGService));
  return mutation;
};

export default CreateEGService;
