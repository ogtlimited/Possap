import { Box, Grid, Button, Container, Typography } from '@mui/material';

const SectionFive = () => (
  <Box sx={{ pt: '80px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
    <Grid
      container
      spacing={0}
      sx={{
        margin: 0,
        padding: 0,
        bgcolor: 'bg-row-questions',
        pl: { xs: '25px', md: '120px' },
        pr: { xs: '25px', md: '75px' },
      }}
    >
      <Grid item sx={{ maxWidth: '300px', position: 'relative' }} xs={12} md={6}>
        <Container>
          <Box
            component="img"
            src="/assets/images/questionTwo.svg"
            alt="Question Two"
            sx={{
                width: {xs: '80%', sm: '60%',  lg: '80%' },
              height: 'auto',
              position: 'absolute',
              left: { xs: '15px', md: '30px' } ,
              top: { xs: '55px', md: '30px' } ,
            }}
          />
        </Container>
      </Grid>
      <Grid item sx={{ maxWidth: '300px', position: 'relative' }} xs={12} md={6}>
        <Container>
          <Box
            component="img"
            src="/assets/images/questionOne.svg"
            alt="Question One"
            sx={{
              width: {xs: '80%', sm: '60%',  lg: '80%' },
              height: 'auto',
              position: 'absolute',
              right: { xs: '5px', md: '85px' } ,
              top: { xs: '-30px', md: '-40px' } ,
            }}
          />
        </Container>
      </Grid>
    </Grid>
    <Grid container spacing={0} sx={{ margin: 0, padding: 0, display: 'flex',  alignItems: 'center', justifyContent:'center' }}>
  <Grid sx={{paddingTop: '100px', textAlign: 'center', paddingBottom: '40px'}} item>
    <Box sx={{maxWidth: '500px', paddingTop: '60px'}}>
      <Typography variant="h4" gutterBottom>
        Need Help With Getting Started?
      </Typography>
      <Typography variant="body1" paragraph>
        We understand that you might have questions about the process of making a request and possible complaints. Feel free to reach out to us.
      </Typography>
      <Button href="/p/contact" sx={{ padding: '16px 50px', borderRadius: '4px'}} variant="contained" color="primary">
        Contact Us
      </Button>
    </Box>
  </Grid>
</Grid>
  </Box>
);

export default SectionFive;
