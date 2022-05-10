import { useContext } from 'react';
import { ServiceFormContext } from '../contexts/FormContext';

// ----------------------------------------------------------------------

const useServiceForm = () => useContext(ServiceFormContext);

export default useServiceForm;
