/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { styled } from '@material-ui/core/styles';
import {
  Stack,
  Paper,
  Radio,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';
//
import { MHidden } from '../../@material-extend';
import PaymentNewCardForm from '../payment/PaymentNewCardForm';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  {
    value: 'character-certificate',
    title: 'character certificate',
    icons: ['/static/icons/certificate.svg']
  },
  {
    value: 'police-extract',
    title: 'Police Extract',
    icons: ['/static/icons/extract.svg']
  },
  {
    value: 'escort-and-guard-services',
    title: 'Escort and Guard Services',
    icons: ['/static/icons/guard.svg']
  }
];
const GUARD_OPTIONS = [
  {
    value: 'Private',
    label: 'Private'
  },
  {
    value: 'Politically Exposed Persons (PEP)',
    label: 'Politically Exposed Persons (PEP)'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: 0,
    paddingTop: theme.spacing(5)
  }
}));

const OptionStyle = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1),
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

// ----------------------------------------------------------------------

SelectService.propTypes = {
  formik: PropTypes.object
};

export default function SelectService({ formik }) {
  const [show, setShow] = useState(false);
  const { values, getFieldProps } = formik;
  const handleCollapseIn = () => {
    setShow((prev) => !prev);
  };

  const handleCollapseOut = () => {
    setShow(false);
  };

  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Select Service
      </Typography>
      <RadioGroup {...getFieldProps('serviceType')}>
        <Stack spacing={3}>
          {SERVICE_OPTIONS.map((method) => {
            const { value, title, icons } = method;
            const hasChildren = value === 'escort-and-guard-services';

            return (
              <OptionStyle
                key={title}
                sx={{
                  ...(values.method === value && {
                    boxShadow: (theme) => theme.customShadows.z8
                  }),
                  ...(hasChildren && { flexWrap: 'wrap' })
                }}
              >
                <FormControlLabel
                  value={value}
                  control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                  label={
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {title}
                    </Typography>
                  }
                  sx={{ py: 3, mx: 0 }}
                />

                <MHidden width="smDown">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {icons.map((icon) => (
                      <img key={icon} alt="logo card" src={icon} />
                    ))}
                  </Stack>
                </MHidden>

                {hasChildren && (
                  <Collapse in={values.serviceType === 'escort-and-guard-services'} sx={{ width: 1 }}>
                    <TextField
                      select
                      fullWidth
                      sx={{ mb: 3 }}
                      label="Category"
                      {...getFieldProps('serviceCategory')}
                      SelectProps={{ native: true }}
                    >
                      {GUARD_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    {values.serviceCategory === 'Politically Exposed Persons (PEP)' && (
                      <TextField
                        select
                        fullWidth
                        sx={{ mb: 3 }}
                        label="Sub-Cateogry"
                        {...getFieldProps('card')}
                        SelectProps={{ native: true }}
                      >
                        {GUARD_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    )}

                  </Collapse>
                )}
              </OptionStyle>
            );
          })}
        </Stack>
      </RadioGroup>
    </RootStyle>
  );
}
