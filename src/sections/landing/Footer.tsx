import React from 'react';

import { Grid, Link, Container, Typography } from '@mui/material';

const Footer = () => (
  <Container
    disableGutters
    maxWidth={false}
    sx={{
      margin: 0,
      bgcolor: '#08102D',
      border: '1px solid #08102D',
      padding: '10px',
      paddingLeft: '120px',
      paddingRight: '100px',
      color: '#fff'
    }}
  >
    <Grid container spacing={0} sx={{ margin: 0, padding: '30px', paddingBottom: '10px', }}>
      {/* Logo Section */}
      <Grid item xs={12} md={1} sx={{ margin: 0, padding: 0, textAlign: 'center' }}>
        <img
          src="/assets/images/PossapLogo.svg"
          alt="Possap Logo"
          style={{ width: '55px', height: 'auto' }}
        />
      </Grid>
      <Grid item xs={12} md={4} sx={{ margin: 0, padding: 0 }}>
        <Typography variant="body2">
          A secure way to request and pay for your Police Specialized Services online.
        </Typography>
      </Grid>

      <Grid item xs={12} md={5} sx={{ margin: 0,  textAlign: 'center' }}>
        <Grid container spacing={0} sx={{ margin: 0, padding: 0 }}>
          <Grid item xs={6} sm={2}>
            <Link href="/p/about" underline="none" sx={{ margin: 0, padding: 0 }} color="inherit">
              About
            </Link>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Link href="/p/contact" underline="none" sx={{ margin: 0, padding: 0 }} color="inherit">
              Contact
            </Link>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Link
              href="/p/privacy-policy"
              underline="none"
              sx={{ margin: 0, padding: 0 }}
              color="inherit"
            >
              Privacy&nbsp;Policy
            </Link>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Link
              href="/p/terms-of-use"
              underline="none"
              sx={{ margin: 0, padding: 0 }}
              color="inherit"
            >
              Terms&nbsp;Of&nbsp;Use
            </Link>
          </Grid>
        </Grid>
      </Grid>

      {/* Social Media Icons Section */}
      <Grid item xs={12} md={2} sx={{ margin: 0, padding: 0 }}>
        <Grid container spacing={0} sx={{ margin: 0, padding: 0 }}>
          <Grid item xs={4}>
            <Link href="https://www.instagram.com/possap_ngg" sx={{ margin: 0, padding: 0 }}>
              <img src="/assets/images/instagram-outline.svg" alt="Instagram" />
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              href="https://www.facebook.com/profile.php?id=61552184257184"
              sx={{ margin: 0, padding: 0 }}
            >
              <img src="/assets/images/facebook-outline.svg" alt="Facebook" />
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="https://twitter.com/possap_ngg" sx={{ margin: 0, padding: 0 }}>
              <img src="/assets/images/twitter-outline.svg" alt="Twitter" />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

export default Footer;
