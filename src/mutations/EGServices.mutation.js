import axios from 'axios';
import { useMutation } from 'react-query';

const CreateEGService = () => {
  const mutation = useMutation((newEGService) => axios.post('/api/v1/eag', newEGService));
  return mutation;
};

export default CreateEGService;
