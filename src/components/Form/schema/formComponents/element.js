/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { Grid } from '@material-ui/core';
import React from 'react';
import Checkbox from './elements/Checkbox';
import MultipleSelectCheckmarks from './elements/CheckMark';
import Input from './elements/Input';
import Select from './elements/Select';

const Element = ({
  formik,
  field: { field_type, field_id, field_label, field_placeholder, field_value, field_options }
}) => {
  console.log(formik);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  switch (field_type) {
    case 'text':
      return (
        <Input
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          errors={errors}
          getFieldProps={getFieldProps}
          touched={touched}
        />
      );
    case 'select':
      return (
        <Select
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          getFieldProps={getFieldProps}
          field_value={field_value}
          field_options={field_options}
        />
      );
    case 'checkmark':
      return (
        <MultipleSelectCheckmarks
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          getFieldProps={getFieldProps}
          field_value={field_value}
          options={field_options}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          getFieldProps={getFieldProps}
          field_id={field_id}
          field_label={field_label}
          field_value={field_value}
        />
      );

    default:
      return null;
  }
};

export default Element;
