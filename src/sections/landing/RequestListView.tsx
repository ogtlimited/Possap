import type { ReactNode} from 'react';

import React, { useState } from 'react';

import { Link , Card , Table  , Paper, Popover, MenuItem, TableRow, TableCell, TableHead, TableBody, Typography, IconButton, TableContainer, TablePagination } from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';


interface Column {
  id: 'createdAt' | 'name' | 'status' | 'updatedAt' | 'fileNumber' | 'type';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
  render?: (value: string) => ReactNode;
}

const columns: Column[] = [
  {
    id: 'createdAt',
    label: 'Request Date',
    format: (value: string) => fDate(value, 'DD/MM/YYYY') || '',
  },
  { id: 'name', label: 'Applicant Name', minWidth: 170 },
  { id: 'fileNumber', label: 'File number', minWidth: 100 },
  {
    id: 'status',
    label: 'Request status',
    minWidth: 170,
    render: (value: string) => 
      <Typography
        style={{
          background: '#FFF2CC',
          color: '#FFA500',
          padding: '0.5rem',
          textAlign: 'center',
          borderRadius: "20px"
        }}
      >
        {value}
      </Typography> 
  },
  {
    id: 'updatedAt',
    label: 'Last action date',
    minWidth: 170,
    format: (value: string) => fDate(value, 'DD/MM/YYYY') || '',
  },
  {
    id: 'type',
    label: 'Service type',
    minWidth: 170,
  },
];

interface Data {
  name: string;
  fileNumber: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  type: string;
}

function createData(name: string, fileNumber: string, status: string, type: string): Data {
  const date = new Date();
  return { name, fileNumber, status, type, updatedAt: date.toISOString(), createdAt: date.toISOString() };
}

const rows = [
  createData('Abubakar Abdulwahab', '1324171354', 'pending', 'Tint Permit'),
  createData('Abubakar Abdulwahab', '1324171354', 'pending', 'Police Extract'),
];

export default function RequestListView() {
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
                      <MenuItem component={Link} href='/request-details/TGP0000002307'>
                        <Iconify icon="tabler:list-details" sx={{ mr: 2 }} />
                        View Details
                      </MenuItem>
                      <MenuItem component={Link} href='/request-invoice/TGP0000002307'>
                        <Iconify icon="iconamoon:invoice" sx={{ mr: 2 }} />
                        View Invoices
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
