import { Box, Card, Typography } from '@mui/material';

const ValidateDocument = () => (
  <Box
    gap={1.5}
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    sx={{ mb: 5 }}
  >
    <Card>
      <Typography variant="h5">Sign in</Typography>
      <Typography variant="body2" color="text.secondary">
        Don’t have an account?
      </Typography>
    </Card>
  </Box>
);

export default ValidateDocument;
