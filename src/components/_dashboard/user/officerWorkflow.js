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
  OutlinedInput,
  Dialog
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

export default function OfficerWorkFlow({
  services,
  dialogOpen,
  setDialogOpen,
  workflowState,
  setWorkflowState,
  servicesList
}) {
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

  // const handleAllChecked = (value) => (value.length > 0 ? value.every((e) => e === true) : false);
  // const handleIndeterminate = (value) => (value.length > 0 ? value.every((e) => e !== true) : false);

  // const handleChange1 = (event, record, setCheck) => {
  //   console.log(event.target.checked);
  //   const allCheck = record[0] === true ? Array(record.length).fill(true) : Array(record.length).fill(false);
  //   console.log(allCheck);
  //   setCheck(allCheck);
  // };

  const [workflowData, setWorkflowData] = useState({});

  const handleChildChange = (event, record, index, setCheck, service, name) => {
    record[index] = event.target.checked;
    setCheck(record);
    console.log(record);
    setWorkflowData((previous) => {
      const updated = previous;
      if (Object.keys(previous).length === 0) {
        updated[service] = [name];
      } else {
        const array3 = record[index] ? [...previous[service], ...[name]] : previous[service].filter((e) => e !== name);
        updated[service] = array3;
      }
      return updated;
    });
  };

  const save = () => {
    setWorkflowState(workflowData);
    setDialogOpen(false);
    console.log(workflowData);
  };

  const children = (lists, record, setCheck, service) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {lists?.map((ls, i) => (
        <FormControlLabel
          key={`${ls}-${i}`}
          label={ls}
          control={
            <Checkbox
              defaultChecked={workflowData[service]?.includes(ls)}
              onChange={(evt) => handleChildChange(evt, record, i, setCheck, service, ls)}
            />
          }
        />
      ))}
    </Box>
  );

  console.log(servicesList);

  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      {services &&
        servicesList.map((s, i) => {
          if (services.includes(s.name)) {
            return (
              <Grid key={`${s.name}-${i}`} container spacing={3}>
                <Grid item xs={12} md={12} sx={{ margin: 3 }}>
                  <Box>{s.name}</Box>
                  {children(s.approvalWorkFlow, extractChecked, setextractChecked, s.name)}
                </Grid>
              </Grid>
            );
          }
          return <></>;
        })}
      <Grid item xs={12} md={12} sx={{ mt: 5, mb: 3, margin: 2 }}>
        <Button type="button" variant="contained" sx={{ width: 5 }} onClick={save}>
          Save
        </Button>
      </Grid>
    </Dialog>
  );
}
