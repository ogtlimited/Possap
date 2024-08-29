import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

import Home from '@mui/icons-material/HorizontalRule';
import { Box, Grid, Button, styled, Typography } from '@mui/material';

// Define the type for the props
interface ItemProps {
  title: string;
  subtitle: string;
  showLabel: boolean;
  img: string;
}

const items: ItemProps[] = [
  {
    title: 'Welcome to the Police Specialized Services Automation Project (POSSAP) Portal',
    subtitle:
      'You can pay for services such as Special protection services, Guards service, Police extracts etc.',
    showLabel: false,
    img: '/assets/hero/hero1.png',
  },
  {
    title: 'SPECIAL PROTECTION SERVICE',
    subtitle:
      'This service is primarily detailed for the protection of PEPs (Politically Exposed Person’s) as well as private citizens. The service is rendered by personnel of the Force’s Specialized Units, PMF, SPU and CTU.',
    showLabel: true,
    img: '/assets/hero/hero2.png',
  },
  {
    title: 'GUARDS SERVICE',
    subtitle:
      'This service offers the services of Police officers to a wider range of the population as a whole. Guards Services allows the public and corporations such as Banks to request for Police protection of residential property, commercial property, events, and escort.',
    showLabel: true,
    img: '/assets/hero/hero3.png',
  },
  {
    title: 'POLICE EXTRACT',
    subtitle:
      'A Police Extract is a document usually done for reports of lost or missing items or documents. This service allows the public as well as corporate bodies to request for a Police Extract Document.',
    showLabel: true,
    img: '/assets/hero/hero4.png',
  },
  {
    title: 'POLICE CHARACTER CERTIFICATE',
    subtitle:
      'A Police Character Clearance is done to check whether an applicant has a criminal record. This service allows for the public to request for this document.',
    showLabel: true,
    img: '/assets/hero/hero5.png',
  },
  {
    title: 'POLICE INVESTIGATION REPORT',
    subtitle:
      'An investigation report is a document issued at the end of an investigation into a criminal case. This service allows for the public to request for this document.',
    showLabel: true,
    img: '/assets/hero/hero6.png',
  },
];
interface WrapperProps {
  img: string;
}

const Wrapper = styled(Box)<WrapperProps>(({ theme, img }) => ({
  width: '100%',
  minHeight: '590px',
  backgroundImage: `url(${img})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  backgroundPosition: '100% 50%',
  [theme.breakpoints.down('md')]: {
    backgroundSize: 'cover',
  },
}));
const CanRequestText = styled(Typography)(({ theme }) => ({
  textDecoration: 'underline',
  color: '#FFF183',
}));
const RequestBtn = styled(Button)(({ theme }) => ({
  paddingTop: '12px',
  background: '#fff',
  color: '#2F4CB0',
  height: '53px',
  ':hover': {
    background: '#fff',
    color: '#2F4CB0',
  },
}));
const MakePaymentBtn = styled(Button)(({ theme }) => ({
  paddingTop: '12px',
  height: '53px',
  color: '#fff',
  borderColor: '#fff',
  ':hover': {
    color: '#fff',
    borderColor: '#2F4CB0',
  },
}));
const CarouselWrapper = styled(Carousel)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: '0',
  },
}));
const Item: React.FC<ItemProps> = ({ title, subtitle, img, showLabel }: ItemProps) => (
  <Wrapper img={img}>
    <Box sx={{ pt: '105px', pl: '70px', pb: '50px', maxWidth: '900px' }}>
      <CanRequestText sx={{ display: showLabel ? 'block' : 'none' }}>
        YOU CAN REQUEST
      </CanRequestText>
      <Typography color="white" variant="h2">
        {title}
      </Typography>

      <Typography sx={{ fontSize: '20px', mt: '25px' }} color="white">
        {subtitle}
      </Typography>

      <Grid container mt="40px">
        <Grid item>
          <RequestBtn>Request Service</RequestBtn>{' '}
          <MakePaymentBtn variant="outlined">Make Payment</MakePaymentBtn>{' '}
        </Grid>
        <Grid item> </Grid>
      </Grid>
    </Box>
  </Wrapper>
);

const HeroCarousel = () => {
  const [currentStep, setcurrentStep] = useState(0);

  const handleStep = (now: number | undefined) => {
    console.log(now);
    if(now){
      setcurrentStep(now)

    }
  }
  return (
    <CarouselWrapper
      onChange={handleStep}
      IndicatorIcon={<Home sx={{fontSize: '24px'}} />}
      indicatorIconButtonProps={{
        style: {
          marginRight: '2rem',    // 1
        }
    }}
      indicatorContainerProps={{
        style: {
          position: 'absolute',
          left: '4%',
          bottom: currentStep === 0 ? '10%' : '25%',
          textAlign: 'left',
          zIndex: 100
        },
      }}
    >
      {items.map((item, i) => (
        <Item
          key={i}
          showLabel={item.showLabel}
          title={item.title}
          img={item.img}
          subtitle={item.subtitle}
        />
      ))}
    </CarouselWrapper>
  );
  
}
  
export default HeroCarousel;
