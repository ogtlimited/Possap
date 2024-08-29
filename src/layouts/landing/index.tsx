import React from 'react'
import { Outlet } from 'react-router-dom'

import LandingNavBar from './LandingNavBar'

const LandingPageLayout = () => (
    <>
    <LandingNavBar />
    <div>
        <Outlet />
    </div>
    </>
  )

export default LandingPageLayout
