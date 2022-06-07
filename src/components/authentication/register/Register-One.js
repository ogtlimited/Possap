/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@material-ui/core/styles';
import {
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Alert,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Box
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { sentenceCase } from 'change-case';
import useNIN from '../../../db/useNIN';
import { MotionInView, varFadeIn, varFadeInRight, varFadeInUp } from '../../animate';
import { UploadSingleFile } from '../../upload';
// hooks

import { IDENTIFICATIONTYPE } from '../../../constants/register-constants';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
import { GetNIN } from '../../../_apis_/auth';
// Login: VSSCAAA
// Email: VS_AAAbdulwahab@iga.gov.bh
// Password : Iga@2022
// ----------------------------------------------------------------------
const OverlayStyle = styled(motion.div)({
  outline: 'none',
  overflow: 'hidden',
  textalign: 'center',
  position: 'relative',
  alignAtems: 'center',
  justifyContent: 'center',
  height: '300px',
  width: '100%',
  padding: '8px',
  borderRadius: '8px',
  backgroundImage: "linear-gradient( rgba(22, 28, 36, 0.8), rgba(0, 0, 0, 0.9) ),url('/static/home/PossapLogo.svg')",
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right bottom',
  border: '1px dashed rgba(145, 158, 171, 0.32)'
});

const IDImgStyle = styled(motion.img)(({ theme }) => ({
  bottom: 100,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    width: 'auto'
  }
}));
export default function RegisterOneForm({ setcurrentStep, formSubmit, setverfiedData }) {
  //   const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  //   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [idVerified, setidVerified] = useState(false);
  const [ninData, setninData] = useState(null);
  const [errorMsg, seterrorMsg] = useState(null);
  const [file, setFile] = useState(null);
  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const handleIDChange = async (value) => {
    seterrorMsg(null);
    if (value.length === 11) {
      try {
        const res = await GetNIN(value);
        setninData(res.data.data);
        setverfiedData(res.data.data);
        setidVerified(true);
      } catch (error) {
        seterrorMsg(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };

  const RegisterSchema = Yup.object().shape({
    userType: Yup.string().required('User type is required'),
    identificationType: Yup.string().required('ID type is required'),
    identificationNumber: Yup.string().required('ID No is required')
    // identificationDoc: Yup.string().required('Document is required')
  });

  const formik = useFormik({
    initialValues: {
      userType: '',
      identificationType: '',
      identificationNumber: '',
      identificationDoc: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        console.log(values);
        formSubmit(values);
        setcurrentStep('two');
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Who are you ?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="userType"
                onChange={(event) => {
                  console.log(event.currentTarget.value);
                  setFieldValue('userType', event.currentTarget.value);
                  console.log(values);
                }}
              >
                <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                <FormControlLabel value="Corporate/NGOs" control={<Radio />} label="Corporate/NGOs" />
                <FormControlLabel value="MDAs" control={<Radio />} label="MDAs" />
              </RadioGroup>
            </FormControl>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              select
              fullWidth
              label="ID Type"
              placeholder="ID Type"
              {...getFieldProps('identificationType')}
              SelectProps={{ native: true }}
              error={Boolean(touched.identificationType && errors.identificationType)}
              helperText={touched.identificationType && errors.identificationType}
            >
              <option value="" />
              {IDENTIFICATIONTYPE.map((option) => (
                <option key={option.code} value={option.label}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Stack>

          <TextField
            fullWidth
            autoComplete="id"
            type="text"
            label="ID Number"
            {...getFieldProps('identificationNumber')}
            onChange={(event) => {
              handleIDChange(event.currentTarget.value);
              console.log(event.currentTarget.value);
              setFieldValue('identificationNumber', event.currentTarget.value);
              console.log(values);
            }}
            error={Boolean(touched.identificationNumber && errors.identificationNumber)}
            helperText={touched.identificationNumber && errors.identificationNumber}
          />
          {/* {values.identificationType === IDENTIFICATIONTYPE[1].label ||
          values.identificationType === IDENTIFICATIONTYPE[2].label ? (
            <MotionInView variants={varFadeInUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <UploadSingleFile label="Add an identification file here." file={file} onDrop={handleDropSingleFile} />
              </Stack>
            </MotionInView>
          ) : null} */}
          {idVerified ? (
            <MotionInView variants={varFadeInUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <OverlayStyle>
                  <motion.div variants={varFadeInRight}>
                    <Typography component="p" variant="h4" sx={{ color: 'success.main' }}>
                      FEDERAL REPUBLIC OF NIGERIA
                    </Typography>
                    <Typography variant="p" sx={{ color: 'common.white' }}>
                      DIGITAL IDENTITY CARD
                    </Typography>
                    <Stack direction={{ xs: 'row', sm: 'row', justifyContent: 'space-between' }} spacing={6}>
                      <div>
                        <Typography component="p" variant="h6" pt={2} sx={{ color: 'common.white' }}>
                          <Typography variant="b" sx={{ color: 'common.white' }}>
                            Surname <br />{' '}
                            <Typography variant="b" sx={{ color: 'primary.main' }}>
                              {ninData.surname}
                            </Typography>
                          </Typography>
                        </Typography>
                        <Typography component="p" variant="h6" pt={2} sx={{ color: 'common.white' }}>
                          <Typography variant="b" sx={{ color: 'common.white' }}>
                            Given name <br />{' '}
                            <Typography variant="b" sx={{ color: 'primary.main' }}>
                              {ninData.firstname} {ninData.middlename}
                            </Typography>
                          </Typography>
                        </Typography>
                      </div>
                      <img style={{ width: '80px' }} src={`data:image/jpeg;base64,${ninData.photo}`} alt="User" />
                    </Stack>
                  </motion.div>
                  <Stack direction={{ xs: 'row', sm: 'row' }} spacing={6}>
                    <Typography component="p" variant="h6" pt={2} sx={{ color: 'common.white' }}>
                      <Typography variant="b" sx={{ color: 'common.white' }}>
                        Date of Birth <br />{' '}
                        <Typography variant="b" sx={{ color: 'primary.main' }}>
                          {ninData.birthdate}
                        </Typography>
                      </Typography>
                    </Typography>
                    <Typography component="p" variant="h6" pt={2} sx={{ color: 'common.white' }}>
                      <Typography variant="b" sx={{ color: 'common.white' }}>
                        Nationality <br />{' '}
                        <Typography variant="b" sx={{ color: 'primary.main' }}>
                          {sentenceCase(ninData.birthcountry)}
                        </Typography>
                      </Typography>
                    </Typography>
                    <Typography component="p" variant="h6" pt={2} sx={{ color: 'common.white' }}>
                      <Typography variant="b" sx={{ color: 'common.white' }}>
                        Sex <br />{' '}
                        <Typography variant="b" sx={{ color: 'primary.main' }}>
                          {sentenceCase(ninData.gender)}
                        </Typography>
                      </Typography>
                    </Typography>
                  </Stack>
                </OverlayStyle>
                {/* <UploadSingleFile label="Add an identification file here." file={file} onDrop={handleDropSingleFile} /> */}
              </Stack>
            </MotionInView>
          ) : null}

          <LoadingButton
            fullWidth
            disabled={!idVerified}
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Next
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
