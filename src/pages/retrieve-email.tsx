import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { RetrieveEmail } from 'src/sections/auth/retrieve-email';
import { RetrieveEmailVerifyToken } from 'src/sections/auth/verify-token';

// ----------------------------------------------------------------------

export default function Page() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  return (
    <>
      <Helmet>
        <title> {`Retrieve Email - ${CONFIG.appName}`}</title>
      </Helmet>
      {token ? <RetrieveEmailVerifyToken /> : <RetrieveEmail />}
    </>
  );
}
