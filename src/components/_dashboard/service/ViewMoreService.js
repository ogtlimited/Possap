import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table, TableHead, TableCell, TableBody, Typography } from '@material-ui/core';

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
              <TableCell>Mandatory</TableCell>
              <TableCell>Placeholder</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Options</TableCell>
            </TableHead>
            <TableBody>
              {formSchema?.map((form, index) => (
                <React.Fragment key={index}>
                  <TableCell>{form.id}</TableCell>
                  <TableCell>{form.label}</TableCell>
                  <TableCell>{form.mandatory}</TableCell>
                  <TableCell>{form.placeholder}</TableCell>
                  <TableCell>{form.type}</TableCell>
                  <Typography>
                    {form.options.map((option, index) => (
                      <Typography key={index}>{option?.value}</Typography>
                    ))}
                  </Typography>
                </React.Fragment>
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
