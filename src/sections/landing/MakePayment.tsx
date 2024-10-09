import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {
  Box,
  Card,
  Link,
  Grid,
  List,
  Button,
  ListItem,
  Accordion,
  Typography,
  CardHeader,
  Breadcrumbs,
  CardContent,
  ListItemText,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

const data = [
  {
    title: 'BANK TRANSFER',
    subtitle: 'Follow the steps below to make payments on your mobile banking platforms:',
    items: [
      'Login to your bank mobile application and select transfer to bank',
      'Select Parkway Readycash as the receiving bank and input your invoice number e.g 1000177970 as the receiving bank account number.',
      'Enter the exact amount to pay in the “Amount to transfer” field i.e ₦500.00 and proceed.',
    ],
  },
  {
    title: 'BANK BRANCH',
    subtitle: 'Follow the steps below to make payment at any bank branch:',
    items: [
      'Kindly walk into any bank branch of your choice and present your Bank3D Invoice Number (BIN) to make payment against this invoice using Remita. Please note that the invoice number also serves as the RRR.',
    ],
  },
  {
    title: 'PARKWAY WALLET',
    subtitle: 'Follow the steps below to make payments using Parkway Wallet:',
    items: [
      'Login to your Parkway wallet application and click on the Transfer option.',
      'Select “To Invoice” and enter your invoice number, click on “Proceed” and confirm the payment details.',
      'Click the “Confirm” button and input your 4-digit transaction PIN.',
    ],
  },
  {
    title: 'POS',
    subtitle: 'Follow the steps below to make payments via pos:',
    items: [
      'You can make payment at designated POS terminals with your ATM cards (MasterCard, Visa and Verve). You will be required to present your Bank3D Invoice Number (BIN)',
    ],
  },
];

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
      <Typography sx={{ display: { xs: 'none', sm: 'flex' } }}> Home</Typography>
    </Link>,
    <Link underline="hover" key="2" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
      <CheckCircleIcon sx={{ mr: 0.5, color: '#4dd555', fontSize: '14px' }} fontSize="inherit" />
      <Typography sx={{ display: { xs: 'none', sm: 'flex' } }}> Search by Bin</Typography>
    </Link>,
    <Typography key="3" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
      <RadioButtonCheckedIcon
        sx={{ mr: 0.5, color: '#2f4cb0', fontSize: '14px' }}
        fontSize="inherit"
      />
      <Typography sx={{ display: { xs: 'none', sm: 'flex' } }}> Make Payment</Typography>
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
      <Grid container sx={{ background: '#f2f6f9', height: '100%' }}>
        <Grid item xs={12} md={8} lg={8} sm={12} sx={{ paddingLeft: { sm: 0, md: 30 } }}>
          <Card
            sx={{
              padding: '30px',
              // width: '70%',
              margin: '30px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e3e4e9',
              }}
            >
              <Typography>Invoice Number: 1000297426</Typography>
              <Box sx={{ display: 'flex', gap: '0.4rem' }}>
                <Typography sx={{ color: '#2f4cb0', cursor: 'pointer' }}>
                  <Link>View Invoice</Link>{' '}
                </Typography>{' '}
                |
                <Typography sx={{ color: '#2f4cb0', cursor: 'pointer' }}>
                  {' '}
                  <Link>View Receipts</Link>{' '}
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={2} py={3}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography sx={{ color: 'GrayText' }}>Name:</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography>Abubakar</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography sx={{ color: 'GrayText' }}>Invoice Amount Due:</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography>₦500.00</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography sx={{ color: 'GrayText' }}>Invoice Desription:</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography>Processing/Application Fee for TINT PERMIT TGP0000002307</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography sx={{ color: 'GrayText' }}>Payer ID:</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography>DE-000107</Typography>
              </Grid>
            </Grid>
          </Card>
          <Card
            sx={{
              padding: '30px',
              // width: '70%',
              margin: '30px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ fontSize: '1.2rem', fontWeight: '400' }}>
              Other Payment Methods
            </Typography>
            {data?.map((dt) => (
              <Accordion>
                <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                  {dt?.title}
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: '600' }}>
                    {dt.subtitle}
                  </Typography>
                  <List sx={{ py: '1px' }}>
                    {dt.items.map((item, index) => (
                      <ListItem key={index} sx={{ py: '2px' }}>
                        <ListItemText secondary={item} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4} sm={12}>
          <Card
            sx={{
              // padding: '30px',
              background: '#2f4cb0',
              margin: '30px',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              color: '#fff',
              width: {
                sm: '100%',
                md: '65%',
              },
            }}
          >
            <CardHeader
              sx={{ borderBottom: '1px solid #fff' }}
              title={
                <Typography sx={{ color: '#fff', marginBottom: '3px' }} variant="body1">
                  Summary
                </Typography>
              }
            />
            <CardContent sx={{ marginLeft: '0.4rem' }}>
              <Typography variant="body2">Amount Due</Typography>
              <Typography variant="h3">₦500.00</Typography>
            </CardContent>
            <Button
              sx={{
                background: '#fff',
                marginX: '1.5rem',
                marginBottom: '1.4rem',
                paddingY: '0.8rem',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              Pay Online
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MakePayment;
