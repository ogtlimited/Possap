import type { SetStateAction } from 'react';

import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import Popover from '@mui/material/Popover';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Card, Link, TextField, Typography, Breadcrumbs } from '@mui/material';

const ValidateDocument = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event: { currentTarget: SetStateAction<null> }) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const renderForm = (
    <Box display="flex" mt={5} px={10} flexDirection="column">
      <TextField
        fullWidth
        name="possapApprovalNumber"
        label="Possap Approval Number"
        placeholder="PSS00000000000000"
        InputLabelProps={{ shrink: true }}
      />
      <Typography sx={{ mb: 3, mt: 1 }} variant="caption" color="text.secondary">
        Don&apos;t have an approval number?{' '}
        <Typography sx={{ cursor: 'pointer' }} variant="caption" color="red">
          Click here
        </Typography>
      </Typography>
      <LoadingButton fullWidth size="large" type="submit" color="primary" variant="contained">
        Proceed
      </LoadingButton>
    </Box>
  );
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <CheckCircleIcon sx={{ mr: 0.5, color: '#4dd555', fontSize: '14px' }} fontSize="inherit" />
      Home
    </Link>,
    <Link underline="hover" key="2" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
      <RadioButtonCheckedIcon
        sx={{ mr: 0.5, color: '#2f4cb0', fontSize: '14px' }}
        fontSize="inherit"
      />
      Validate Document
    </Link>,
    <Typography key="3" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
      <RadioButtonUncheckedIcon sx={{ mr: 0.5, fontSize: '14px' }} fontSize="inherit" />
      Document Info
    </Typography>,
  ];
  return (
    <>
      <Box
        sx={{
          margin: 0,
          padding: '10px',
          border: '1px solid #E3E3E3',
          borderLeft: 'none',
          borderRight: 'none',
          background: '#FCFDFD',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
      <Card
        sx={{
          padding: '30px',
          width: '40%',
          margin: '30px auto',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography textAlign="center" variant="h5">
          POSSAP Approval Number {/* @ts-ignore */}
          <Typography
            variant="caption"
            color="red"
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            What is this?
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{ pointerEvents: 'none' }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Box
              sx={{
                p: 1,
                width: 400,
                fontSize: '0.8rem',
                background: '#000',
                color: '#fff',
                opacity: '0.8',
              }}
            >
              The Police Specialized Service Automation Project Approval Number is a unique number
              that is systematically assigned to each approved request generated on the Police
              Specialized Services Portal.
            </Box>
          </Popover>
        </Typography>
        <Typography variant="caption" textAlign="center" color="text.secondary">
          Enter an approval number below
        </Typography>
        {renderForm}
      </Card>
    </>
  );
};

export default ValidateDocument;
