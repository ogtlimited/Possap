/* eslint-disable prettier/prettier */
import axios from 'axios';

const { useMutation } = require('react-query');

const CharacterCertificateMutation = () => {
  const characterCertificateMutation = useMutation((newCharacterCertificate) =>
    axios.post('/', newCharacterCertificate)
  );
  return characterCertificateMutation;
};
export default CharacterCertificateMutation;
