import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Grid, Link, Paper, Rating, Container, Typography, useMediaQuery } from '@material-ui/core';
//
import { varFadeInUp, varFadeInLeft, MotionInView } from '../../animate';
import { MHidden } from '../../@material-extend';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: 'Guards & Special Protection Services',
    content: `Excellent Work! Thanks a lot!`
  },
  {
    name: 'Arms & Ammunition',
    content: `Issuance of Fire Arm and License`
  },
  {
    name: 'Police Information Services',
    content: `Police Extract, Police Character Clearance Certificate, Police Investigation Report`
  },
  {
    name: 'Contractor Registration',
    content: `Contractor Registration, Renewal of Contractor Registration `
  },
  {
    name: 'International Driving Permit',
    content: `International Driving Permit, International Vehicle Certification`
  },
  {
    name: 'Other Services',
    content: `Tint Permit,Electronic Central Motor Registry, Use of Uniforms, Accoutrement & Fire Arms, Allocation of Spy Plate Numbers, Permit to Import/Sell & Use Fireworks, Police Clearance for DPR Approval`
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  backgroundSize: 'cover',
  backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.grey[900], 0.8)} , ${alpha(
    theme.palette.grey[900],
    0.8
  )}), url(/static/about/testimonials.jpg)`,
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    padding: 0,
    height: 840,
    overflow: 'hidden'
  }
}));

// ----------------------------------------------------------------------

TestimonialCard.propTypes = {
  testimonial: PropTypes.object
};

function TestimonialCard({ testimonial }) {
  const { name, rating, dateCreate, content } = testimonial;
  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        color: 'common.white',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)', // Fix on Mobile
        bgcolor: (theme) => alpha(theme.palette.common.white, 0.04)
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1.5 }}>
        {content}
      </Typography>
    </Paper>
  );
}

export default function AboutTestimonials() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: '100%' }}
        >
          <Grid item xs={10} md={4}>
            <Box sx={{ maxWidth: { md: 360 } }}>
              <MotionInView variants={varFadeInUp}>
                <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
                  LIST OF POLICE SPECIALIZED SERVICES
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography sx={{ color: 'common.white' }}>
                  With respect to extant and relevant laws, the Police Force Order which draws strength from the Police
                  Act 2020, provides for the Nigeria Police to charge fees for specialized services rendered to the
                  Nigerian public. These include the services of Police Orderlies for protection and safety of lives and
                  properties. Likewise, the Police Act 2020 permits the NPF to charge fees for private engagements and
                  other Specialized Services. It is on this basis that the Police has since its inception applied fees
                  on services such as Escort Services, Issuance of Licenses for Arms & Ammunition, Police Extracts and
                  other Specialized Services. Police Specialized Services also referred to as Police Revenue Services
                  include Police Escort & Special Security Services, Arms & Ammunition Licenses, Contractor
                  Registration, International Driving Permit, Police Extract & Information Services, other permits &
                  reports services provided pursuant to the Force Order.
                </Typography>
              </MotionInView>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={{
              right: { md: 24 },
              position: { md: 'absolute' }
            }}
          >
            <Grid container spacing={isDesktop ? 3 : 0} alignItems="center">
              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(0, 3).map((testimonial) => (
                  <MotionInView key={testimonial.name} variants={varFadeInUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </MotionInView>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(3, 6).map((testimonial) => (
                  <MotionInView key={testimonial.name} variants={varFadeInUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </MotionInView>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
