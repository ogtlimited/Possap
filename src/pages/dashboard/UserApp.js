// material
import { Container, Grid, Stack } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  UserRequestTable,
  TotalOfficerCard,
  ServiceCardTwo,
  ServicesCardThree,
  PoliceExtractCard,
  ServicesCard,
  UserWelcome
} from '../../components/_dashboard/general-app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="General: App | Possap">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <UserWelcome displayName={user.fullName} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ServicesCard />
          </Grid>

          <Grid item xs={12} md={4}>
            <ServiceCardTwo />
          </Grid>

          <Grid item xs={12} md={4}>
            <ServicesCardThree />
          </Grid>

          <Grid item xs={12} lg={12}>
            <UserRequestTable />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
