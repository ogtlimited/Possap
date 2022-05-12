import * as Yup from 'yup';
import { useState, useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import NaijaStates from 'naija-state-local-government';
import arrowBackFill from '@iconify/icons-eva/arrow-back-fill';
// material
import {
  Stack,
  Alert,
  Checkbox,
  TextField,
  Autocomplete,
  MenuItem,
  ListItemText,
  OutlinedInput,
  Select,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Divider,
  InputLabel
} from '@material-ui/core';
import { LoadingButton, MobileDatePicker } from '@material-ui/lab';
import closeFill from '@iconify/icons-eva/close-fill';
import PoliceExtractMutation from '../../mutations/policeExtract.mutation';
import useAuth from '../../hooks/useAuth';

// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { getFormOptions } from '../../utils/getFormOptions';
import { MIconButton } from '../@material-extend';
import { DOCUMENTLOSS, EXTRACTCATEGORYLIST, PROPERTYLOSS } from './form-contants';
import { MotionInView, varFadeInUp } from '../animate';
import { UploadSingleFile } from '../upload';
import useServiceForm from '../../hooks/useServiceForm';
import ScrollToTop from '../ScrollToTop';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
// ----------------------------------------------------------------------

export default function PoliceExtractForm({ parentValues, setStep }) {
  const isMountedRef = useIsMountedRef();
  const { user } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [lgaList, setlgaList] = useState([]);
  const { handleFormChange } = useServiceForm();
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
  const handleChange = (event, setFieldValue, field) => {
    const {
      target: { value }
    } = event;
    setFieldValue(field, typeof value === 'string' ? value.split(', ') : value);
  };
  const PoliceSchema = Yup.object().shape({
    // extractCategory: Yup.array().required('Extract Category is required'),
    // // extractReason: Yup.string().required('Extract Reason No is required'),
    // dateReported: Yup.date().required('Report date is required'),
    // wasReported: Yup.string().required('This field is required'),
    // extractLga: Yup.string().required('LGA is required'),
    // extractPoliceDivision: Yup.string().required('Division is required'),
    // extractState: Yup.string().required('State is required')
  });

  const mutation = PoliceExtractMutation();
  const formik = useFormik({
    initialValues: {
      user_type: user?.userType,
      extractCategory: [],
      // sub_category: [],
      wasReported: true,
      documentLost: [],
      propertyLost: [],
      dateReported: '',
      courtAffidavit: '',
      affidavitNumber: '',
      affidavitIssuanceDate: '',
      extractState: '',
      extractLga: '',
      extractPoliceDivision: ''
      // status: ''
    },
    validationSchema: PoliceSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        const allValues = {
          ...values
        };

        const response = mutation.mutate(values);
        // REDIREECT TO services/invoice/1?requestID=1
        const redirectPath = 'services/invoice/1?requestID=1';
        <Navigate to={redirectPath} />;
        console.log(allValues);
        enqueueSnackbar('Police extract created successfully', {
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

  const { errors, touched, values, setFieldValue, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} onChange={(val) => handleFormChange(values)}>
          <Stack spacing={3}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
            <InputLabel id="demo-multiple-name-label">Select Category of Extract*</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              name="extractCategory"
              {...getFieldProps('extractCategory')}
              value={values.extractCategory}
              onChange={(evt) => handleChange(evt, setFieldValue, 'extractCategory')}
              input={<OutlinedInput label="Extract Category" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {EXTRACTCATEGORYLIST.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={values.extractCategory.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            {values.extractCategory.includes(EXTRACTCATEGORYLIST[0]) && (
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="doc-loss">Document Loss</InputLabel>
                <Select
                  labelId="doc-loss"
                  id="doc-loss-checkbox"
                  multiple
                  {...getFieldProps('documentLost')}
                  name="documentLost"
                  onChange={(evt) => handleChange(evt, setFieldValue, 'documentLost')}
                  input={<OutlinedInput label="Document Loss" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {DOCUMENTLOSS.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={values.documentLost.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {values.extractCategory.includes(EXTRACTCATEGORYLIST[1]) && (
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="prop-loss">Property Loss</InputLabel>
                <Select
                  labelId="prop-loss"
                  id="prop-loss-checkbox"
                  multiple
                  // value={values.propertyLost}
                  {...getFieldProps('propertyLost')}
                  onChange={(evt) => handleChange(evt, setFieldValue, 'propertyLost')}
                  input={<OutlinedInput label="Property Loss" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {PROPERTYLOSS.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={values.propertyLost.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {values.extractCategory.includes(EXTRACTCATEGORYLIST[2]) && (
              <FormControl sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  autoComplete="extractReason"
                  type="text"
                  label="Reason for Request"
                  {...getFieldProps('extractReason')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.extractReason && errors.extractReason}
                />
              </FormControl>
            )}
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Was incident reported at a police station?*
                </FormLabel>
                <RadioGroup {...getFieldProps('wasReported')} row aria-labelledby="demo-row-radio-buttons-group-label">
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              {values.wasReported === 'yes' && (
                <FormControl>
                  <TextField
                    fullWidth
                    type="date"
                    label="Select the date the incident was reported"
                    {...getFieldProps('dateReported')}
                    error={Boolean(touched.dateReported && errors.dateReported)}
                    helperText={touched.dateReported && errors.dateReported}
                  />
                </FormControl>
              )}
            </Stack>
            <MotionInView variants={varFadeInUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <UploadSingleFile label="Add an identification file here." file={file} onDrop={handleDropSingleFile} />
              </Stack>
            </MotionInView>
            <Stack direction={{ xs: 'column', sm: 'row' }} py={3} spacing={2}>
              <TextField
                fullWidth
                type="text"
                label="Affidavit Number"
                {...getFieldProps('affidavitNumber')}
                error={Boolean(touched.affidavitNumber && errors.affidavitNumber)}
                helperText={touched.affidavitNumber && errors.affidavitNumber}
              />
              <TextField
                fullWidth
                type="date"
                label="Affidavit Date of Issuance"
                {...getFieldProps('affidavitIssuanceDate')}
                error={Boolean(touched.affidavitIssuanceDate && errors.affidavitIssuanceDate)}
                helperText={touched.affidavitIssuanceDate && errors.affidavitIssuanceDate}
              />
            </Stack>
            <Divider variant="inset" />
            <h4>Police Formation/Division to Request Extract From</h4>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Autocomplete
                fullWidth
                onInputChange={(event, newValue) => {
                  console.log(newValue);
                  setFieldValue('extractState', newValue);
                  setlgaList(NaijaStates.lgas(newValue).lgas);
                }}
                id="combo-box-demo"
                options={getFormOptions(NaijaStates.states())}
                // {...getFieldProps('state')}
                error={Boolean(touched.extractState && errors.extractState)}
                helperText={touched.extractState && errors.extractState}
                renderInput={(params) => <TextField {...params} label="State" />}
              />

              <Autocomplete
                select
                fullWidth
                label="LGA"
                placeholder="LGA"
                onInputChange={(event, newValue) => {
                  setFieldValue('extractLga', newValue);
                }}
                SelectProps={{ native: true }}
                options={lgaList}
                error={Boolean(touched.extractLga && errors.extractLga)}
                helperText={touched.extractLga && errors.extractLga}
                renderInput={(params) => <TextField {...params} label="LGA" />}
              />
              <Autocomplete
                select
                fullWidth
                label="Select the Police Formation/Division"
                placeholder="Division"
                onInputChange={(event, newValue) => {
                  setFieldValue('extractPoliceDivision', newValue);
                }}
                SelectProps={{ native: true }}
                options={lgaList}
                error={Boolean(touched.extractPoliceDivision && errors.extractPoliceDivision)}
                helperText={touched.extractPoliceDivision && errors.extractPoliceDivision}
                renderInput={(params) => <TextField {...params} label="Police Formation/Division" />}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <MIconButton onClick={() => setStep('one')} variant="contained" color="primary" size="large">
                <Icon icon={arrowBackFill} width={20} height={20} />
              </MIconButton>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Proceed
              </LoadingButton>
            </Stack>
          </Stack>

          {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton> */}
        </Form>
      </FormikProvider>
      <ScrollToTop />
    </>
  );
}
