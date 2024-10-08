import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import { CONFIG } from 'src/config-global';

import {
  SelectServiceView,
  SelectServiceStepper,
  UserProfileConfirmation,
} from 'src/sections/select-service';

// ----------------------------------------------------------------------

export default function Page() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    console.log(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Helmet>
        <title> {`Select Service - ${CONFIG.appName}`}</title>
      </Helmet>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <SelectServiceStepper activeStep={activeStep} />
        {activeStep === 0 ? (
          <SelectServiceView handleNext={handleNext} handlePrev={handleBack} />
        ) : activeStep === 1 ? (
          <UserProfileConfirmation />
        ) : (
          <>Null</>
        )}
      </Box>
    </>
  );
}
