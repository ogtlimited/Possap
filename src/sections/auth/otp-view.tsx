import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const OTPView = () => {
  const length = 5;
  const inputRef = useRef(Array(length).fill(null));

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required('OTP is required')
      .length(length, `OTP must be exactly ${length} digits`),
  });

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleTextChange = (input: string, index: number) => {
    if (/^\d*$/.test(input)) {
      // Only allow digits
      const newOtp = formik.values.otp.split('');
      newOtp[index] = input;
      formik.setFieldValue('otp', newOtp.join(''));

      if (input.length === 1 && index < length - 1) {
        inputRef.current[index + 1]?.focus();
      }

      if (input.length === 0 && index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <Box
      sx={{
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Verify OTP
          </Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5, textAlign: 'center' }}>
            Enter the otp code sent to your device
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Resend
            </Link>
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ mb: 3 }}
            >
              {Array.from({ length }, (_, index) => (
                <TextField
                  key={index}
                  type="text"
                  inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                  value={formik.values.otp[index] || ''}
                  onChange={(e) => handleTextChange(e.target.value, index)}
                  inputRef={(ref) => {
                    inputRef.current[index] = ref;
                  }}
                  error={formik.touched.otp && Boolean(formik.errors.otp)}
                  sx={{ width: 60 }}
                />
              ))}
            </Stack>

            {formik.touched.otp && formik.errors.otp && (
              <Typography variant="body2" color="error" sx={{ mb: 2, textAlign: 'center' }}>
                {formik.errors.otp}
              </Typography>
            )}

            <LoadingButton
              fullWidth
              size="large"
              color="inherit"
              type="submit"
              variant="contained"
              loading={formik.isSubmitting}
            >
              Complete Login
            </LoadingButton>
          </form>
        </Card>
      </Stack>
    </Box>
  );
};

export default OTPView;
