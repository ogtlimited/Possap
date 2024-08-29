import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

const SectionThree = () => (
  <Box sx={{ width: '100%' }}>
    <Grid
      container
      spacing={2}
      sx={{
        margin: 'unset',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: { xs: '25px', md: '80px' },
        paddingRight: { xs: '25px', md: '75px' },
      }}
    >
      <Grid item sx={{ padding: { md: '20px' } }} xs={12} md={6}>
        <img alt="" src="/assets/images/approvedRequest.svg" className="img img-responsive" />
      </Grid>
      <Grid item sx={{ p: { xs: '20px', md: '20px' } }} xs={12} md={6}>
        <Typography color="#13A613">Avoid the hassle</Typography>
        <Typography sx={{ fontSize: '28px', mb: '15px', color: '#444' }}>
          Get Police Specialized Services with no hassle
        </Typography>
        <Typography variant="body1">
          The POSSAP portal provides you the ability to request services such as Police Extract,
          FireArm License, Police Escort, Police Protection Services, CID Clearance Certificate,
          Tint Permit, from the comfort of your home.
        </Typography>
        <a href="/p/select-service">Get Started ›</a>
      </Grid>
    </Grid>
  </Box>
);

export default SectionThree;
