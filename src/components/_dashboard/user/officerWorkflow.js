import React, { useState, useEffect } from 'react';

import {
  CardHeader,
  Box,
  Grid,
  FormControlLabel,
  ListItem,
  ListItemIcon,
  Button,
  Divider,
  ListItemText,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  OutlinedInput
} from '@material-ui/core';
import { WORKFLOW, POLICEEXTRACTAPPROVALS, CCAPPROVALS } from './constants';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      minWidth: 250
    }
  }
};
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function OfficerWorkFlow({ services }) {
  const [checked, setChecked] = React.useState([]);
  const [extractChecked, setextractChecked] = useState(Array(POLICEEXTRACTAPPROVALS.length).fill(false));
  const [ccertChecked, setccertChecked] = useState(Array(CCAPPROVALS.length).fill(false));
  const [eGSChecked, seteGSChecked] = useState(Array(POLICEEXTRACTAPPROVALS.length).fill(false));
  useEffect(() => {
    console.log(services);
    // setapprovals(WORKFLOW.filter((e) => services.includes(e.heading)));
    // services.forEach((el) => {
    //   if (el === 'POLICE EXTRACT') {
    //     const sets = new Set([...left, ...POLICEEXTRACTAPPROVALS]);
    //     setLeft(Array.from(sets));
    //   } else if (el === 'POLICE CHARACTER CERTIFICATE') {
    //     const sets = new Set([...left, ...CCAPPROVALS]);
    //     setLeft(Array.from(sets));
    //   }
    // });
  }, [services]);

  const handleAllChecked = (value) => (value.length > 0 ? value.every((e) => e === true) : false);
  const handleIndeterminate = (value) => (value.length > 0 ? value.every((e) => e !== true) : false);

  const handleChange1 = (event, record, setCheck) => {
    console.log(event.target.checked);
    const allCheck = record[0] === true ? Array(record.length).fill(true) : Array(record.length).fill(false);
    console.log(allCheck);
    setCheck(allCheck);
  };

  const handleChildChange = (event, record, index, setCheck) => {
    record[index] = event.target.checked;
    console.log(event.target.checked, record, index);
    setCheck(record);
  };

  const children = (lists, record, setCheck) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {lists.map((ls, i) => (
        <FormControlLabel
          label={ls}
          control={<Checkbox checked={record[i]} onChange={(evt) => handleChildChange(evt, record, i, setCheck)} />}
        />
      ))}
    </Box>
  );

  return (
    <div>
      {services &&
        services.map((s, i) => (
          <>
            {s === 'POLICE EXTRACT' && (
              <>
                <FormControlLabel
                  label="Extract Request Flow"
                  control={
                    <Checkbox
                      checked={handleAllChecked(extractChecked)}
                      indeterminate={handleIndeterminate(extractChecked)}
                      onChange={(evt) => handleChange1(evt, extractChecked, setextractChecked)}
                    />
                  }
                />
                {children(POLICEEXTRACTAPPROVALS, extractChecked, setextractChecked)}
              </>
            )}
            {s === 'POLICE CHARACTER CERTIFICATE' && (
              <>
                <FormControlLabel
                  label="Police Character Certificate"
                  control={
                    <Checkbox
                      checked={handleAllChecked(ccertChecked)}
                      indeterminate={handleIndeterminate(ccertChecked)}
                      onChange={(evt) => handleChange1(evt, ccertChecked, setccertChecked)}
                    />
                  }
                />
                {children(CCAPPROVALS, ccertChecked, setccertChecked)}
              </>
            )}
            {s === 'ESCORT AND GUARD SERVICES' && (
              <>
                <FormControlLabel
                  label="Escort & Guard Request Flow"
                  control={
                    <Checkbox
                      checked={handleAllChecked(eGSChecked)}
                      indeterminate={handleIndeterminate(eGSChecked)}
                      onChange={(evt) => handleChange1(evt, eGSChecked, seteGSChecked)}
                    />
                  }
                />
                {children(POLICEEXTRACTAPPROVALS, eGSChecked, seteGSChecked)}
              </>
            )}
          </>
        ))}
    </div>
  );
}
