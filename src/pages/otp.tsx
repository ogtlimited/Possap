import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import OTPView from 'src/sections/auth/otp-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`OTP - ${CONFIG.appName}`}</title>
      </Helmet>

      <OTPView />
    </>
  );
}
