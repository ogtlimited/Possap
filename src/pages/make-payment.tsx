import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import MakePayment from 'src/sections/landing/MakePayment';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      {' '}
      <Helmet>
        <title> {`Make Payment - ${CONFIG.appName}`}</title>
      </Helmet>
      <MakePayment />
    </>
  );
}
