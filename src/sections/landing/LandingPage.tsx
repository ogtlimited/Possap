import React from 'react'

import Footer from './Footer'
import HowItWork from './HowItWork'
import SectionFour from './SectionFour'
import SectionFive from './SectionFive'
import HeroCarousel from './HeroCarousel'
import SectionThree from './SectionThree'

const LandingPage = () => (
    <div>
        <HeroCarousel />
        <HowItWork />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <Footer />
    </div>
  )

export default LandingPage
