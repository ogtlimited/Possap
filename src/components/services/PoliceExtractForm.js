import * as Yup from 'yup';
import { useState, useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { Link as RouterLink } from 'react-router-dom';
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

// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { getFormOptions } from '../../utils/getFormOptions';
import { MIconButton } from '../@material-extend';
import { DOCUMENTLOSS, EXTRACTCATEGORYLIST, PROPERTYLOSS } from './form-contants';
import { MotionInView, varFadeInUp } from '../animate';
import { UploadSingleFile } from '../upload';

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

export default function PoliceExtractForm({ parentValues }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [lgaList, setlgaList] = useState([]);
  const [extractCategory, setextractCategory] = useState([]);
  const [documentLoss, setdocumentLoss] = useState([]);
  const [propertyLoss, setpropertyLoss] = useState([]);
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
  const handleChange = (event, action) => {
    const {
      target: { value }
    } = event;
    action(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(', ') : value
    );
  };
  const PoliceSchema = Yup.object().shape({
    extractCategory: Yup.string().required('Extract Category is required'),
    // extractReason: Yup.string().required('Extract Reason No is required'),
    // dateReported: Yup.string().required('Report date is required'),
    wasReported: Yup.string().required('This field is required'),
    extractLga: Yup.string().required('LGA is required'),
    extractPoliceDivision: Yup.string().required('Division is required'),
    extractPoliceState: Yup.string().required('State is required')
  });

  const formik = useFormik({
    initialValues: {
      extractCategory: '',
      documentLost: '',
      propertyLost: '',
      extractReason: '',
      wasReported: true,
      dateReported: '',
      courtAffidavit: '',
      affidavitNumber: '',
      affidavitIssuanceDate: '',
      extractState: '',
      extractLga: '',
      extractPoliceDivision: '',
      status: ''
    },
    validationSchema: PoliceSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        const allValues = {
          ...parentValues,
          ...values
        };

        console.log(allValues);
        // await login(values.email, values.password);
        // enqueueSnackbar('Login success', {
        //   variant: 'success',
        //   action: (key) => (
        //     <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        //       <Icon icon={closeFill} />
        //     </MIconButton>
        //   )
        // });
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

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <InputLabel id="demo-multiple-name-label">Select Category of Extract*</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            // name="extractCategory"
            value={extractCategory}
            onChange={(evt) => handleChange(evt, setextractCategory)}
            input={<OutlinedInput label="Extract Category" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {EXTRACTCATEGORYLIST.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={extractCategory.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          {extractCategory.includes(EXTRACTCATEGORYLIST[0]) && (
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="doc-loss">Document Loss</InputLabel>
              <Select
                labelId="doc-loss"
                id="doc-loss-checkbox"
                multiple
                value={documentLoss}
                // name="documentLoss"
                onChange={(evt) => handleChange(evt, setdocumentLoss)}
                input={<OutlinedInput label="Document Loss" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {DOCUMENTLOSS.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={documentLoss.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {extractCategory.includes(EXTRACTCATEGORYLIST[1]) && (
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="prop-loss">Property Loss</InputLabel>
              <Select
                labelId="prop-loss"
                id="prop-loss-checkbox"
                multiple
                value={propertyLoss}
                // name="propertyLoss"
                onChange={(evt) => handleChange(evt, setpropertyLoss)}
                input={<OutlinedInput label="Property Loss" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {PROPERTYLOSS.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={propertyLoss.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {extractCategory.includes(EXTRACTCATEGORYLIST[2]) && (
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
              <FormLabel id="demo-row-radio-buttons-group-label">Was incident reported at a police station?*</FormLabel>
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
              onChange={(event, newValue) => {
                setFieldValue(newValue);
              }}
              onInputChange={(event, newValue) => {
                console.log(newValue);
                setFieldValue('state', newValue);
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
                setFieldValue('lga', newValue);
              }}
              SelectProps={{ native: true }}
              options={lgaList}
              error={Boolean(touched.lga && errors.lga)}
              helperText={touched.lga && errors.lga}
              renderInput={(params) => <TextField {...params} label="LGA" />}
            />
            <Autocomplete
              select
              fullWidth
              label="LGA"
              placeholder="LGA"
              onInputChange={(event, newValue) => {
                setFieldValue('lga', newValue);
              }}
              SelectProps={{ native: true }}
              options={lgaList}
              error={Boolean(touched.lga && errors.lga)}
              helperText={touched.lga && errors.lga}
              renderInput={(params) => <TextField {...params} label="LGA" />}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <MIconButton variant="contained" color="primary" size="large">
              <Icon icon={arrowBackFill} width={20} height={20} />
            </MIconButton>
            <LoadingButton
              onClick={() => console.log(values)}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Proceed
            </LoadingButton>
          </Stack>
        </Stack>

        {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton> */}
      </Form>
    </FormikProvider>
  );
}
