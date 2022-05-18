// material
import { Box, Card, Typography } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TOTAL_EXT = 18765;

export default function UserPoliceExtractCard() {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Police Extract</Typography>
        <Typography variant="h3">{fNumber(TOTAL_EXT)}</Typography>
      </Box>
    </Card>
  );
}
