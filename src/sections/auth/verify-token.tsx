import { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export function RetrieveEmailVerifyToken() {
  const router = useRouter();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [codes, setCodes] = useState<any>({
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    setCodes((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
    if (value.length >= 1 && index < inputRefs.current.length - 1) {
      // Focus the next input field
      inputRefs.current[index + 1].focus();
    }
  };
  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);
  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" sx={{ gap: 1 }}>
        {['value1', 'value2', 'value3', 'value4', 'value5', 'value6'].map((name, index) => (
          <TextField
            key={name}
            onChange={(e: any) => handleChange(e, index)}
            // eslint-disable-next-line no-return-assign
            inputRef={(el) => (inputRefs.current[index] = el)} // Assign the ref
            name={name}
            value={codes[name]}
            sx={{ mb: 3 }}
          />
        ))}
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Didn’t receive a code?
        <Link variant="subtitle2" sx={{ ml: 0.5 }}>
          Resend code
        </Link>
      </Typography>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        onClick={handleSignIn}
      >
        Verify Account
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h5">Retrieve Email Verification</Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary">
          Kindly enter the secret code sent to your phone number to get your email.
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}
