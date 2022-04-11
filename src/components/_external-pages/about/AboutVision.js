// material
import { Box, Container, Typography, Grid } from '@material-ui/core';
//
import { varFadeInUp, varFadeIn, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              Possap objectives is to improve efficiency in the process and administration of all fee-based specialized
              services provided by the Nigeria Police Force;
            </Typography>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}
