/* eslint-disable react/destructuring-assignment */
import React from 'react';

import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Step, Card, Stepper, Typography } from '@mui/material';

const CustomStepIcon = (props: { active: boolean }) => (
    <Box
      sx={{
        width: 10,
        height: 10,
        backgroundColor: props.active ? '#1976d2' : '#ccc',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: 1,
      }}
     />
  );

const steps = [
  'Select Service',
  'Fill Request Form',
  'Confirm Details and Submit Request',
  'Make Payment',
];

export const SelectServiceStepper: React.FC<{activeStep: number}> = ({activeStep}) => {
 console.log(activeStep);

  return (
    <Card sx={{ width: '100%', mt: 0, py: 1, border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '70%'}}>
      <Stepper  alternativeLabel activeStep={activeStep} connector={<ArrowForwardIcon sx={{width: '10px', marginRight: '10px'}} />}>
        {steps.map((label, index) => (
          <Step sx={{display: 'flex'}} key={label}>
            <Box sx={{flexDirection: 'row'}} >
             <CustomStepIcon active={index === activeStep} /><Typography component="span" variant='body2'>{label}</Typography>
            </Box>
          </Step>
        ))}
      </Stepper>
        </Box>

    </Card>
  );
};

