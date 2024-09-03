import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AboutView from 'src/sections/landing/aboutView';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`About - ${CONFIG.appName}`}</title>
      </Helmet>

      <AboutView />
    </>
  );
}
