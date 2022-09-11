import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
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
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormControlLabel,
  MenuItem,
  Checkbox,
  Button,
  IconButton,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//

// ----------------------------------------------------------------------

ServiceNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentService: PropTypes.object
};
const defaultValues = {
  title: '',
  require: '',
  foreign: '',

  foreign_table: ''
};

const NewServiceSchema = Yup.object().shape({
  title: Yup.string().required('title is required'),
  require: Yup.boolean(),
  foreign: Yup.boolean(),
  foreign_table: Yup.string().when('foreign', {
    is: true,
    then: Yup.string().required('Foreign Table is required')
  })
});
export default function ServiceNewForm({ isEdit, currentService }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
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
      title: '',
      require: '',
      foreign: '',

      foreign_table: ''
    }
  ]);

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
      title: '',
      require: '',
      foreign: '',

      foreign_table: ''
    });
    setServiceOptions(values);
  };

  const onSubmit = (data) => {
    console.log({ data });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {serviceOptions &&
          serviceOptions.map((service, index) => (
            <Grid item xs={12} md={12} key={index}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <FormControl variant="outlined" fullWidth>
                      <Typography variant="caption" sx={{ mb: 0.5 }}>
                        Title
                      </Typography>

                      <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        {...register('title')}
                        error={Boolean(errors.title)}
                        helperText={errors?.title?.message}
                      />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                      <Typography variant="caption" sx={{ mb: 0.5, textAlign: 'center' }}>
                        Required?
                      </Typography>
                      <Checkbox
                        label="Required"
                        name="require"
                        {...register('require')}
                        error={Boolean(errors.foreign)}
                        helperText={errors?.foreign?.message}
                      />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                      <Typography variant="caption" sx={{ mb: 0.5, textAlign: 'center' }}>
                        Foreign?
                      </Typography>
                      <Checkbox
                        label="Foreign"
                        name="foreign"
                        {...register('foreign')}
                        error={Boolean(errors.foreign)}
                        helperText={errors?.foreign?.message}
                      />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                      <Typography variant="caption" sx={{ mb: 0.5 }}>
                        Foreign Table?
                      </Typography>
                      <TextField
                        fullWidth
                        name="foreign_table"
                        select
                        label="Foreign Table"
                        {...register('foreign_table')}
                        error={Boolean(errors.foreign_table)}
                        helperText={errors?.foreign_table?.message}
                      >
                        <MenuItem value="Character Certifcate">Character Certifcate</MenuItem>
                        <MenuItem value="Escort And Guard Services">Escort And Guard Services</MenuItem>
                      </TextField>
                    </FormControl>

                    <IconButton variant="contained" onClick={() => handleRemoveFields(index)}>
                      <RemoveCircle />
                    </IconButton>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        <Grid item xs={12} md={6}>
          <Button variant="contained" startIcon={<AddCircle />} onClick={handleAddFields}>
            Add Field
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
