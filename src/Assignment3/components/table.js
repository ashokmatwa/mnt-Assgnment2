import React, { useState } from 'react'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTable = styled(Table)(({ theme }) => ({
  border: '10px solid grey', // Add border styling
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "brown", 
    color: theme.palette.common.white, // text color
    border: '2px solid rgba(255, 255, 255, 0.12)', // Add border styling
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: '2px solid rgba(0, 0, 0, 0.12)', // Add border styling
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: "lightblue"
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

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
      <TableContainer component={Paper} sx={{ minWidth: 700, margin: '20px auto'}}>
        <StyledTable  >
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>NAME</StyledTableCell>
              <StyledTableCell>EMAIL</StyledTableCell>
              <StyledTableCell>ADDRESS</StyledTableCell>
              <StyledTableCell>PHONE</StyledTableCell>
              <StyledTableCell>COMPANY</StyledTableCell>
              <StyledTableCell>ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody> 
            {slicedData.map((user) => (
              <StyledTableRow  key={user.id}>
                <StyledTableCell>{user.id}</StyledTableCell>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>Street : {user.address.street}, City : {user.address.city}</StyledTableCell>
                <StyledTableCell>{user.phone}</StyledTableCell>
                <StyledTableCell>{user.company.name}</StyledTableCell>
                <StyledTableCell>
                  <IconButton color="primary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  {/* <EditIcon />
                  <DeleteIcon /> */}
                </StyledTableCell>
              </StyledTableRow >
            ))}
          </TableBody>
        </StyledTable>
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