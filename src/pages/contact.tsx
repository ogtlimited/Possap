import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import Footer from 'src/sections/landing/Footer';
import ContactView from 'src/sections/landing/contactView';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Contact - ${CONFIG.appName}`}</title>
      </Helmet>

      <ContactView />

      <Footer />
    </>
  );
}
