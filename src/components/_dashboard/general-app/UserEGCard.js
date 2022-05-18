// material
import { Box, Card, Typography } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';

const TOTAL_EG = 4876;

export default function UserEGCard() {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Escort & Guard Services</Typography>
        <Typography variant="h3">{fNumber(TOTAL_EG)}</Typography>
      </Box>
    </Card>
  );
}
