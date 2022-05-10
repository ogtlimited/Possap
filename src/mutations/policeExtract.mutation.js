/* eslint-disable prettier/prettier */
// const url = getUrlString(NIN, queryParams);
//   const response = await axios.post(url, );

import axiosInstance from '../utils/auth-fetch';

import getUrlString from '../utils/get-url-string';

const { useMutation } = require('react-query');

const PoliceExtractMutation = () => {
  const url = getUrlString('/api/v1/police-extracts');
  const policeExtractMutation = useMutation((newPoliceExtract) => axiosInstance.post(url, newPoliceExtract));
  return policeExtractMutation;
};
export default PoliceExtractMutation;
