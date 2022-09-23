import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { Box, Card, Grid, Stack, TextField, MenuItem } from '@material-ui/core';
// utils
import usePoliceData from '../../../db/usePoliceData';

// ----------------------------------------------------------------------

CommandAccess.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function CommandAccess({ commandAccess, setCommandAccess }) {
  const { data: response, error } = usePoliceData();
  const [policeData, setpoliceData] = useState([]);
  const [department, setdepartment] = useState({});
  const [officerSection, setofficerSection] = useState([]);
  const [officerSubSection, setofficerSubSection] = useState([]);
  const handleChange = (event, setFieldValue, fieldName, data, next) => {
    const val = event.target.value;
    // console.log(data, fieldName);
    let fValues = [];
    if (data.sub) {
      fValues = data.sub.map((v) => v.Name);
    } else {
      fValues = data.map((v) => v.name);
    }
    const index = fValues.indexOf(val);
    console.log(val, index);
    console.log(data);
    if (!Array.isArray(data)) {
      console.log(val, data?.sub[index]);
      if (val === data?.sub[index].Name) {
        console.log(data.sub[index], 'FOUND');
        next(data.sub[index]);
      }
    }
    // console.log(val, data, data.Name, data.name);
    // console.log(fValues.indexOf(val));
    setFieldValue(fieldName, val);
    if (val === data[index]?.name) {
      console.log(data[index].sub);
      next(data[index]);
      // setofficerSection(policeData[index].sub);
    } else if (val === data[index]?.Name) {
      console.log(data[index].sub);
      // next(data[index]);
      // setofficerSection(policeData[index].sub);
    }
  };
  if (error) {
    console.log(error);
  }
  useEffect(() => {
    if (response?.data) {
      console.log(response?.data);
      setpoliceData(response.data.data);
    }
  }, [response]);

  const NewUserSchema = Yup.object().shape({
    officerFormation: Yup.string().required('Officer Formation is required'),
    officerDepartment: Yup.string().required('Officer Deptartment is required'),
    officerSection: Yup.string().required('Officer Section is required')
  });
  const handleOnSubmit = (val) => {
    console.log(val);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      officerFormation: commandAccess?.officerFormation || '',
      officerDepartment: commandAccess?.officerDepartment || '',
      officerSection: commandAccess?.officerSection || '',
      officerSubSection: commandAccess?.officerSubSection || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // setCommandAccess(values);
        console.log(values);
        // resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, pb: 10 }}>
              <Stack spacing={3}>
                <Box sx={{ pb: 3 }}>
                  Command Access Details (<small>These are the commands that the user has access to</small>)
                </Box>
                <Stack sx={{ pb: 3 }} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Officer Formation"
                    placeholder="officerFormation"
                    {...getFieldProps('officerFormation')}
                    onChange={(evt) => handleChange(evt, setFieldValue, 'officerFormation', policeData, setdepartment)}
                    SelectProps={{ native: false }}
                    error={Boolean(touched.officerFormation && errors.officerFormation)}
                    helperText={touched.officerFormation && errors.officerFormation}
                  >
                    <option value="" />
                    {policeData.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Officer Department"
                    placeholder="officerDepartment"
                    {...getFieldProps('officerDepartment')}
                    SelectProps={{ native: false }}
                    onChange={(evt) => {
                      handleChange(evt, setFieldValue, 'officerDepartment', department, setofficerSection);
                    }}
                    error={Boolean(touched.officerDepartment && errors.officerDepartment)}
                    helperText={touched.officerDepartment && errors.officerDepartment}
                  >
                    <MenuItem value="" />
                    {department.sub &&
                      department?.sub?.map((option) => (
                        <MenuItem key={option.code} value={option.Name}>
                          {`${option.Name} ${option.Address}`}
                        </MenuItem>
                      ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Officer Section"
                    placeholder="Officer Section"
                    {...getFieldProps('officerSection')}
                    SelectProps={{ native: false }}
                    onChange={(evt) => {
                      handleChange(evt, setFieldValue, 'officerSection', officerSection, setofficerSubSection);
                    }}
                    error={Boolean(touched.officerSection && errors.officerSection)}
                    helperText={touched.officerSection && errors.officerSection}
                  >
                    <MenuItem value="" />
                    {officerSection.sub &&
                      officerSection?.sub?.map((option) => (
                        <MenuItem key={option.Code} value={option.Name}>
                          {option.Name} {option.Address}
                        </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Officer Sub Section"
                    placeholder="Officer Sub Section"
                    {...getFieldProps('officerSubSection')}
                    SelectProps={{ native: false }}
                    error={Boolean(touched.officerSubSection && errors.officerSubSection)}
                    helperText={touched.officerSubSection && errors.officerSubSection}
                  >
                    <MenuItem value="" />
                    {officerSubSection?.sub?.map((option) => (
                      <MenuItem key={option.code} value={option.Name}>
                        {option.Name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Stack>
              <LoadingButton
                size="large"
                onClick={() => handleOnSubmit(values)}
                variant="contained"
                loading={isSubmitting}
                sx={{ mt: 5, mb: 3 }}
              >
                Add Command Access
              </LoadingButton>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
