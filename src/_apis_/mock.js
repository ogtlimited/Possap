import AxiosMockAdapter from 'axios-mock-adapter';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------
console.log('mock');
const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 0
});

export default axiosMockAdapter;
