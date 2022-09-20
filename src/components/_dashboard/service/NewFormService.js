import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ListItemText,
  Checkbox,
  IconButton,
  Button
} from '@material-ui/core';
/// routes
import { AddCircle, RemoveCircle, Send } from '@material-ui/icons';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

NewFormService.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function NewFormService({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const [policeData, setpoliceData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const [approvalWorkFlow, setApprovalWorkFlow] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([
    {
      id: '',
      label: '',
      mandatory: '',
      placeholder: '',
      type: '',
      option: [],
      value: ''
    }
  ]);
  const [workFlowOptions, setWorkFlowOptions] = useState([
    {
      approvalWorkFlow: ''
    }
  ]);
  const [selectOptions, setSelectOptions] = useState([
    {
      value: ''
    }
  ]);
  const handleRemoveFields = (index) => {
    const values = [...serviceOptions];

    if (values.length > 1) {
      values.splice(index, 1);
      setServiceOptions(values);
    }
  };
  const handleAddFields = () => {
    const values = [...serviceOptions];
    values.push({
      id: '',
      label: '',
      mandatory: '',
      placeholder: '',
      type: '',
      option: [],
      value: ''
    });
    setServiceOptions(values);
  };
  const handleRemoveWorkFlowFields = (index) => {
    const values = [...workFlowOptions];

    if (values.length > 1) {
      values.splice(index, 1);
      setWorkFlowOptions(values);
    }
  };
  const handleAddWorkFlowFields = () => {
    const values = [...workFlowOptions];
    values.push({
      approvalWorkFlow: ''
    });
    setWorkFlowOptions(values);
  };
  const handleRemoveSelectOptionsFields = (index) => {
    const values = [...selectOptions];

    if (values.length > 1) {
      values.splice(index, 1);
      setSelectOptions(values);
    }
  };
  const handleAddSelectOptionsFields = () => {
    const values = [...selectOptions];
    values.push({
      value: ''
    });
    setSelectOptions(values);
  };
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
  const handleMultiChange = (event, setFieldValue) => {
    const {
      target: { value }
    } = event;
    setFieldValue('service', typeof value === 'string' ? value.split(',') : value);
  };

  const formik = useFormik({
    enableReinitialize: true,
    // initialValues: {
    //   apNumber: currentUser?.apNumber || '',
    //   useServiceNum: currentUser?.apNumber || '',
    //   fullName: currentUser?.fullName || '',
    //   userName: currentUser?.userName || '',
    //   email: currentUser?.email || '',
    //   phoneNumber: currentUser?.phoneNumber || '',
    //   officerFormation: currentUser?.officerFormation || '',
    //   officerDeptartment: currentUser?.officerDeptartment || '',
    //   officerSection: currentUser?.officerSection || '',
    //   officerSubSection: currentUser?.officerSubSection || '',
    //   role: currentUser?.role || '',
    //   accessType: currentUser?.accessType || '',
    //   approvalLevel: currentUser?.approvalLevel || '',
    //   avatarUrl: currentUser?.avatarUrl || null,
    //   service: currentUser?.service || [],
    //   commandAccess: currentUser?.commandAccess || [],
    //   status: currentUser?.status
    // },
    // validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // console.log({ values });
        // resetForm();
        // setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        // navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  const handleChangeWorkflow = (editorState, index) => {
    const values = [...workFlowOptions];
    values[index].approvalWorkFlow = editorState;
    const newValue = values.map((val) => val.approvalWorkFlow);
    setApprovalWorkFlow([...newValue]);
  };
  const handleChangeTypeOptions = (editorState, i, index) => {
    const values = [...selectOptions];
    const { name, value } = editorState.target;
    values[i].value = value;
    const newValue = values.map((val) => val.value);
    const newObject = [...serviceOptions];
    newObject[index].options = newValue;
    setServiceOptions(newObject);

    setSelectOptions(values);
  };

  const handleChangeFormSchema = (editorState, index) => {
    const { name, value } = editorState.target;
    const values = [...serviceOptions];
    values[index][name] = value;

    setServiceOptions(values);
  };
  // console.log({ serviceOptions });
  const onSubmit = (data) => {
    const newValue = {
      ...data,
      approvalWorkFlow,
      formSchema: serviceOptions
    };
    console.log({ newValue });
    //     setLoading(true);
    //     axiosInstance
    //       .post("/api/bills", newData)
    //       .then((res) => {

    //         reset();
    //         enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
    //   navigate(PATH_DASHBOARD.service.list);
    //       })
    //       .catch((error) => {
    //         showAlert(true, error.response.data.message, "alert alert-danger");
    //       })
    //       .finally(() => {
    //         setLoading(false);
    //       });
  };
  return (
    <FormikProvider value={formik}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Typography variant="caption">Name of service</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Name of service"
                    {...getFieldProps('name')}
                    // error={Boolean(touched.apNumber && errors.apNumber)}
                    // helperText={touched.apNumber && errors.apNumber}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, pb: 10 }}>
              <Stack spacing={3}>
                <Box>
                  Approval WorkFlow (<small>This is the approval workflow of the service</small>)
                </Box>
                {workFlowOptions &&
                  workFlowOptions.map((workflow, index) => (
                    <Grid key={index} sx={{ display: 'flex' }}>
                      <Grid item md={10} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          sx={{ width: '100%', flex: 1 }}
                          label="Approval Work flow"
                          onChange={(state) => handleChangeWorkflow(state.target.value, index)}
                          // {...getFieldProps('approvalWorkFlow')}
                          // error={Boolean(touched.apNumber && errors.apNumber)}
                          // helperText={touched.apNumber && errors.apNumber}
                        />
                      </Grid>
                      <Grid item md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton variant="contained" onClick={() => handleRemoveWorkFlowFields(index)}>
                          <RemoveCircle />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
                  <Button variant="contained" startIcon={<AddCircle />} onClick={handleAddWorkFlowFields}>
                    Add Field
                  </Button>
                </Grid>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, pb: 10 }}>
              <Stack spacing={3}>
                <Box>
                  Form Schema (<small>This defines the fields in a servoce</small>)
                </Box>
                {serviceOptions &&
                  serviceOptions.map((service, index) => (
                    <Grid key={index} sx={{ display: 'flex' }}>
                      <Grid item md={10} sm={10}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} sx={{ mb: 2 }}>
                          <TextField
                            fullWidth
                            label="ID"
                            onChange={(e) => handleChangeFormSchema(e, index)}
                            name="id"
                            value={service.id}
                            // {...getFieldProps('id')}
                            // error={Boolean(touched.apNumber && errors.apNumber)}
                            // helperText={touched.apNumber && errors.apNumber}
                          />
                          <TextField
                            fullWidth
                            label="Label"
                            onChange={(e) => handleChangeFormSchema(e, index)}
                            name="label"
                            value={service.label}
                            // {...getFieldProps('label')}
                            // error={Boolean(touched.apNumber && errors.apNumber)}
                            // helperText={touched.apNumber && errors.apNumber}
                          />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} sx={{ mb: 2 }}>
                          <FormControl variant="outlined" fullWidth>
                            <TextField
                              fullWidth
                              name="mandatory"
                              select
                              label="Mandatory"
                              value={service.mandatory}
                              onChange={(e) => handleChangeFormSchema(e, index)}
                              // {...getFieldProps('mandatory')}
                              // error={Boolean(errors.foreign_table)}
                              // helperText={errors?.foreign_table?.message}
                            >
                              <MenuItem value="Yes">Yes</MenuItem>
                              <MenuItem value="No">No</MenuItem>
                            </TextField>
                          </FormControl>
                          <FormControl variant="outlined" fullWidth>
                            <TextField
                              fullWidth
                              name="placeholder"
                              label="Placeholder"
                              onChange={(e) => handleChangeFormSchema(e, index)}
                              value={service.placeholder}
                              // {...getFieldProps('placeholder')}
                              // error={Boolean(errors.foreign_table)}
                              // helperText={errors?.foreign_table?.message}
                            />
                          </FormControl>
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                          <FormControl variant="outlined" fullWidth>
                            <TextField
                              fullWidth
                              select
                              label="Type"
                              name="type"
                              onChange={(e) => handleChangeFormSchema(e, index)}
                              value={service.type}
                              // {...getFieldProps('type')}
                              // error={Boolean(errors.foreign_table)}
                              // helperText={errors?.foreign_table?.message}
                            >
                              <MenuItem value="text">Text</MenuItem>
                              <MenuItem value="tel">Tel</MenuItem>
                              <MenuItem value="date">Date</MenuItem>
                              <MenuItem value="select">Select</MenuItem>
                              <MenuItem value="radio">Radio</MenuItem>
                              <MenuItem value="checkbox">Checkbox</MenuItem>
                            </TextField>
                          </FormControl>
                        </Stack>
                        {service.type === 'select' &&
                          selectOptions &&
                          selectOptions.map((select, i) => (
                            <Stack key={index} direction={{ xs: 'column', sm: 'row' }}>
                              <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                <FormControl variant="outlined">
                                  <Typography variant="caption" sx={{ mb: 0.5 }}>
                                    Options
                                  </Typography>

                                  <TextField
                                    fullWidth
                                    label="Option"
                                    name="value"
                                    value={select.value}
                                    onChange={(e) => handleChangeTypeOptions(e, i, index)}
                                    // {...getFieldProps('value')}
                                    // error={Boolean(errors.title)}
                                    // helperText={errors?.title?.message}
                                  />
                                </FormControl>
                                {service.type === 'select' && (
                                  <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
                                    <IconButton variant="contained" onClick={handleAddSelectOptionsFields}>
                                      <AddCircle />
                                    </IconButton>
                                  </Grid>
                                )}
                              </Stack>
                            </Stack>
                          ))}
                        <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
                          <IconButton variant="contained" onClick={handleAddSelectOptionsFields}>
                            <AddCircle />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid md={2} sm={2}>
                        <IconButton variant="contained" onClick={() => handleRemoveFields(index)}>
                          <RemoveCircle />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
                  <Button variant="contained" startIcon={<AddCircle />} onClick={handleAddFields}>
                    Add Field
                  </Button>
                </Grid>
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" startIcon={<Send />} type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </FormikProvider>
  );
}
