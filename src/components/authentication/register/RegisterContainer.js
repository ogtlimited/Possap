/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
import RegisterOneForm from './Register-One';
import RegisterForm from './RegisterForm';

// ----------------------------------------------------------------------

export default function RegisterContainer() {
  const isMountedRef = useIsMountedRef();
  const [currentStep, setcurrentStep] = useState('one');
  const [formOne, setformOne] = useState(null);
  const [formTwo, setformTwo] = useState(null);

  return (
    <Stack spacing={3}>
      {currentStep === 'one' ? (
        <RegisterOneForm formSubmit={setformOne} setcurrentStep={setcurrentStep} />
      ) : (
        <RegisterForm formSubmit={setformTwo} setcurrentStep={setcurrentStep} />
      )}
    </Stack>
  );
}
