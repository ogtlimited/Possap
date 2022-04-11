/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { TextField } from '@material-ui/core';

const Select = ({ field_id, field_label, errors, getFieldProps, touched, options }) => (
  <TextField
    select
    fullWidth
    label={field_label}
    placeholder={field_label}
    {...getFieldProps(field_id)}
    SelectProps={{ native: true }}
    // error={Boolean(touched[field_id] && errors[field_id])}
    // helperText={touched[field_id] && errors[field_id]}
  >
    <option value="" />
    {/* options.map((option) => (
    <option key={option.code} value={option.label}>
      {option.label}
    </option>
    ))} */}
  </TextField>
);

export default Select;
