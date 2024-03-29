/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Grid, Container, Typography, useMediaQuery, Button } from '@material-ui/core';
// utils
import ServiceForm from '../components/services/services-form';
import fakeRequest from '../utils/fakeRequest';
// components
import Page from '../components/Page';
import { PaymentSummary, PaymentMethods, PaymentBillingAddress, Notice } from '../components/_external-pages/payment';
import { SelectService } from '../components/_external-pages/services';
import EXTRACT from '../json-form/police-extract.json';
import CHARACTERCERT from '../json-form/policeCharacterCertificate.json';
import GUARDSERVICES from '../json-form/escortAndGuardServices.json';
import { PoliceExtractForm, CharacterCertForm, EGForm } from '../components/services';
import useAuth from '../hooks/useAuth';
import useServiceForm from '../hooks/useServiceForm';
import FormSummary from '../components/_external-pages/services/FormSummary';
// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Payment() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { handleFormChange } = useServiceForm();
  const [initialValues, setinitialValues] = useState({
    originState: user?.state,
    originLga: user?.lga,
    serviceType: '',
    serviceCategory: '',
    serviceSubCategory: ''
  });
  useEffect(() => {
    handleFormChange(initialValues);
  }, [user]);

  const [step, setStep] = useState('one');
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [firstValue, setfirstValue] = useState({});
  const sTypes = ['police-extract', 'character-certificate', 'escort-and-guard-services'];
  const PaymentSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    address: Yup.string().required('Address is required')
  });
  const formik = useFormik({
    initialValues,
    validationSchema: PaymentSchema,
    onSubmit: async (values, { resetForm }) => {
      setfirstValue(values);
      // await fakeRequest(500);
      // resetForm();
      enqueueSnackbar('Payment success', { variant: 'success' });
    }
  });
  const { values, errors, isSubmitting } = formik;

  return (
    <RootStyle title="Request Service ">
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" align="center" paragraph>
            Select a service to continue
          </Typography>
          {/* <Typography align="center" sx={{ color: 'text.secondary' }}>

          </Typography> */}
        </Box>
        {step === 'one' ? (
          <Card>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={upMd ? 5 : 2}>
              <Grid item xs={12} md={6} p={2}>
                <SelectService formik={formik} />
                <Button
                  disabled={values.serviceType === ''}
                  onClick={() => {
                    handleFormChange(values);
                    setStep('two');
                  }}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ mt: 5, mb: 3 }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Card>
            {/* <FormikProvider value={formik}>
              <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}> */}
            <Grid p={2} container spacing={upMd ? 5 : 2}>
              <Grid item xs={12} md={7}>
                {values.serviceType === sTypes[0] ? (
                  <PoliceExtractForm setStep={setStep} parentValues={values} />
                ) : values.serviceType === sTypes[1] ? (
                  <CharacterCertForm setStep={setStep} parentValues={values} />
                ) : values.serviceType === sTypes[2] ? (
                  <EGForm setStep={setStep} parentValues={values} />
                ) : (
                  []
                )}
              </Grid>
              {/* <Grid item xs={12} md={4}>
                    <PaymentMethods formik={formik} />
                  </Grid> */}
              <Grid item xs={12} md={5}>
                {/* <FormSummary /> */}
                {/* <PaymentSummary formik={formik} /> */}
                <Notice />
              </Grid>
            </Grid>
            {/* </Form>
            </FormikProvider> */}
          </Card>
        )}
      </Container>
    </RootStyle>
  );
}
