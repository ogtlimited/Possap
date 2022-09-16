import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';

// routes
import NewFormService from '../../components/_dashboard/service/NewFormService';
import ServiceNewForm from '../../components/_dashboard/service/ServiceNewForm';
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function ServiceCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { name } = useParams();
  const isEdit = pathname.includes('edit');

  // useEffect(() => {
  // }, []);

  return (
    <Page title="Service: Create a new service | Possap">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new service' : 'Edit service'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Service', href: PATH_DASHBOARD.service.root },
            { name: !isEdit ? 'New Service' : name }
          ]}
        />
        <ServiceNewForm />
      </Container>
    </Page>
  );
}
