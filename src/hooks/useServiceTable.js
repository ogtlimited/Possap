import { useState, useEffect } from 'react';
import {
  CharacterCertificateTable,
  EGTable,
  PoliceExtractTable
} from '../components/_external-pages/services/constants';

// ----------------------------------------------------------------------

export default function useService(key) {
  const [value, setValue] = useState(() => {
    let val = '';
    switch (key) {
      case 1:
        val = PoliceExtractTable;
        break;
      case 2:
        val = CharacterCertificateTable;
        break;
      case 3:
        val = EGTable;
        break;

      default:
        val = PoliceExtractTable;
        break;
    }
    return val;
  });

  return [value];
}
