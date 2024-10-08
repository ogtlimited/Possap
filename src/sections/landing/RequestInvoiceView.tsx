import type { ReactNode} from 'react';

import React, { useState } from 'react';

import { Link , Card , Table  , Paper, Popover, MenuItem, TableRow, TableCell, TableHead, TableBody, Typography, IconButton, TableContainer, TablePagination } from '@mui/material';

import { Iconify } from 'src/components/iconify';


interface Column {
  id: 'invoiceNumber' | 'service' | 'status' | 'amount' | 'amountDue';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
  render?: (value: string) => ReactNode;
}

const columns: Column[] = [
  {
    id: 'invoiceNumber',
    label: 'Invoice Number',
    render: (value: string) => <Link href=''>{value}</Link>,
  },
  { id: 'service', label: 'Service', minWidth: 170 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    render: (value: string) => 
      <Typography
        style={{
          background: '#F9D7D4',
          color: '#E85854',
          padding: '0.5rem',
          textAlign: 'center',
          borderRadius: "20px",
          marginRight: "10px"
        }}
      >
        {value}
      </Typography> 
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    format: (value: string) => `₦${value}`,
  },
  {
    id: 'amountDue',
    label: 'Amount Due',
    minWidth: 50,
    format: (value: string) => `₦${value}`,
  },
];

interface Data {
  invoiceNumber: string;
  service: string;
  status: string;
  amount: string;
  amountDue: string;
}

function createData(invoiceNumber: string, service: string, status: string, amount: string, amountDue: string): Data {
  return { invoiceNumber, service, status, amount, amountDue };
}

const rows = [
  createData('1000297426', 'Tint Permit', 'Unpaid', '500.00', '500.00'),
];

export default function RequestInvoiceView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper style={{ padding: '2rem', background: '#F3F6F8', borderRadius: '0'}}>
      <Card style={{ height: '80vh' }}>
        <Typography variant='h4' padding="1rem">Service Requests</Typography>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} style={{ position: 'relative' }}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.render ? column.render(value) : column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="right">
                      <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                    </TableCell>
                    <Popover
                      open={!!open}
                      anchorEl={open}
                      onClose={handleCloseMenu}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <MenuItem component={Link} href=''>
                        <Iconify icon="fluent:payment-48-regular" sx={{ mr: 2 }} />
                        Pay
                      </MenuItem>
                    </Popover>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Paper>
  )
}
