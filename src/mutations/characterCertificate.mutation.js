/* eslint-disable prettier/prettier */
import { useMutation } from 'react-query';
import { POLICEREQUESTS } from '../constants/api-routes';
import axiosInstance from '../utils/auth-fetch';
import getUrlString from '../utils/get-url-string';

const CharacterCertificateMutation = () => {
  const url = getUrlString(POLICEREQUESTS);
  const characterCertificateMutation = useMutation((newCharacterCertificate) =>
    axiosInstance.post(url, newCharacterCertificate)
  );

  return characterCertificateMutation;
};
export default CharacterCertificateMutation;
