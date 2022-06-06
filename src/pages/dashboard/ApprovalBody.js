import React from 'react';
import { Card, Grid, Stack, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

export default function ApprovalBody({ data }) {
  console.log({ data });
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ pb: 3 }}>APPROVING ADMIN INFORMATION</Box>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Time of approval</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell> AIGCTU01</TableCell>
                  <TableCell align="right"> Pending Approval</TableCell>
                  <TableCell align="right"> May 23 2022 11:19AM</TableCell>
                </TableBody>
              </Table>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Comment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>
                    TEST AIGCTU (AIG): 1 man squad. The request for officers has been assigned to COUNTER-TERRORISM UNIT
                    - CTU BASE 1 to provide 1 officers.
                  </TableCell>
                </TableBody>
              </Table>
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ pb: 3 }}>APPROVING ADMIN INFORMATION</Box>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Time of approval</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell> AIGCTU01</TableCell>
                  <TableCell align="right"> Pending Approval</TableCell>
                  <TableCell align="right"> May 23 2022 11:19AM</TableCell>
                </TableBody>
              </Table>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Comment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>
                    TEST AIGCTU (AIG): 1 man squad. The request for officers has been assigned to COUNTER-TERRORISM UNIT
                    - CTU BASE 1 to provide 1 officers.
                  </TableCell>
                </TableBody>
              </Table>
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ pb: 3 }}>APPROVING ADMIN INFORMATION</Box>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Time of approval</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell> AIGCTU01</TableCell>
                  <TableCell align="right"> Pending Approval</TableCell>
                  <TableCell align="right"> May 23 2022 11:19AM</TableCell>
                </TableBody>
              </Table>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Comment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>
                    TEST AIGCTU (AIG): 1 man squad. The request for officers has been assigned to COUNTER-TERRORISM UNIT
                    - CTU BASE 1 to provide 1 officers.
                  </TableCell>
                </TableBody>
              </Table>
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ pb: 3 }}>APPROVING ADMIN INFORMATION</Box>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Time of approval</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell> AIGCTU01</TableCell>
                  <TableCell align="right"> Pending Approval</TableCell>
                  <TableCell align="right"> May 23 2022 11:19AM</TableCell>
                </TableBody>
              </Table>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Comment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>
                    TEST AIGCTU (AIG): 1 man squad. The request for officers has been assigned to COUNTER-TERRORISM UNIT
                    - CTU BASE 1 to provide 1 officers.
                  </TableCell>
                </TableBody>
              </Table>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
