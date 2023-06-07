import React, { useState } from 'react'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination } from '@mui/material';


const MyTable = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  let startingIndex = currentPage * rowsPerPage;
  let endingIndex = startingIndex + rowsPerPage;
  const slicedData = props.data.slice(startingIndex, endingIndex);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>PHONE</TableCell>
              <TableCell>COMPANY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>Street : {user.address.street}, City : {user.address.city}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 25, 50, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default MyTable