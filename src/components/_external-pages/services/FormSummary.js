import { useEffect, useState } from 'react';
import { Table, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { fDate } from '../../../utils/formatTime';
import useEGServiceById from '../../../queries/getEGRequests';
import useServiceForm from '../../../hooks/useServiceForm';
import useServiceTable from '../../../hooks/useServiceTable';
import splitCamelCase from '../../../utils/splitCamelCase';
import SelectService from './select-services';
import { CharacterCertificateTable, EGTable, PoliceExtractTable } from './constants';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.neutral
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

export default function FormSummary({ urlObj }) {
  const { serviceFormvalues } = useServiceForm();
  const [value, setValue] = useState([]);
  const EGService = useEGServiceById(urlObj.requestID);

  const [data, setdata] = useState({});
  useEffect(() => {
    let workingData;
    switch (urlObj?.query) {
      case '1':
        // work Margaret
        setValue(PoliceExtractTable);
        break;
      case '2':
        // work Margaret
        setValue(CharacterCertificateTable);
        break;
      case '3':
        // work Kay
        workingData = EGTable;
        if (EGService.data) {
          workingData.forEach((item) => {
            item.value = EGService?.data.data[item.field];
          });
          setValue(workingData);
        }
        break;

      default:
        break;
    }
  }, [urlObj, EGService]);

  const formatValue = (key) => {
    if (key.value === '') {
      return 'No Value';
    }
    if (key.title.toLowerCase().includes('date')) {
      return fDate(key.value);
    }
    return key.value;
  };

  return (
    <RootStyle>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Calories</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map((key) => (
              <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {key.title}
                </TableCell>
                {/* <TableCell>{key.value === '' ? 'No Value' : key.value}</TableCell> */}
                <TableCell>{formatValue(key)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </RootStyle>
  );
}
