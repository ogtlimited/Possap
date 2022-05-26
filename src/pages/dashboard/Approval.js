import React from 'react';
import { Container } from '@material-ui/core';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import ApprovalBody from './ApprovalBody';

export default function Approval() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Approval Log | Possap">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Approval Log"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Services', href: PATH_DASHBOARD.services.root }
          ]}
        />
        <ApprovalBody />
      </Container>
    </Page>
  );
}
