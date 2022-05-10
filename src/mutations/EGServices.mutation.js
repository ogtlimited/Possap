import axios from 'axios';
import { useMutation } from 'react-query';
import getUrlString from '../utils/get-url-string';

const CreateEGService = () => {
  const url = getUrlString('/api/v1/eag');
  const mutation = useMutation((newEGService) => axios.post(url, newEGService));
  return mutation;
};

export default CreateEGService;
