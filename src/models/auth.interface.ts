export interface ISignupForm {
  taxPayerType: string;
  idType: string;
  idNumber: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  state: string;
  lga: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export interface ISignupStepOneFormProps {
  initialData: Partial<ISignupForm>;
  onProceed: (data: Partial<ISignupForm>) => void;
}

export interface ISignupStepTwoFormProps {
  initialData: Partial<ISignupForm>;
  onProceed: (data: Partial<ISignupForm>) => void;
  onBack: () => void;
}
