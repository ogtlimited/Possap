import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="Police Specialized Services Automation Project (POSSAP) Portal"
        />
        <meta name="keywords" content="POSSAP, Police Services, Extract, Escort & Guard, Tint Permit" />
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}
