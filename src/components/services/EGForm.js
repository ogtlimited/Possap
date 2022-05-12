import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack5';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import NaijaStates from 'naija-state-local-government';
import { indexOf } from 'lodash';
// material
import arrowBackFill from '@iconify/icons-eva/arrow-back-fill';
import {
  Stack,
  Alert,
  TextField,
  Autocomplete,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Icon,
  Typography
} from '@material-ui/core';
import { DesktopDatePicker, LoadingButton } from '@material-ui/lab';

// hooks
import CreateEGService from '../../mutations/EGServices.mutation';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { EGCATEGORYTYPE, EGSERVICECATEGORY, EGUNIT, TACTICALSQUAD } from './form-contants';
import { getFormOptions } from '../../utils/getFormOptions';
import useTacticalSquad from '../../db/useTacticalSquad';
import useAuth from '../../hooks/useAuth';
import { MIconButton } from '../@material-extend';
import ScrollToTop from '../ScrollToTop';

// ----------------------------------------------------------------------

export default function EGForm({ parentValues, setStep }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [CategoryType, setCategoryType] = useState([]);
  const [tacticalCMD, settacticalCMD] = useState([]);
  const [lgaList, setlgaList] = useState([]);
  const { data, error } = useTacticalSquad();
  const { user } = useAuth();
  const LoginSchema = Yup.object().shape({
    serviceCategory: Yup.string().required('service Categorye is required'),
    categoryType: Yup.string().required('category Type is required'),
    unit: Yup.string().required('unit is required'),
    tacticalSquad: Yup.string().required('tactical Squad is required'),
    wasReported: Yup.string().required('ID No is required'),
    courtAffidavit: Yup.string().required('ID No is required'),
    affidavitNumber: Yup.string().required('ID No is required'),
    extractLga: Yup.string().required('ID No is required'),
    extractPoliceDivision: Yup.string().required('ID No is required'),
    status: Yup.string().required('ID No is required')
  });
  const mutation = CreateEGService();
  useEffect(() => {
    console.log(data);
  }, [data]);

  const formik = useFormik({
    initialValues: {
      userId: user?.id,
      requestType: '',
      categoryType: '',
      unit: '',
      tacticalSquad: '',
      commandFormation: '',
      serviceDeliveryState: '',
      serviceDeliveryLga: '',
      escortAddress: '',
      escortStartDate: new Date(),
      escortEndDate: new Date(),
      escortOfficersRequired: false
      // invoicePaymentMethod: ''
    },
    // validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        console.log(values);
        const response = mutation.mutate({ ...parentValues, ...values });
        const redirectPath = 'services/invoice/3?requestID=1';
        <Navigate to={redirectPath} />;
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
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack sx={{ mb: 2 }} spacing={3}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Request Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...getFieldProps('requestType')}
                onChange={(evt) => {
                  console.log(evt.target.value);
                  const obj = EGSERVICECATEGORY[evt.target.value];
                  setCategoryType(EGCATEGORYTYPE[obj.key]);
                  setFieldValue('requestType', obj.id);
                }}
                error={Boolean(touched.requestType && errors.requestType)}
                helperText={touched.requestType && errors.requestType}
                label="Select a request type"
              >
                {EGSERVICECATEGORY.map((val) => (
                  <MenuItem value={val.id}>{val.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category Type*</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...getFieldProps('categoryType')}
                error={Boolean(touched.categoryType && errors.categoryType)}
                helperText={touched.categoryType && errors.categoryType}
                label="Select a request type"
              >
                {CategoryType.map((val) => (
                  <MenuItem value={val}>{val}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...getFieldProps('unit')}
                error={Boolean(touched.unit && errors.unit)}
                helperText={touched.unit && errors.unit}
                label="Select a request type"
              >
                {EGUNIT.map((val) => (
                  <MenuItem value={val}>{val}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {values.unit === 'Tactical' && (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tactical Squad*</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...getFieldProps('tacticalSquad')}
                    onChange={(evt) => {
                      console.log(evt.target.value, data);
                      const obj = data.data.filter((ts) => ts.Code === evt.target.value)[0];
                      settacticalCMD(obj?.sub || []);
                      setFieldValue('tacticalSquad', evt.target.value);
                    }}
                    error={Boolean(touched.tacticalSquad && errors.tacticalSquad)}
                    helperText={touched.tacticalSquad && errors.tacticalSquad}
                    label="Select a request type"
                  >
                    {TACTICALSQUAD.map((val) => (
                      <MenuItem value={val.code}>{val.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Command/Formation*</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...getFieldProps('commandFormation')}
                    error={Boolean(touched.commandFormation && errors.commandFormation)}
                    helperText={touched.commandFormation && errors.commandFormation}
                    label="Select a request type"
                  >
                    {tacticalCMD.map((val) => (
                      <MenuItem value={val.Name}>{`${val.Name} ${val.Address}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Autocomplete
                fullWidth
                // onChange={(event, newValue) => {
                //   setFieldValue(newValue);
                // }}
                onInputChange={(event, newValue) => {
                  console.log(newValue);
                  setFieldValue('originState', newValue);
                  setlgaList(NaijaStates.lgas(newValue).lgas);
                }}
                id="combo-box-demo"
                options={getFormOptions(NaijaStates.states())}
                // {...getFieldProps('state')}
                error={Boolean(touched.state && errors.state)}
                helperText={touched.state && errors.state}
                renderInput={(params) => <TextField {...params} label="State" />}
              />

              <Autocomplete
                select
                fullWidth
                label="LGA"
                placeholder="LGA"
                onInputChange={(event, newValue) => {
                  setFieldValue('originLga', newValue);
                }}
                SelectProps={{ native: true }}
                options={lgaList}
                error={Boolean(touched.lga && errors.lga)}
                helperText={touched.lga && errors.lga}
                renderInput={(params) => <TextField {...params} label="LGA" />}
              />
            </Stack>
            <FormControl>
              <TextField
                fullWidth
                multiline
                type="text"
                label="Address"
                {...getFieldProps('escortAddress')}
                error={Boolean(touched.escortAddress && errors.escortAddress)}
                helperText={touched.escortAddress && errors.escortAddress}
              />
            </FormControl>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <DesktopDatePicker
                  fullWidth
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  {...getFieldProps('escortStartDate')}
                  onChange={(val) => setFieldValue('escortStartDate', val)}
                  error={Boolean(touched.escortStartDate && errors.escortStartDate)}
                  helperText={touched.escortStartDate && errors.escortStartDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
              <FormControl fullWidth>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  {...getFieldProps('escortEndDate')}
                  onChange={(val) => setFieldValue('escortEndDate', val)}
                  error={Boolean(touched.escortEndDate && errors.escortEndDate)}
                  helperText={touched.escortEndDate && errors.escortEndDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>

              {/* s */}
            </Stack>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <MIconButton onClick={() => setStep('one')} variant="contained" color="primary" size="large">
              {/* <Icon icon={arrowBackFill} width={20} height={20} /> */}
              <Typography variant="h6">Prev</Typography>
            </MIconButton>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Proceed
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
      <ScrollToTop />
    </>
  );
}
