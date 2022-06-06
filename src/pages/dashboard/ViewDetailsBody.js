import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';

import { Card, Grid, Stack, Box, Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import axiosInstance from '../../utils/auth-fetch';
import { PATH_DASHBOARD } from '../../routes/paths';
import getUrlString from '../../utils/get-url-string';
import { PCC, ALLESCORTSANDSERVICES, ALLPOLICEEXTRACTS } from '../../constants/api-routes';

ViewDetailsBody.propTypes = {
  data: PropTypes.object,
  context: PropTypes.string
};

export default function ViewDetailsBody({ data, context }) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [rejectloading, setRejectLoading] = useState(false);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  let mainUrl = '';
  let title = '';
  switch (context) {
    case 'pcc':
      mainUrl = getUrlString(PCC);
      title = 'CHARACTER CERTIFICATE';
      break;
    case 'eag':
      mainUrl = getUrlString(ALLESCORTSANDSERVICES);
      title = 'ESCORT AND GUARD SERVICES';
      break;
    case 'extract':
      mainUrl = getUrlString(ALLPOLICEEXTRACTS);
      title = 'EXTRACT';
      break;

    default:
      break;
  }
  const approveRequest = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (comment.length > 0) {
        const result = await axiosInstance.patch(`${mainUrl}approve/${data?.id}`, { comment });
        console.log({ result });
        enqueueSnackbar('Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.services.root);
      }
    } catch (error) {
      enqueueSnackbar('Update Failed', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const rejectRequest = async (e) => {
    e.preventDefault();
    try {
      setRejectLoading(true);
      if (comment.length > 0) {
        const result = await axiosInstance.patch(`${mainUrl}reject/${data?.id}`, { comment });
        console.log({ result });
        enqueueSnackbar('Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.services.root);
      }
    } catch (error) {
      enqueueSnackbar('Update Failed', { variant: 'error' });
    } finally {
      setRejectLoading(false);
    }
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ pb: 3 }}>REQUEST DETAILS</Box>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>File Number</TableCell>
                    <TableCell>Status Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell> {data?.id}</TableCell>
                  <TableCell> {data?.status}</TableCell>
                </TableBody>
              </Table>
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ pb: 3 }}>APPLICANT INFORMATION</Box>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Email Address</TableCell>
                    <TableCell>Selected State</TableCell>
                    <TableCell>Selected LGA</TableCell>
                    <TableCell>Address</TableCell>
                    {/* <TableCell>TIN</TableCell>
                    <TableCell>RC Number (for corporate)</TableCell>
                    <TableCell>Contact Person Name (for corporate)</TableCell>
                    <TableCell>Contact Person Email (for corporate)</TableCell>
                    <TableCell>Contact Person PhoneNumber (for corporate)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell> {data?.user?.fullName}</TableCell>
                  <TableCell> {data?.user?.phone}</TableCell>
                  <TableCell> {data?.user?.email}</TableCell>
                  <TableCell> {data?.state}</TableCell>
                  <TableCell> {data?.lga}</TableCell>
                  <TableCell> {data?.address}</TableCell>
                  {/* <TableCell> {'Not Available'}</TableCell>
                  <TableCell> {'Not Available'}</TableCell>
                  <TableCell> {'Not Available'}</TableCell>
                  <TableCell> {'Not Available'}</TableCell> */}
                </TableBody>
              </Table>
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ pb: 3 }}>DETAILS OF POLICE {title} </Box>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Request Reason</TableCell>
                    {context === 'pcc' ? (
                      <>
                        <TableCell>State Of Origin</TableCell>
                        <TableCell>Date Of Birth</TableCell>
                        <TableCell>Place Of Birth</TableCell>
                        <TableCell>Destination Country</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>Was Incident Reported?</TableCell>
                        <TableCell>Incident Reported Date</TableCell>
                        <TableCell>Affidavit Number</TableCell>
                        <TableCell>Affidavit Date of Issuance</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell> {data?.reasonForInquiry}</TableCell>
                  {context === 'pcc' ? (
                    <>
                      <TableCell> {data?.stateOfOrigin}</TableCell>
                      <TableCell> {data?.dateOfBirth}</TableCell>
                      <TableCell> {data?.placeOfBirth}</TableCell>
                      <TableCell> {data?.destinationCountry}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell> {data?.wasReported}</TableCell>
                      <TableCell> {data?.dateReported}</TableCell>
                      <TableCell> {data?.affidavitNumber}</TableCell>
                      <TableCell> {data?.affidavitIssuanceDate}</TableCell>
                    </>
                  )}
                </TableBody>
              </Table>
              {context === 'pcc' && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Previously Convicted</TableCell>
                      <TableCell>Passport Number</TableCell>
                      <TableCell>Place of Issuance</TableCell>
                      <TableCell>Date of Issuance</TableCell>
                      {data?.hasBeenConvicted !== 'no' && <TableCell>Previous Conviction History</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell> {data?.hasBeenConvicted.toUpperCase()}</TableCell>
                    <TableCell> {data?.passportNumber}</TableCell>
                    <TableCell> {data?.placeOfIssuance}</TableCell>
                    <TableCell> {data?.dateOfIssuance}</TableCell>
                    {data?.hasBeenConvicted !== 'no' && <TableCell> Not Available</TableCell>}
                  </TableBody>
                </Table>
              )}
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ pb: 3 }}>POLICE COMMAND TO PROVIDE THE SERVICE</Box>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>State</TableCell>
                    <TableCell>LGA</TableCell>
                    <TableCell>Search Command</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell> {data?.state}</TableCell>
                  <TableCell> {data?.lga}</TableCell>
                  <TableCell> {data?.certificateRequestCommand}</TableCell>
                </TableBody>
              </Table>
            </Stack>
          </Stack>
        </Card>
      </Grid>

      <Grid item xs={12} md={12}>
        <form>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Box sx={{ pb: 3 }}>Comment</Box>
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
                <TextField fullWidth required multiline onChange={(e) => setComment(e.target.value)} />
              </Stack>
            </Stack>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton onClick={approveRequest} variant="contained" loading={loading}>
                Approve
              </LoadingButton>
              <LoadingButton
                sx={{ ml: 3 }}
                variant="contained"
                color="error"
                loading={rejectloading}
                onClick={rejectRequest}
              >
                Reject
              </LoadingButton>
            </Box>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
}
