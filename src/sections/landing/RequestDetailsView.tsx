import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Card, Grid, Link, Typography } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

export default function RequestDetailsView() {
  const navigate = useNavigate();
  const date = new Date();

  return (
    <Box sx={{ color: "#212529"}}>
      <Box component="div" style={{ display: "flex", padding: "1rem", borderBottom: "1px solid black", gap: "1rem"}}>
        <Grid onClick={() => navigate(-1)} display="flex" alignItems="center" borderRight="1px solid black" padding="0 10px" style={{ cursor: "pointer" }}>
          <Iconify icon="mingcute:left-line" sx={{ mr: 1 }} />
          <Typography>Back</Typography>
        </Grid>
        <Typography fontWeight={600}>Request for TINT PERMIT</Typography>
      </Box>
      
      <Box component="div" margin="1.75rem">
        <Typography>
          Request Status:
          <Typography
            component="span"
            style={{
              background: '#FFF2CC',
              color: '#FFA500',
              padding: '0.5rem 1rem',
              textAlign: 'center',
              borderRadius: "20px",
              margin: "0 0.75rem"
            }}
          >
          Pending
        </Typography> 
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ margin: "1rem 0", padding: "3rem", width: "100vw" }}>
        <Grid item xs={12} md={6} sx={{ display: "flex", gap: "1rem" }}>
          <Box component="div" width="70px" height="70px" borderRadius="50%" border="2px solid green" />
          <Card style={{ padding: "1rem", width: "80%" }}>
            <Typography>
              <span style={{ fontWeight: "700" }}>Generate Invoice</span> Completed:
            </Typography>
            <Typography margin="1rem 0">
              Hi there, to continue your application process kindly pay your processing fee, you can click on the link below to view your invoice
            </Typography>
            <Link href=''>View Invoice</Link>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <Box component="div" display="flex" padding="10px 20px" alignItems="center" borderBottom="1px solid #E3E3E3">
              <Iconify icon="lucide:info" sx={{ mr: 1, opacity: "0.5" }} />
              <Typography>Request Details</Typography>
            </Box>
            <Grid container spacing={3} padding="1.75rem">
              <Grid item xs={6}>
                <Typography fontWeight={500} color="#767070">Service Requested:</Typography>
                <Typography>TINT PERMIT</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight={500} color="#767070">Address:</Typography>
                <Typography>kubwa abuja</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight={500} color="#767070">File Ref Number:</Typography>
                <Typography>TGP0000002307</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight={500} color="#767070">VIN</Typography>
                <Typography>28383848538</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight={500} color="#767070">Plate Number:</Typography>
                <Typography>ABC499393</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight={500} color="#767070">Vehicle Make:</Typography>
                <Typography>Toyota</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight={500} color="#767070">Color:</Typography>
                <Typography>Black</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight={500} color="#767070">Date Issued:</Typography>
                <Typography>{fDateTime(date, 'DD/MM/YYYY h:mm a')}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}