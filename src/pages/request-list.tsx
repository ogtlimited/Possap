import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import Footer from 'src/sections/landing/Footer';
import RequestListView from 'src/sections/landing/RequestListView';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Request List - ${CONFIG.appName}`}</title>
      </Helmet>

      <RequestListView />

      <Footer />
    </>
  );
}
