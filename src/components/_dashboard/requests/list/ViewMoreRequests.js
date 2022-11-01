import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table, TableHead, TableCell, TableBody, Typography, TableRow } from '@material-ui/core';

ViewMoreServiceRequests.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  formSchema: PropTypes.array
};
// const formSchema = [
//   {
//     lostItems: ['certificate', 'vehicle particulars'],
//     extractLga: 'Bwari',
//     wasReported: true,
//     dateReported: '14/09/2022',
//     extractState: 'FCT',
//     extractReason: 'Lorem Ipsum',
//     courtAffidavit:
//       'https://i1.wp.com/eforms.com/images/2021/10/Court-Affidavit-sworn-statement.png?resize=255%2C330&ssl=1',
//     affidavitNumber: '123443939',
//     extractPoliceDivision: 'Kubwa Police Division'
//   }
// ];
export default function ViewMoreServiceRequests({ open, handleClose, formSchema }) {
  const getKeys = formSchema?.map((data) => Object.keys(data))[0];
  const values = formSchema?.map((dt) => Object.values(dt));
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Requests data</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              {getKeys?.map((keys, index) => (
                <TableCell key={index}>{keys}</TableCell>
              ))}
            </TableHead>
            <TableBody>
              {values?.map((value, index) => (
                <TableRow key={index}>
                  {value.map((val, ind) => (
                    <TableCell key={ind}>{val.toString()}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
