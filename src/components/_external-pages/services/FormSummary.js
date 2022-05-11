import { useEffect } from 'react';
import { Table, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import useServiceForm from '../../../hooks/useServiceForm';
import splitCamelCase from '../../../utils/splitCamelCase';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
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

export default function FormSummary() {
  const { serviceFormvalues } = useServiceForm();
  useEffect(() => {
    console.log(serviceFormvalues);
  }, [serviceFormvalues]);

  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Summary
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Calories</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(serviceFormvalues).map((key) => (
              <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {splitCamelCase(key)}
                </TableCell>
                <TableCell>{serviceFormvalues[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </RootStyle>
  );
}
