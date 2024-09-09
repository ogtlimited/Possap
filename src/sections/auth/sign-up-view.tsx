import type { ISignupForm } from 'src/models/auth.interface';

import React, { useState } from 'react';

import { Container, Typography } from '@mui/material';

import { SignupStepOneForm, SignupStepTwoForm } from './sign-up-steps';

const initialFormData: ISignupForm = {
  taxPayerType: '',
  idType: '',
  idNumber: '',
  fullName: '',
  phoneNumber: '',
  email: '',
  gender: '',
  state: '',
  lga: '',
  address: '',
  password: '',
  confirmPassword: '',
};

export const SignUpView = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ISignupForm>(initialFormData);

  const handleFirstStepSubmit = (data: Partial<ISignupForm>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setCurrentStep(2);
  };

  const handleSecondStepSubmit = (data: Partial<ISignupForm>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    console.log('Final form data:', formData);
  };

  const handleBackButtonClick = () => {
    setCurrentStep(1);
  };

  console.log('signup');
  return (
    <Container maxWidth="md" sx={{ marginTop: '10px' }}>
          <Typography variant="h3" gutterBottom>
        Signup
      </Typography>
      <Typography variant="body1">Create an account to get started.</Typography>

      {currentStep === 1 ? (
        <SignupStepOneForm initialData={formData} onProceed={handleFirstStepSubmit} />
      ) : (
        <SignupStepTwoForm initialData={formData} onBack={handleBackButtonClick} onProceed={handleSecondStepSubmit} />
      )}
    </Container>
  );
};
