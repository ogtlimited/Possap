import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ValidateDocument from 'src/sections/landing/ValidateDocument';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Validate Document - ${CONFIG.appName}`}</title>
      </Helmet>

      <ValidateDocument />
    </>
  );
}
