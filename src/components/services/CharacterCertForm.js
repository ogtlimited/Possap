import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack5';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import NaijaStates from 'naija-state-local-government';
// material
import {
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  Autocomplete,
  MenuItem,
  ListItemText,
  OutlinedInput,
  Select,
  FormControl,
  RadioGroup,
  Box,
  FormControlLabel,
  FormLabel,
  Divider,
  InputLabel,
  Radio
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import arrowBackFill from '@iconify/icons-eva/arrow-back-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { getFormOptions } from '../../utils/getFormOptions';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { MIconButton } from '../@material-extend';
import { CCERTREQUEST, INQUIRYREASON } from './form-contants';
import { countries } from './countries';
// ----------------------------------------------------------------------

export default function CharacterCertForm() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    extractCategory: Yup.string().required('User type is required'),
    documentLost: Yup.string().required('ID type is required'),
    extractReason: Yup.string().required('ID No is required'),
    dateReported: Yup.string().required('ID No is required'),
    wasReported: Yup.string().required('ID No is required'),
    courtAffidavit: Yup.string().required('ID No is required'),
    affidavitNumber: Yup.string().required('ID No is required'),
    extractLga: Yup.string().required('ID No is required'),
    extractPoliceDivision: Yup.string().required('ID No is required'),
    status: Yup.string().required('ID No is required')
  });

  const formik = useFormik({
    initialValues: {
      requestType: '',
      reasonForInquiry: '',
      stateOfOrigin: '',
      placeOfBirth: '',
      dateOfBirth: '',
      destinationCountry: '',
      passportNumber: '',
      placeOfIssuance: '',
      dateOfIssuance: '',
      hasBeenConvicted: '',
      convictionHistory: '',
      passportPhotograph: '',
      passportBioDataPage: '',
      certificateRequestCommand: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        console.log(values);
        // await mutation.mutate(values);
        enqueueSnackbar('Form submitted success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        // resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <InputLabel id="demo-multiple-name-label">Select Category of Extract*</InputLabel>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Request Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...getFieldProps('requestType')}
              error={Boolean(touched.requestType && errors.requestType)}
              helperText={touched.requestType && errors.requestType}
              label="Select a request type"
            >
              {CCERTREQUEST.map((val) => (
                <MenuItem value={val}>{val}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Reason for Inquiry*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...getFieldProps('reasonForInquiry')}
              error={Boolean(touched.reasonForInquiry && errors.reasonForInquiry)}
              helperText={touched.reasonForInquiry && errors.reasonForInquiry}
              label="Select a reason."
            >
              {INQUIRYREASON.map((val) => (
                <MenuItem value={val}>{val}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              onChange={(event, newValue) => {
                setFieldValue(newValue);
              }}
              onInputChange={(event, newValue) => {
                console.log(newValue);
                setFieldValue('stateOfOrigin', newValue);
              }}
              id="combo-box-demo"
              options={getFormOptions(NaijaStates.states())}
              // {...getFieldProps('state')}
              error={Boolean(touched.stateOfOrigin && errors.stateOfOrigin)}
              helperText={touched.stateOfOrigin && errors.stateOfOrigin}
              renderInput={(params) => <TextField {...params} label="State of origin" />}
            />
          </FormControl>
          <Stack direction={{ xs: 'column', sm: 'row' }} py={3} spacing={2}>
            <TextField
              fullWidth
              type="text"
              label="Place of birth"
              {...getFieldProps('placeOfBirth')}
              error={Boolean(touched.placeOfBirth && errors.placeOfBirth)}
              helperText={touched.placeOfBirth && errors.placeOfBirth}
            />
            <TextField
              fullWidth
              type="date"
              label="Date of birth"
              {...getFieldProps('dateOfBirth')}
              error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
              helperText={touched.dateOfBirth && errors.dateOfBirth}
            />
          </Stack>
          <Stack>
            <Autocomplete
              id="country-select"
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination Country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'country'
                  }}
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} py={3} spacing={2}>
            <TextField
              fullWidth
              type="text"
              label="Passport Number"
              {...getFieldProps('passportNumber')}
              error={Boolean(touched.passportNumber && errors.passportNumber)}
              helperText={touched.passportNumber && errors.passportNumber}
            />
            <TextField
              fullWidth
              type="text"
              label="Place of Issuance"
              {...getFieldProps('placeOfIssuance')}
              error={Boolean(touched.placeOfIssuance && errors.placeOfIssuance)}
              helperText={touched.placeOfIssuance && errors.placeOfIssuance}
            />
            <TextField
              fullWidth
              type="date"
              label="Date of birth"
              {...getFieldProps('dateOfBirth')}
              error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
              helperText={touched.dateOfBirth && errors.dateOfBirth}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Have you previously been convicted??*</FormLabel>
              <RadioGroup
                {...getFieldProps('hasBeenConvicted')}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {values.hasBeenConvicted === 'yes' && (
              <FormControl>
                <TextField
                  fullWidth
                  multiline
                  type="text"
                  label="Previous Conviction History*"
                  {...getFieldProps('convictionHistory')}
                  error={Boolean(touched.convictionHistory && errors.convictionHistory)}
                  helperText={touched.convictionHistory && errors.convictionHistory}
                />
              </FormControl>
            )}
          </Stack>
          <Divider variant="inset" />
          <h4>Select Police Command to Request Character Certificate</h4>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Autocomplete
              fullWidth
              onChange={(event, newValue) => {
                setFieldValue(newValue);
              }}
              onInputChange={(event, newValue) => {
                console.log(newValue);
                setFieldValue('state', newValue);
                // setlgaList(NaijaStates.lgas(newValue).lgas);
              }}
              id="combo-box-demo"
              options={getFormOptions(NaijaStates.states())}
              // {...getFieldProps('state')}
              error={Boolean(touched.state && errors.state)}
              helperText={touched.state && errors.state}
              renderInput={(params) => <TextField {...params} label="State" />}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <MIconButton variant="contained" color="primary" size="large">
              <Icon icon={arrowBackFill} width={20} height={20} />
            </MIconButton>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Proceed
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
