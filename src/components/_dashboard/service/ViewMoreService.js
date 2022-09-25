import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table, TableHead, TableCell, TableBody, Typography, TableRow } from '@material-ui/core';

ViewMoreService.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  formSchema: PropTypes.array
};

export default function ViewMoreService({ open, handleClose, formSchema }) {
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
        <DialogTitle id="alert-dialog-title">Service Form Schema</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableCell>ID</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>Validators</TableCell>
              <TableCell>Config</TableCell>
              <TableCell>Placeholder</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Api</TableCell>
            </TableHead>
            <TableBody>
              {formSchema?.map((form, index) => (
                <TableRow key={index}>
                  <TableCell>{form.id}</TableCell>
                  <TableCell>{form.label}</TableCell>
                  <TableCell>{form.validators?.required}</TableCell>
                  <TableCell>{form.config?.multiple}</TableCell>
                  <TableCell>{form.placeholder}</TableCell>
                  <TableCell>{form.type}</TableCell>
                  <TableCell>
                    {form?.options?.map((option, index) => (
                      <Typography key={index}>{option?.value}</Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Typography>{form?.api?.path}</Typography>
                    <Typography>{form?.api?.body?.key}</Typography> - <Typography>{form?.api?.body?.value}</Typography>
                  </TableCell>
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
