/* eslint-disable prettier/prettier */
import axios from 'axios';
import getUrlString from '../utils/get-url-string';

const { useMutation } = require('react-query');

const CharacterCertificateMutation = () => {
  const url = getUrlString('/api/police-character-certificate');
  const characterCertificateMutation = useMutation((newCharacterCertificate) =>
    axios.post(url, newCharacterCertificate)
  );
  return characterCertificateMutation;
};
export default CharacterCertificateMutation;
