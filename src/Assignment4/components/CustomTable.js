import React, { useState, useEffect } from 'react'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, TextField, Grid, Button} from '@mui/material';
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
  }));

const CustomTable = (props) => {

    const {content, children, userData, rowsPerPage, currentPage, handleChangePage, handleChangeRowsPerPage} = props;


    const check = () => {
        console.log(userData);
        console.log(content);
    }

  return (
    <>
    {/* <Button onClick={check}>CHECK</Button> */}
      <TableContainer component={Paper} sx={{ minWidth: 700, margin: '20px auto'}}>
        <StyledTable  >
          <TableHead>
            <TableRow>
            {content.map((item) => (
              <StyledTableCell key={item}>{item}</StyledTableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {children}
          </TableBody> 
        </StyledTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 25, 50, 100]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default CustomTable
