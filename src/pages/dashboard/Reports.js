// material
import { Container, Grid, Stack } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  SettlementReportTable,
  TotalOfficerCard,
  ServiceCardTwo,
  ServicesCardThree,
  PoliceExtractCard,
  ServicesCard
} from '../../components/_dashboard/general-app';

// ----------------------------------------------------------------------

export default function Reports() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="General: App | Possap">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ServicesCard />
          </Grid>

          <Grid item xs={12} md={4}>
            <ServiceCardTwo />
          </Grid>

          <Grid item xs={12} md={4}>
            <ServicesCardThree />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PoliceExtractCard />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <TotalOfficerCard />
          </Grid>

          <Grid item xs={12} lg={12}>
            <SettlementReportTable />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
