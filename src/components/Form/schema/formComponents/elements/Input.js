/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { TextField } from '@material-ui/core';


const Input = ({ field_id, field_label, errors, getFieldProps, touched }) => (
    <TextField
      fullWidth
      label={field_label}
      {...getFieldProps(field_id)}
      error={Boolean(touched[field_id] && errors[field_id])}
      helperText={touched[field_id] && errors[field_id]}
    />
  );

export default Input;
