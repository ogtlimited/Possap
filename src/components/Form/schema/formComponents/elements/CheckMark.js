/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { FormControl, OutlinedInput, InputLabel, MenuItem, ListItemText, Checkbox, Select } from '@material-ui/core';
import * as React from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};


export default function MultipleSelectCheckmarks({ getFieldProps, field_label, field_id, values, options }) {
  const [fieldValue, setfieldValue] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setfieldValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">{field_label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={fieldValue}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              <Checkbox checked={fieldValue.indexOf(opt) > -1} />
              <ListItemText primary={opt} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
