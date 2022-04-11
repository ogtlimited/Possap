/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const CheckboxInput = ({ getFieldProps, field_label, field_id, values }) =>{
  console.log(field_id, 'FIELD')
  console.log(getFieldProps(field_id))
  return (
    <FormControlLabel
      control={<Checkbox {...getFieldProps(field_id)}  />}
      label={field_label}
    />
  );
} 

export default CheckboxInput;
