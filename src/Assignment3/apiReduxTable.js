import React, { useState, useEffect } from 'react'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, TextField, Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CustomTextField from './components/CustomTextField';
import Pagination from '@mui/material/Pagination';
import CustomDialogBox from './components/CustomDialogBox';
import CustomButton from './components/CustomButton';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CustomTable from './components/CustomTable';
import {useDispatch, useSelector } from 'react-redux';
import {updateApiData, deleteApiData, deleteApi, updateApi} from '../Redux/reducers/apiSlice';


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

const ApiReduxTable = (props) => {

  const dispatch = useDispatch(); // to dispacth the data to the STORE
    const newApiData = useSelector((state) => state.api.apiData);
    console.log(newApiData)


  //for  pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  //modal popup
  const [openEdit, setOpenEdit] = useState(false); //for edit popup
  const [openDelete, setOpenDelete] = useState(false); //for delete popup
  const [selectedUser, setSelectedUser] = useState(""); //for selected user

  // Declare local state variable for modified values
  // const [modifiedUser, setModifiedUser] = useState([]);
  const [modifiedUser, setModifiedUser] = useState({
    name: "",
    email: "",
    addressS: "",
    addressC: "",
    phone: "",
    company: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedUser({...modifiedUser, [name]: value});
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);

    // setModifiedUser(user);
    setModifiedUser({
      name: user.name,
      email: user.email,
      addressS: user.address.street,
      addressC: user.address.city,
      phone: user.phone,
      company: user.company.name,
    });

    setOpenEdit(true);
  } 
  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  }

  //for Snackbar
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const handleClose = () => {
    setOpenEdit(false); 
    setOpenDelete(false);
  }
  const close = () => {
    setOpenEdit(false); 
    setOpenDelete(false);
    setFailure(true);
  }

  //modifying data
  const handleSaveUser = () => {
    // selectedUser state variable
    setFailure(false);
    console.log(selectedUser);

    const updatedUser = {
      ...selectedUser,
      name: modifiedUser.name,
      email: modifiedUser.email,
      address: {
        street: modifiedUser.addressS,
        city: modifiedUser.addressC,
      },
      phone: modifiedUser.phone,
      company: {
        name: modifiedUser.company,
      },
    };

    const updatedData = newApiData.map((user) => {
      if (user.id === selectedUser.id) {
        return updatedUser;
      }
      return user;
    });
  
    // setUserData(updatedData);
    dispatch(updateApiData(updatedUser));
    // dispatch(updateApi(updatedUser)); //for edit from the api

    console.log("EDIT SAVED");
    console.log(modifiedUser);
    setSuccess(true);
    handleClose();
  };

  const handleDeleteUser = () => {
    setFailure(false);
    console.log(selectedUser);
    if (selectedUser) {
      const updatedData = newApiData.filter((user) => user.id !== selectedUser.id);
      // setUserData(updatedData);
      dispatch(deleteApiData(selectedUser.id));
      // dispatch(deleteApi(selectedUser.id)); //for delete from the api
    }
    console.log("DELETED");
    setSuccess(true);
    handleClose();
  };



  let startingIndex = currentPage * rowsPerPage;
  let endingIndex = startingIndex + rowsPerPage;
  // const slicedData = props.data.slice(startingIndex, endingIndex);
  const slicedData = newApiData.slice(startingIndex, endingIndex);

  const content = ["ID","NAME","EMAIL","ADDRESS","PHONE","COMPANY","ACTION"];

  return (
    <>
      <h1>API REDUX TABLE</h1>
      
      <CustomTable 
      content={content}
      userData={newApiData}
      rowsPerPage={rowsPerPage}
      currentPage={currentPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      >
        {slicedData.map((user) => (
        <StyledTableRow  key={user.id}>
          <StyledTableCell>{user.id}</StyledTableCell>
          <StyledTableCell>{user.name}</StyledTableCell>
          <StyledTableCell>{user.email}</StyledTableCell>
          <StyledTableCell>Street : {user.address.street}, City : {user.address.city}</StyledTableCell>
          <StyledTableCell>{user.phone}</StyledTableCell>
          <StyledTableCell>{user.company.name}</StyledTableCell>
          <StyledTableCell>
            <IconButton color="primary" aria-label="edit" onClick={() => handleOpenEdit(user)}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="delete" onClick={() => handleOpenDelete(user)}>
              <DeleteIcon />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow >
      ))}

      </CustomTable>
      
      <CustomDialogBox open={openEdit} onClose={handleClose} title="Edit User" 
        content={<><CustomTextField type="text" id="name" label="Name" name="name" value={modifiedUser.name} onChange={handleChange}/>
                  <CustomTextField type="text" id="email" label="Email" name="email" value={modifiedUser.email} onChange={handleChange} />
                  <br/>
                  <CustomTextField type="text" id="addressS" label="Address Street" name="addressS" value={modifiedUser.addressS} onChange={handleChange} />
                  <CustomTextField type="text" id="addressC" label="Address City" name="addressC" value={modifiedUser.addressC} onChange={handleChange} />
                  <br/>
                  <CustomTextField type="text" id="phone" label="Phone" name="phone" value={modifiedUser.phone} onChange={handleChange} />
                  <CustomTextField type="text" id="company" label="Company" name="company" value={modifiedUser.company} onChange={handleChange} />
          </>}
        actions={<><CustomButton type="submit" color="primary" onClick={close}>Cancel</CustomButton>
                   <CustomButton type="submit" color="error" onClick={handleSaveUser}>Save</CustomButton></>}>
        </CustomDialogBox>
      
      <CustomDialogBox open={openDelete} onClose={handleClose} title="Delete User"
        content={<p>Are you sure you want to delete this user with id: {selectedUser.id}?</p>}
        actions={<><CustomButton type="submit" color="primary" onClick={close}>Cancel</CustomButton>
                   <CustomButton type="submit" color="error" onClick={handleDeleteUser}>Delete</CustomButton></>}>
      </CustomDialogBox>

      {/* <CustomDialogBox open={success} onClose={() => setSuccess(false)} title="DONE" 
        content={<IconButton color="success" aria-label="edit" ><CheckIcon /></IconButton>}>
      </CustomDialogBox> */}

      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>

      <Snackbar open={failure} autoHideDuration={6000} onClose={() => setFailure(false)}>
        <Alert onClose={() => setFailure(false)} severity="error" sx={{ width: '100%' }}>
          This is a failure message!
        </Alert>
      </Snackbar>
    </>
  )
}

export default ApiReduxTable
