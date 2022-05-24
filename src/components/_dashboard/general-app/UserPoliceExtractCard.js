// material
import { Box, Card, Typography } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UserPoliceExtractCard({ TOTAL_EXT }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Police Extract</Typography>
        <Typography variant="h3">{fNumber(TOTAL_EXT)}</Typography>
      </Box>
    </Card>
  );
}
