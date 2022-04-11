/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
import { useState } from 'react';

// material
import { Stack, Alert } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';


import Element from '../Form/schema/formComponents/element';
// ----------------------------------------------------------------------

export default function ServiceForm({ schema, errors, formik, isSubmitting }) {
  return (
    <>
      <Stack spacing={3}>
        {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

        {schema.map((field, i) => (
          <Element formik={formik} key={i} field={field} />
        ))}
      </Stack>

      <LoadingButton sx={{ my: 3 }} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Submit
      </LoadingButton>
    </>
  );
}
