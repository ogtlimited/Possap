/* eslint-disable prettier/prettier */
// const url = getUrlString(NIN, queryParams);
//   const response = await axios.post(url, );
import axios from 'axios';

const { useMutation } = require('react-query');

const PoliceExtractMutation = () => {
  const policeExtractMutation = useMutation((newPoliceExtract) => axios.post('api/police-extracts', newPoliceExtract));
  return policeExtractMutation;
};
export default PoliceExtractMutation;
