import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Box, Card, Link, Grid, Typography, CardHeader, Breadcrumbs } from '@mui/material';

const MakePayment = () => {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <CheckCircleIcon sx={{ mr: 0.5, color: '#4dd555', fontSize: '14px' }} fontSize="inherit" />
      Home
    </Link>,
    <Link underline="hover" key="2" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
      <CheckCircleIcon sx={{ mr: 0.5, color: '#4dd555', fontSize: '14px' }} fontSize="inherit" />
      Search by Bin
    </Link>,
    <Typography key="3" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
      <RadioButtonCheckedIcon
        sx={{ mr: 0.5, color: '#2f4cb0', fontSize: '14px' }}
        fontSize="inherit"
      />
      Make Payment
    </Typography>,
  ];
  return (
    <>
      <Box
        sx={{
          margin: 0,
          padding: '10px',
          border: '1px solid #E3E3E3',
          borderLeft: 'none',
          borderRight: 'none',
          background: '#FCFDFD',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
      <Grid container>
        <Grid item md={8} lg={8} sm={12}>
          <Card
            sx={{
              padding: '30px',

              margin: '30px auto',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardHeader>
              <Box>
                {' '}
                <Typography>Invoice Number: 1000297426</Typography>
                <Box>
                  <Typography>View Invoice </Typography> |<Typography> View Receipts</Typography>
                </Box>
              </Box>
            </CardHeader>
          </Card>
        </Grid>
        <Grid item md={4} lg={4} sm={12}>
          <Card
            sx={{
              padding: '30px',
              background: '#2f4cb0',
              margin: '30px auto',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              color: '#fff',
              width: '80%',
            }}
          >
            <CardHeader
              title={<Typography sx={{ color: '#fff', fontSize: '1.2rem' }}>Summary</Typography>}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MakePayment;
