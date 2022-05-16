import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify/icons-eva/shield-fill';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Switch, Divider, Typography, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
//
import rand from '../../../utils/rand';
import axiosInstance from '../../../utils/auth-fetch';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.neutral
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

PaymentSummary.propTypes = {
  formik: PropTypes.object
};
const { Bank3D } = window;
export default function PaymentSummary({ formik }) {
  const { getFieldProps, isSubmitting } = formik;
  const handleOnSubmit = (event) => {
    event.preventDefault();

    const payment = Bank3D.createPayment({
      reference: rand(10), // generates a pseudo-unique reference. Please replace with a reference you generated.
      currencyCode: 'NGN',
      merchantKey: 'PayzoneAPP', // use your test or live merchant key
      amount: 3000,
      email: 'test@gmail.com',
      phone: '0801234567889',
      color: '#2f4cb0',
      mode: 'test',
      onReady() {
        // The popup's iframe has loaded and it's preloader is visible
        // Use this to stop you own custom preloader
      },
      onClose() {
        // The user closed the popup or transaction was not completed
      },
      callback(res) {
        console.log(res);
        const values = {
          amount: res.amount,
          transactionType: 'debit',
          channel: 'Bank3D',
          channelReferenceNumber: res.reference
        };
        console.log(values);
        axiosInstance
          .post(``, values)
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            console.log(err.error);
          });
        // Transaction was completed and it was successfull.
        // This is the stage where it's necessary to verify the payment using "reference" argument
      }
    });
    payment.open();
  };

  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Summary
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Amount Due
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography sx={{ color: 'text.secondary' }}>₦</Typography>
          <Typography variant="h2" sx={{ mx: 1 }}>
            3000
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Total Billed
          </Typography>
          <Typography variant="h6" component="p">
            ₦ 3000*
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>

      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Plus applicable taxes
      </Typography>

      <LoadingButton
        fullWidth
        size="large"
        onClick={handleOnSubmit}
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 5, mb: 3 }}
      >
        Pay Online
      </LoadingButton>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={shieldFill} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
