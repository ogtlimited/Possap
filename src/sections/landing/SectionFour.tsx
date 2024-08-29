import React from 'react';

import  Link from '@mui/material/Link';
import { Grid, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';


const items = [
  {
    icon: '/assets/images/paymentCards.svg',
    title: 'Multiple Payment Channels',
    text: `Payments can be made against an invoice at any bank branch, mobile banking, POS or online with debit cards (MasterCard, Visa, Verve)`,
  },
  {
    icon: '/assets/images/laptopMobile.svg',
    title: 'Convenience and Ease',
    text: `Request and pay for police specialized services online at your convenience. You can now access police specialized services from the comfort of your home, office or on the go.`,
  },
  {
    icon: '/assets/images/cardTimer.svg',
    title: 'Payment Transaction Records',
    text: `View your request and  payment history in one place.`,
  },
];
const SectionFour = () => (
  <Grid container>
    <Grid item textAlign="center" xs={12} md={12} sx={{ padding: 'unset', pt: '50px' }}>
      <Typography variant="h4">
        Take Advantage of All The <br />
        Benefits
      </Typography>
    </Grid>
    {items.map((item) => (
      <Grid
        item
        textAlign="center"
        xs={12}
        md={4}
        sx={{ pt: '50px', pl: { xs: '25px', md: '120px' }, pr: { xs: '25px', md: '75px' } }}
      >
        <img src={item.icon} alt="" />
        <Typography variant="h4" sx={{ color: '#444', mb: '10px' }}>
          {item.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#767070', mb: '1rem' }}>
          {item.text}
        </Typography>
      </Grid>
    ))}
    <Grid item textAlign="center" xs={12} md={12} sx={{ padding: 'unset', pt: '35px' }}>
      <Link
        component={RouterLink}
        href="#"
        color="inherit"
        sx={{ typography: 'subtitle2', bgcolor: '#2F4CB0', color: '#fff', p:'16px 50px', borderRadius: '4px' }}
      >
        Get Started
      </Link>
    </Grid>
  </Grid>
);

export default SectionFour;
