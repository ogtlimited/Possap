import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Grid, Button, Container, Typography, LinearProgress } from '@material-ui/core';
// utils
import { fPercent } from '../../../utils/formatNumber';
import mockData from '../../../utils/mock-data';
//
import { MHidden } from '../../@material-extend';
import { varFadeInUp, varFadeInRight, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const LABEL = ['Development', 'Design', 'Marketing'];

const MOCK_SKILLS = [...Array(3)].map((_, index) => ({
  label: LABEL[index],
  value: mockData.number.percent(index)
}));

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left'
  }
}));

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  })
};

function ProgressItem({ progress }) {
  const { label, value } = progress;
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2">{label}&nbsp;-&nbsp;</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fPercent(value)}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          '& .MuiLinearProgress-bar': { bgcolor: 'grey.700' },
          '&.MuiLinearProgress-determinate': { bgcolor: 'divider' }
        }}
      />
    </Box>
  );
}

export default function AboutWhat() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const shadow = `-40px 40px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.48)}`;

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <MHidden width="mdDown">
            <Grid item xs={12} md={6} lg={7} sx={{ pr: { md: 7 } }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={6}>
                  <MotionInView variants={varFadeInUp}>
                    <Box
                      component="img"
                      src="/static/home/PossapLogo.svg"
                      sx={{
                        borderRadius: 2,
                        boxShadow: shadow
                      }}
                    />
                  </MotionInView>
                </Grid>
              </Grid>
            </Grid>
          </MHidden>

          <Grid item xs={12} md={6} lg={5}>
            <MotionInView variants={varFadeInRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                What is Possap?
              </Typography>
            </MotionInView>

            <MotionInView variants={varFadeInRight}>
              <Typography
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white')
                }}
              >
                An Initiative launched by the Nigeria Police Force (NPF) for improvements in the efficiency of the
                processes and administration of all its fee-based Specialized Services through automation. This solution
                will use smart technology to automate and manage the entire process of rendering Police Specialized
                Services in an efficient, transparent and highly professional manner in line with global best practices.
              </Typography>
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
