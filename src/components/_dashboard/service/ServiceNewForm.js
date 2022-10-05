import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';

// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  MenuItem,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table
} from '@material-ui/core';
import { AddCircle, RemoveCircle, Send } from '@material-ui/icons';
// utils
// routes
import CreateService from '../../../_apis_/auth/service';
import { PATH_DASHBOARD } from '../../../routes/paths';
import CommandAccessMoreMenu from '../user/list/CommandAccessMoreMenu';
//

// ----------------------------------------------------------------------

ServiceNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentService: PropTypes.object
};

export default function ServiceNewForm({ isEdit, currentService }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [workflow, setWorkFlow] = useState('');
  const [indextoEdit, setIndexToEdit] = useState(null);
  const [editWorkFlow, setEditWorkFlow] = useState(false);

  const [serviceOptions, setServiceOptions] = useState([
    {
      id: '',
      label: '',
      validators: {
        required: ''
      },
      config: {
        multiple: ''
      },
      showIf: {
        value: '',
        equals: ''
      },
      placeholder: '',
      type: '',
      isResful: '',
      isShowIf: '',
      options: [],
      value: '',
      api: {
        path: '',
        body: {
          key: '',
          value: ''
        }
      }
    }
  ]);

  const [selectOptions, setSelectOptions] = useState([
    {
      value: ''
    }
  ]);
  const [workfFlows, setWorkFlows] = useState([]);

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
      validators: {
        required: ''
      },
      config: {
        multiple: ''
      },
      showIf: {
        value: '',
        equals: ''
      },
      placeholder: '',
      type: '',
      isResful: '',
      isShowIf: '',
      options: [],
      value: '',
      api: {
        path: '',
        body: {
          key: '',
          value: ''
        }
      }
    });
    setServiceOptions(values);
  };

  const handleAddWorkFlow = () => {
    if (workflow.length > 0) {
      if (editWorkFlow) {
        workfFlows[indextoEdit] = workflow;
        setWorkFlows(workfFlows);
        setEditWorkFlow(false);
      } else {
        const newValue = [...workfFlows];

        newValue.push(workflow);
        setWorkFlows(newValue);
      }
      setWorkFlow('');
    }
  };
  const deleteField = (index) => {
    const filter = workfFlows.filter((val, idx) => index !== idx);
    setWorkFlows(filter);
  };
  const editField = (field, index) => {
    setEditWorkFlow(true);
    setWorkFlow(field);
    setIndexToEdit(index);
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

  const handleChangeFormSchema = (editorState, index, fieldName) => {
    const { name, value } = editorState.target;
    const values = [...serviceOptions];
    if (name === 'validators') {
      values[index][name].required = value;
    } else if (name === 'config') {
      values[index][name].multiple = value;
    } else if (name === 'api' && fieldName === 'path') {
      values[index][name].path = value;
    } else if (name === 'api' && fieldName === 'key') {
      values[index][name].body.key = value;
    } else if (name === 'api' && fieldName === 'value') {
      values[index][name].body.value = value;
    } else if (name === 'showIf' && fieldName === 'equals') {
      values[index][name].equals = value;
    } else if (name === 'showIf' && fieldName === 'value') {
      values[index][name].value = value;
    } else {
      values[index][name] = value;
    }

    setServiceOptions(values);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newServiceOptions = serviceOptions.map((service) => ({
      id: service?.id,
      label: service?.label,
      validators: service?.validators,
      placeholder: service?.placeholder,
      type: service?.type,
      ...(service?.type === 'radio' && { options: service?.options }),
      ...(service?.type === 'select' && { config: service?.config }),
      ...(service?.isResful === 'yes'
        ? { api: service?.api }
        : service?.type === 'select' && { options: service?.options }),
      ...(service?.isShowIf === 'yes' && { showIf: service?.showIf })
    }));
    const newValue = {
      name,
      approvalWorkFlow: workfFlows,
      formSchema: newServiceOptions
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
    <form onSubmit={onSubmit}>
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
                  name="name"
                  onChange={(e) => setName(e.target.value)}
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
              <Grid sx={{ display: 'flex' }}>
                <Grid item md={10} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    sx={{ width: '100%', flex: 1 }}
                    label="Approval Work flow"
                    value={workflow}
                    onChange={(state) => setWorkFlow(state.target.value)}
                    // {...register('approvalWorkFlow')}
                    // error={Boolean(touched.apNumber && errors.apNumber)}
                    // helperText={touched.apNumber && errors.apNumber}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
                <Button variant="contained" startIcon={<AddCircle />} onClick={handleAddWorkFlow}>
                  {editWorkFlow ? 'Edit Field' : 'Add Field'}
                </Button>
              </Grid>
            </Stack>
          </Card>
        </Grid>
        {workfFlows.length > 0 ? (
          <Grid container spacing={3}>
            <Grid item>
              <Card sx={{ p: 2, pb: 5, margin: '10px 0' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>WorkFlow</TableCell>

                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {workfFlows.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>{row}</TableCell>

                          <TableCell>
                            {/* <WorkFlowMoreMenu onDelete={() => deleteField(index)} onEdit={() => editField(row)} /> */}
                            <CommandAccessMoreMenu
                              onDelete={() => deleteField(index)}
                              onEdit={() => editField(row, index)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        ) : null}
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
                            name="validators"
                            select
                            label="Validators"
                            value={service.validators.required}
                            onChange={(e) => handleChangeFormSchema(e, index)}
                            // {...register('validators')}
                            // error={Boolean(errors.foreign_table)}
                            // helperText={errors?.foreign_table?.message}
                          >
                            <MenuItem value>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
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

                      <Stack sx={{ mt: 2, mb: 2 }}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Show if?</FormLabel>
                          <RadioGroup
                            direction={{ xs: 'row', sm: 'row' }}
                            aria-label="Show If?"
                            name="isShowIf"
                            value={service.isShowIf}
                            onChange={(e) => handleChangeFormSchema(e, index)}
                            sx={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                      {service.isShowIf === 'yes' && (
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} sx={{ mt: 2, mb: 2 }}>
                          <FormControl variant="outlined" fullWidth>
                            <TextField
                              fullWidth
                              label="Equals"
                              name="showIf"
                              value={service.showIf.equals}
                              onChange={(e) => handleChangeFormSchema(e, index, 'equals')}
                              // {...register('value')}
                              // error={Boolean(errors.title)}
                              // helperText={errors?.title?.message}
                            />
                          </FormControl>

                          <FormControl variant="outlined" fullWidth>
                            <TextField
                              fullWidth
                              label="Value"
                              name="showIf"
                              value={service.showIf.value}
                              onChange={(e) => handleChangeFormSchema(e, index, 'value')}
                              // {...register('value')}
                              // error={Boolean(errors.title)}
                              // helperText={errors?.title?.message}
                            />
                          </FormControl>
                        </Stack>
                      )}
                      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mb: 2 }} spacing={{ xs: 3, sm: 2 }}>
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
                      {service.type === 'radio' &&
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
                      {service.type === 'radio' && (
                        <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
                          <IconButton variant="contained" onClick={handleAddSelectOptionsFields}>
                            <AddCircle />
                          </IconButton>
                        </Grid>
                      )}

                      {service.type === 'select' && (
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} sx={{ mb: 2 }}>
                          <FormControl variant="outlined" fullWidth>
                            <TextField
                              fullWidth
                              name="config"
                              select
                              label="Is Multiple?"
                              value={service.config.multiple}
                              onChange={(e) => handleChangeFormSchema(e, index)}
                              // {...register('validators')}
                              // error={Boolean(errors.foreign_table)}
                              // helperText={errors?.foreign_table?.message}
                            >
                              <MenuItem value>Yes</MenuItem>
                              <MenuItem value={false}>No</MenuItem>
                            </TextField>
                          </FormControl>
                        </Stack>
                      )}

                      {service.type === 'select' && (
                        <Stack sx={{ mt: 2 }}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Is Restful?</FormLabel>
                            <RadioGroup
                              direction={{ xs: 'row', sm: 'row' }}
                              aria-label="Is Restful"
                              name="isResful"
                              value={service.isResful}
                              onChange={(e) => handleChangeFormSchema(e, index)}
                              sx={{ display: 'flex', flexDirection: 'row' }}
                            >
                              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                              <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                          </FormControl>
                        </Stack>
                      )}

                      {service.isResful === 'no' &&
                        service.type === 'select' &&
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
                      {service.isResful === 'no' && service.type === 'select' && (
                        <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
                          <IconButton variant="contained" onClick={handleAddSelectOptionsFields}>
                            <AddCircle />
                          </IconButton>
                        </Grid>
                      )}
                      {service.isResful === 'yes' && service.type === 'select' && (
                        <>
                          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <FormControl variant="outlined" fullWidth>
                              <TextField
                                fullWidth
                                label="Path"
                                name="api"
                                value={service.api.path}
                                onChange={(e) => handleChangeFormSchema(e, index, 'path')}
                                // {...register('value')}
                                // error={Boolean(errors.title)}
                                // helperText={errors?.title?.message}
                              />
                            </FormControl>
                          </Stack>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} sx={{ mt: 2 }}>
                            <FormControl variant="outlined" fullWidth>
                              <TextField
                                fullWidth
                                label="Key"
                                name="api"
                                value={service.api.body.key}
                                onChange={(e) => handleChangeFormSchema(e, index, 'key')}
                                // {...register('value')}
                                // error={Boolean(errors.title)}
                                // helperText={errors?.title?.message}
                              />
                            </FormControl>

                            <FormControl variant="outlined" fullWidth>
                              <TextField
                                fullWidth
                                label="Value"
                                name="api"
                                value={service.api.body.value}
                                onChange={(e) => handleChangeFormSchema(e, index, 'value')}
                                // {...register('value')}
                                // error={Boolean(errors.title)}
                                // helperText={errors?.title?.message}
                              />
                            </FormControl>
                          </Stack>
                        </>
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
