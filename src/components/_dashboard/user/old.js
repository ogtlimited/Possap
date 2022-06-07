import React, { useState, useEffect } from 'react';

import {
  CardHeader,
  Card,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Button,
  Divider,
  ListItemText,
  Checkbox
} from '@material-ui/core';
import { WORKFLOW } from './constants';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function OfficerWorkFlowOLD({ services }) {
  const [approvals, setapprovals] = useState(null);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 12]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  useEffect(() => {
    setapprovals(WORKFLOW.filter((e) => services.includes(e.heading)));
  }, [services]);

  const handleToggle = (value) => () => {
    console.log(value);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    console.log(items);
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      {items &&
        items.map((flow, i) => (
          <>
            {i !== 0 && <Divider />}
            <CardHeader
              sx={{ px: 2, py: 1 }}
              avatar={
                <Checkbox
                  onClick={handleToggleAll(items[i].workflow)}
                  checked={
                    numberOfChecked(items[i]?.workflow) === items[i]?.workflow?.length &&
                    items[i]?.workflow?.length !== 0
                  }
                  indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                  disabled={items.length === 0}
                  inputProps={{
                    'aria-label': 'all items selected'
                  }}
                />
              }
              title={flow.heading}
              subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
              sx={{
                width: 300,
                height: 'auto',
                bgcolor: 'background.paper',
                overflow: 'auto'
              }}
              dense
              component="div"
              role="list"
            >
              {flow?.workflow?.map((value) => {
                const labelId = `transfer-list-all-item-${value}-label`;

                return (
                  <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value} />
                  </ListItem>
                );
              })}
              <ListItem />
            </List>
          </>
        ))}
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="space-around" alignItems="center">
      <Grid item>{customList('Work Flow', approvals)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Work Flow Approval Level', right)}</Grid>
    </Grid>
  );
}
