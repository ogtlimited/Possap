import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import { Grid, Button, Typography, StepButton } from '@mui/material';

const steps = ['Request', 'Approval', 'Fulfilment'];

type ServiceSectionProps = {
  currentStep: number;
};
const stepsContent = [
  {
    title: 'Request Service',
    text: `Click on the “Request Service” or “Get Started” button to access a page to request a
            service. You might be required to create an account if you don’t already have one.`,
    img: 'assets/images/RequestService.png',
  },
  {
    title: 'Wait For Approval',
    text: `Upon applying for a service, your request will be reviewed by the appropriate authorities based on the approval guideline.`,
    img: 'assets/images/Approval.png',
  },
  {
    title: 'Receive Your Service',
    text: `Congrats! Your request has been approved; you are to kindly follow the laid down instructions to receive your request.`,
    img: 'assets/images/Fulfillment.png',
  },
];
const ServiceSection = ({ currentStep }: ServiceSectionProps) => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid
      container
      // spacing={2}
      sx={{
        margin: 'unset',
        display: 'flex',
        alignItems: 'center',
        pt: '50px',
        pl: {sm: '25px', md: '120px'},
        pr:  {sm: '25px', md: '75px'},
      }}
    >
      <Grid sx={{p: {md: '20px'}}} item xs={12} md={6}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            {stepsContent[currentStep].title}
          </Typography>
          <Typography variant="body1" paragraph>
            {stepsContent[currentStep].text}
          </Typography>
          <Button variant="contained" color="primary" href="/p/select-service">
            Get Started
          </Button>
        </Box>
      </Grid>
      <Grid sx={{padding: {xs: '20px', md: '20px'}}} item xs={12} md={6}>
        <Box
          component="img"
          src={stepsContent[currentStep].img}
          alt="Request Service"
          sx={{ width: '100%', height: 'auto' }}
        />
      </Grid>
    </Grid>
  </Box>
);

const HowItWork = () => {
  const [activeStep, setactiveStep] = useState(1);

  const handleActiveStep = (step: number) => {
    setactiveStep(step);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        spacing={2}
        sx={{ margin: 'unset', display: 'flex', alignItems: 'center', pt: '30px', mb: '.5rem' }}
      >
        <Grid item xs={12} md={12} textAlign="center">
          <Typography variant="h3">How Does It Work</Typography>
        </Grid>
      </Grid>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ cursor: 'pointer' }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={() => handleActiveStep(index + 1)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mx: '20px' }}>
        <ServiceSection currentStep={activeStep - 1} />
      </Box>
    </Box>
  );
};

export default HowItWork;
