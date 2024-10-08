import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Grid,
  Radio,
  Select,
  Button,
  MenuItem,
  Container,
  TextField,
  Accordion,
  Typography,
  InputLabel,
  RadioGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import ConfirmationNote from './confirmation-note';

const validationSchema = Yup.object().shape({
  idType: Yup.string().required('Identification Type is required'),
  idNumber: Yup.string().required('Identification Number is required'),
  fullName: Yup.string().required('Full Name is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  state: Yup.string().required('State is required'),
  lga: Yup.string().required('LGA is required'),
  address: Yup.string().required('Address is required'),
  hasAlternativeContactInfo: Yup.string().required('This field is required'),
});

export const UserProfileConfirmation: React.FC = () => {
  const [isAltContactInfoVisible, setIsAltContactInfoVisible] = useState(false);

  return (
    <Container maxWidth="md" sx={{paddingTop: 0}}>
      <Grid container spacing={10} mt={0}>
     <Grid item md={6}>
     <Formik
        initialValues={{
          idType: '3',
          idNumber: 'B00448793',
          fullName: 'Abubakar',
          phoneNumber: '07066565263',
          email: 'abudawud92@gmail.com',
          gender: '1',
          state: 'FCT',
          lga: 'Bwari',
          address: 'kubwa abuja',
          hasAlternativeContactInfo: 'false',
          altContactName: '',
          altContactNumber: '',
          altContactEmail: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => (
          <Form>
            <Box mb={2}>
              <Typography variant="h4">TINT PERMIT</Typography>
              <Typography className="grey-tip">Fill in the details of your request.</Typography>
            </Box>

            {/* Identification Type */}
            <Box mb={2}>
              <FormControl fullWidth disabled>
                <InputLabel id="idTypeLabel">Identification Type</InputLabel>
                <Select
                  labelId="idTypeLabel"
                  name="idType"
                  value={values.idType}
                  onChange={handleChange}
                >
                  <MenuItem value="1">National Identification Number</MenuItem>
                  <MenuItem value="2">Driver&apos; License</MenuItem>
                  <MenuItem value="3">International Passport</MenuItem>
                  <MenuItem value="4">Bank Verification Number</MenuItem>
                </Select>
                {touched.idType && errors.idType && (
                  <FormHelperText error>{errors.idType}</FormHelperText>
                )}
              </FormControl>
            </Box>

            {/* Identification Number */}
            <Box mb={2}>
              <TextField
                fullWidth
                label="Identification Number"
                name="idNumber"
                value={values.idNumber}
                onChange={handleChange}
                disabled
                error={touched.idNumber && Boolean(errors.idNumber)}
                helperText={touched.idNumber && errors.idNumber}
              />
            </Box>

            {/* Full Name */}
            <Box mb={2}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                disabled
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
              />
            </Box>

            {/* Phone Number */}
            <Box mb={2}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                disabled
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </Box>

            {/* Email */}
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                disabled
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>

            {/* Gender */}
            <Box mb={2}>
              <FormControl fullWidth disabled>
                <InputLabel id="genderLabel">Gender</InputLabel>
                <Select
                  labelId="genderLabel"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="1">Male</MenuItem>
                  <MenuItem value="2">Female</MenuItem>
                </Select>
                {touched.gender && errors.gender && (
                  <FormHelperText error>{errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Box>

            {/* State */}
            <Box mb={2}>
              <FormControl fullWidth disabled>
                <InputLabel id="stateLabel">State</InputLabel>
                <Select
                  labelId="stateLabel"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                >
                  <MenuItem value="FCT">FCT</MenuItem>
                </Select>
                {touched.state && errors.state && (
                  <FormHelperText error>{errors.state}</FormHelperText>
                )}
              </FormControl>
            </Box>

            {/* Local Government Area (LGA) */}
            <Box mb={2}>
              <FormControl fullWidth disabled>
                <InputLabel id="lgaLabel">Local Government Area</InputLabel>
                <Select
                  labelId="lgaLabel"
                  name="lga"
                  value={values.lga}
                  onChange={handleChange}
                >
                  <MenuItem value="Bwari">Bwari</MenuItem>
                </Select>
                {touched.lga && errors.lga && (
                  <FormHelperText error>{errors.lga}</FormHelperText>
                )}
              </FormControl>
            </Box>

            {/* Address */}
            <Box mb={2}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                disabled
                multiline
                rows={4}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
              />
            </Box>

            {/* Alternative Contact Info */}
            <Box mb={2}>
              <Typography>Do you have an alternative contact info for this request?</Typography>
              <RadioGroup
                row
                name="hasAlternativeContactInfo"
                value={values.hasAlternativeContactInfo}
                onChange={(e) => {
                  setFieldValue('hasAlternativeContactInfo', e.target.value);
                  setIsAltContactInfoVisible(e.target.value === 'true');
                }}
              >
                <FormControlLabel value="true" control={<Radio />} label="YES" />
                <FormControlLabel value="false" control={<Radio />} label="NO" />
              </RadioGroup>
            </Box>

            {/* Alternative Contact Info Form */}
            {isAltContactInfoVisible && (
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Contact Person Name"
                  name="altContactName"
                  value={values.altContactName}
                  onChange={handleChange}
                  disabled
                />
                <TextField
                  fullWidth
                  label="Contact Person Phone Number"
                  name="altContactNumber"
                  value={values.altContactNumber}
                  onChange={handleChange}
                  disabled
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Contact Person Email"
                  name="altContactEmail"
                  value={values.altContactEmail}
                  onChange={handleChange}
                  disabled
                  sx={{ mt: 2 }}
                />
              </Box>
            )}

            {/* Proceed Button */}
            <Box mb={4}>
              <Button type="submit" variant="contained" fullWidth>
                Proceed
              </Button>
            </Box>

            {/* Accordion for Note */}
            
          </Form>
        )}
      </Formik>
     </Grid>
     <Grid item md={6}>
     <Accordion sx={{background: '#F3F6F8'}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Please Note:</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ConfirmationNote />
                <ul>
                  <li>You will be required to pay a non-refundable application fee.</li>
                  <li>
                    The Nigerian Police Force reserves the right to approve or deny your request based
                    on its guidelines or availability of resources.
                  </li>
                  <li>
                    All Police Officers on Escort duty or Protection services are to be treated with
                    utmost respect. Any complaint of mistreatment may attract strict penalties.
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
     </Grid>

      </Grid>
    </Container>
  );
};
