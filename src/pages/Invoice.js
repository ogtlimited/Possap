/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Grid, Container, Typography, useMediaQuery, Button } from '@material-ui/core';

import { useParams, useSearchParams, useLocation } from 'react-router-dom';
// components
import Page from '../components/Page';
import { PaymentSummary, PaymentMethods, PaymentBillingAddress, Notice } from '../components/_external-pages/payment';
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
export default function Invoice() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();
  const params = useParams();
  const [urlObj, seturlObj] = useState({})
  const searchParams = useLocation().search;
  useEffect(() => {
    const query = params.id;
    const requestID = searchParams.slice(searchParams.lastIndexOf('=') + 1);
    console.log(query, requestID)
    seturlObj({
      query : params.id,
      requestID: searchParams.slice(searchParams.lastIndexOf('=') + 1)
    })
  }, [params]);

  const { handleFormChange } = useServiceForm();
  const [initialValues, setinitialValues] = useState({
    name: user.fullName,
    phone: user.phone,
    email: user.email,
    address: user.address,
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
            Request Summary and Invoice Generation
          </Typography>
          {/* <Typography align="center" sx={{ color: 'text.secondary' }}>

          </Typography> */}
        </Box>
        <Card>
          <Grid p={2} container spacing={upMd ? 5 : 2}>
            <Grid item xs={12} md={7}>
              <FormSummary urlObj={urlObj} />
            </Grid>
            <Grid item xs={12} md={5}>
              <PaymentSummary formik={formik} />
            </Grid>
          </Grid>

        </Card>
      </Container>
    </RootStyle>
  );
}
