// material
import { styled } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import { ContactHero, ContactForm } from '../components/_external-pages/contact';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function Contact() {
  return (
    <RootStyle title="Contact us | Possap">
      <ContactHero />

      <Container sx={{ my: 10 }}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
