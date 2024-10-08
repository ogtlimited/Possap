import { useCallback } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export function RetrieveEmail() {
  const router = useRouter();

  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="phoneNumber"
        label="Phone Number"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        onClick={handleSignIn}
      >
        Proceed
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h5">Confirm Your Phone Number</Typography>
        <Typography variant="caption" textAlign="center" color="text.secondary">
          A verification code will be sent to the specified phone number you used for registration.
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}
