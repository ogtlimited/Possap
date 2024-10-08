import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import Footer from 'src/sections/landing/Footer';
import RequestDetailsView from 'src/sections/landing/RequestDetailsView';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Request Details - ${CONFIG.appName}`}</title>
      </Helmet>

      <RequestDetailsView />

      <Footer />
    </>
  );
}
