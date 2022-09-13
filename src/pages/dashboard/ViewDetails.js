import React from 'react';
import { Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import ViewDetailsBody from './ViewDetailsBody';

export default function ViewDetails() {
  const { themeStretch } = useSettings();
  const location = useLocation();
  const data = location.state[0];
  const context = location.state[1];

  return (
    <Page title="Details | Possap">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Services', href: PATH_DASHBOARD.services.root }
          ]}
        />
        <ViewDetailsBody data={data} context={context} />
      </Container>
    </Page>
  );
}
