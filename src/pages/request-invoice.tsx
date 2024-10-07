import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import Footer from 'src/sections/landing/Footer';
import RequestInvoiceView from 'src/sections/landing/RequestInvoiceView';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Request Invoice - ${CONFIG.appName}`}</title>
      </Helmet>

      <RequestInvoiceView />
      
      <Footer />
    </>
  );
}
