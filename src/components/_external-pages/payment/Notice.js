// material
import { styled } from '@material-ui/core/styles';
import { Typography, Stack, List, ListItem, ListItemIcon } from '@material-ui/core';
import { Adjust } from '@material-ui/icons';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.neutral
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

export default function Notice() {
  return (
    <RootStyle>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Please Note
      </Typography>

      <Stack spacing={2.5}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Adjust />
            </ListItemIcon>
            <p>
              The Nigeria Police Force reserves the right to approve or deny your request based on its guidelines or
              availability of resources.
            </p>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Adjust />
            </ListItemIcon>
            <p>
              If approved, you will be required to pay a fee for this service (non-refundable application and
              processing).
            </p>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Adjust />
            </ListItemIcon>
            <p>Approved request requires at least 24 hours for processing and issuance.</p>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Adjust />
            </ListItemIcon>
            <p>
              Enquiries can be made through the following <a href="mailto:info@possap.gov.ng">info@possap.gov.ng</a> or
              call: <a href="tel:018884040">018884040</a>.
            </p>
          </ListItem>
        </List>
      </Stack>
    </RootStyle>
  );
}
