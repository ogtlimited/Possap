// material
import { Container, Grid, Stack } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import useAllService from '../../queries/getAllServices';
// components
import Page from '../../components/Page';
import {
  UserRequestTable,
  UserCharacterCertifcateCard,
  UserEGCard,
  UserPoliceExtractCard,
  UserWelcome
} from '../../components/_dashboard/general-app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { data } = useAllService();

  return (
    <Page title="General: App | Possap">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <UserWelcome displayName={user.fullName} />
          </Grid>
          <Grid item xs={12} md={4}>
            <UserPoliceExtractCard TOTAL_EXT={data?.userEGSRecords.length} />
          </Grid>

          <Grid item xs={12} md={4}>
            <UserCharacterCertifcateCard TOTAL_CC={data?.userPCCRecords.length} />
          </Grid>

          <Grid item xs={12} md={4}>
            <UserEGCard TOTAL_EG={data?.userExtractRecords.length} />
          </Grid>

          <Grid item xs={12} lg={12}>
            <UserRequestTable />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
