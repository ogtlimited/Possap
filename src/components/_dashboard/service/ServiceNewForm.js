import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Button,
  IconButton,
  FormControl
} from '@material-ui/core';
import { AddCircle, RemoveCircle, Send } from '@material-ui/icons';
// utils
// routes
import CreateService from '../../../_apis_/auth/service';
import { PATH_DASHBOARD } from '../../../routes/paths';
//

// ----------------------------------------------------------------------

ServiceNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentService: PropTypes.object
};

const NewServiceSchema = Yup.object().shape({
  name: Yup.string().required('Name of service is required')
});

export default function ServiceNewForm({ isEdit, currentService }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
    resolver: yupResolver(NewServiceSchema)
  });
  const [serviceOptions, setServiceOptions] = useState([
    {
      id: '',
      label: '',
      mandatory: '',
      placeholder: '',
      type: '',
      options: [],
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
  const [approvalWorkFlow, setApprovalWorkFlow] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
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
      options: [],
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
    const newValue = values.map((val) => ({ key: val.value, value: val.value }));
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
  const onSubmit = async (data) => {
    const newValue = {
      ...data,
      approvalWorkFlow,
      formSchema: serviceOptions
    };
    setLoading(true);
    try {
      await CreateService(newValue);
      enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      navigate(PATH_DASHBOARD.service.list);
    } catch (error) {
      enqueueSnackbar('Error creating service', { variant: 'error' });
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Box>
                Name of service (<small>This defines the name of the service</small>)
              </Box>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <TextField
                  fullWidth
                  label="Name of service"
                  {...register('name')}
                  required
                  // error={Boolean(touched.apNumber && errors.apNumber)}
                  // helperText={touched.apNumber && errors.apNumber}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
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
                        // {...register('approvalWorkFlow')}
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
                Form Schema (<small>This defines the fields in a service</small>)
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
                          // {...register('id')}
                          // error={Boolean(touched.apNumber && errors.apNumber)}
                          // helperText={touched.apNumber && errors.apNumber}
                        />
                        <TextField
                          fullWidth
                          label="Label"
                          onChange={(e) => handleChangeFormSchema(e, index)}
                          name="label"
                          value={service.label}
                          // {...register('label')}
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
                            // {...register('mandatory')}
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
                            // {...register('placeholder')}
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
                            // {...register('type')}
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
                          <Stack key={i} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                              <FormControl variant="outlined">
                                <TextField
                                  fullWidth
                                  label="Option"
                                  name="value"
                                  value={select.value}
                                  onChange={(e) => handleChangeTypeOptions(e, i, index)}
                                  // {...register('value')}
                                  // error={Boolean(errors.title)}
                                  // helperText={errors?.title?.message}
                                />
                              </FormControl>
                              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <IconButton variant="contained" onClick={() => handleRemoveSelectOptionsFields(index)}>
                                  <RemoveCircle />
                                </IconButton>
                              </div>
                            </Stack>
                          </Stack>
                        ))}
                      {service.type === 'select' && (
                        <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
                          <IconButton variant="contained" onClick={handleAddSelectOptionsFields}>
                            <AddCircle />
                          </IconButton>
                        </Grid>
                      )}
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
        <LoadingButton loading={loading} variant="contained" startIcon={<Send />} type="submit">
          Submit
        </LoadingButton>
      </Grid>
    </form>
  );
}
