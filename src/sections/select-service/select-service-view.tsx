import type { ISelectServiceProps } from 'src/models/select-service.interface';

import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import {
  Box,
  Card,
  Radio,
  Button,
  Container,
  TextField,
  Typography,
  RadioGroup,
  Autocomplete,
  FormControlLabel,
} from '@mui/material';

const services = [
  { label: 'TINT PERMIT', id: 12 },
  { label: 'POLICE EXTRACT', id: 1 },
  { label: 'POLICE CHARACTER CERTIFICATE', id: 4 },
  { label: 'ESCORT AND GUARD SERVICES', id: 2 },
];

const subCategories = [
    { label: 'Random', id: 1 },
];

const subSubCategories = [
    { label: 'Random Sub ', id: 1 },
];

// Yup validation schema
const validationSchema = Yup.object().shape({
  taxPayerType: Yup.string().required('Taxpayer type is required'),
  selectedService: Yup.object().nullable().required('Service selection is required'),
  selectedSubCategory: Yup.object().nullable(),
  selectedSubSubCategory: Yup.object().nullable(),
});

export const SelectServiceView: React.FC<ISelectServiceProps> = ({handleNext, handlePrev}) => {
  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(false);
  const [isSubSubCategoryVisible, setIsSubSubCategoryVisible] = useState(false);

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', 'alignItems': 'center'}}>
      <Card
       sx={{
        mt: 5,
        py: 5,
        px: 3,
        width: 1,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        maxWidth: '600px',
      }}
      >
      <Formik
        initialValues={{
          taxPayerType: '1',
          selectedService: null,
          selectedSubCategory: null,
          selectedSubSubCategory: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission logic
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box mb={3}>
              <Typography variant="h4">Select Service</Typography>
              <Typography>Kindly select a service below</Typography>
            </Box>

            {/* TaxPayerType Selection */}
            <Box mb={3} display="flex" justifyContent="center">
              <RadioGroup
                row
                name="taxPayerType"
                value={values.taxPayerType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Individual"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Corporate/NGOs"
                  disabled
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="MDAs"
                  disabled
                />
              </RadioGroup>
              {touched.taxPayerType && errors.taxPayerType && (
                <Typography color="error" variant="body2">
                  {errors.taxPayerType}
                </Typography>
              )}
            </Box>

            {/* Service Selection */}
            <Box mb={3}>
              <Autocomplete
                options={services}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => {
                  setFieldValue('selectedService', value);
                  setIsSubCategoryVisible(true); // Make sub-category visible when a service is selected
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Service"
                    variant="outlined"
                    error={
                      touched.selectedService && Boolean(errors.selectedService)
                    }
                    helperText={
                      touched.selectedService && errors.selectedService
                    }
                  />
                )}
              />
            </Box>

            {/* SubCategory Selection */}
            {isSubCategoryVisible && (
              <Box mb={3}>
                <Autocomplete
                  options={subCategories}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) =>
                    setFieldValue('selectedSubCategory', value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Category"
                      variant="outlined"
                      error={
                        touched.selectedSubCategory &&
                        Boolean(errors.selectedSubCategory)
                      }
                      helperText={
                        touched.selectedSubCategory &&
                        errors.selectedSubCategory
                      }
                    />
                  )}
                />
              </Box>
            )}

            {/* SubSubCategory Selection */}
            {isSubSubCategoryVisible && (
              <Box mb={3}>
                <Autocomplete
                  options={subSubCategories}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) =>
                    setFieldValue('selectedSubSubCategory', value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Sub-Category"
                      variant="outlined"
                      error={
                        touched.selectedSubSubCategory &&
                        Boolean(errors.selectedSubSubCategory)
                      }
                      helperText={
                        touched.selectedSubSubCategory &&
                        errors.selectedSubSubCategory
                      }
                    />
                  )}
                />
              </Box>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{py: 2}}
              onClick={handleNext}
            >
              Proceed
            </Button>
          </Form>
        )}
      </Formik>
      </Card>
    </Container>
  );
};



