import React, { useState, useEffect } from 'react'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, TextField, Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../Assignment4/style.css'
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
import CustomForm from './CustomForm';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser, deleteTable } from '../Redux/reducers/formSlice';

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


const UserTable = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch(); // to dispacth the data to the STORE
    const userData = useSelector((state) => state.form.formData);
    // const userData = useSelector((state) => state);
    console.log(userData);
 
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

   const [openEditForm, setOpenEditForm] = useState(false); //for edit popup
 
   // Declare local state variable for modified values
   // const [modifiedUser, setModifiedUser] = useState([]);
   const [modifiedUser, setModifiedUser] = useState({
     firstName:"",
     lastName:"",
     mobile:"",
     email:"",
     gender:""
   });

   const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    gender: ''
  });
   
   const handleChange = (e) => {
    //  const { name, value } = e.target;
    //  setModifiedUser({...modifiedUser, [name]: value});
    const name = e.target.name;
        const newValue = e.target.value;
        let errorVariable=""; 
        
        if(name==="firstName" || name==="lastName"){
            let regex = /^[a-zA-Z]+$/;
            if(!regex.test(newValue)){
                errorVariable = "Only Characters Allowed";
            }
        }
        if(name === "mobile"){
            let regex = /^[0-9]+$/;
            if(!regex.test(newValue) || newValue.length !== 10){
                errorVariable="Only Numbers Allowed";
            }
        }
        if(name === "email"){
            let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
            if(!regex.test(newValue)){
                errorVariable="format abc@gmail.com";
            }
        }

        setModifiedUser( {
          ...modifiedUser,
          [name]: newValue,
        });

        setErrors({
          ...errors,
          [name]: errorVariable
        });
   };
 
   const handleOpenEdit = (user) => {
     setSelectedUser(user);
 
     // setModifiedUser(user);
     setModifiedUser({
        firstName:user.firstName,
        lastName:user.lastName,
        mobile:user.mobile,
        email:user.email,
        gender:user.gender
     });
 
     setOpenEdit(true);
    //  navigate('/editUser')
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
 
   let check = false;
   //modifying data
   const handleSaveUser = () => {
     // selectedUser state variable
     setFailure(false);
     console.log(selectedUser);

     const { firstName, lastName, mobile, email, gender} = selectedUser;
        // console.log(formData);console.log(errors);

        if(firstName === "" || errors.firstName !== ''){
            setErrors({...errors, firstName : "Required" })
            return;
        }
        if(lastName === "" || errors.lastName !== ''){
            setErrors({...errors, lastName : "Required"})
            return;
        }
        if(mobile === "" || errors.mobile !== ''){
            setErrors({...errors, mobile : "Required"})
            return;
        }
        if(email === "" || errors.email !== ''){
            setErrors({...errors, email : "Required"})
            return;
        }
        if(gender === "" || errors.gender !== ''){
            setErrors({...errors, gender : "Required"})
            return;
        }

        if(!errors.firstName && !errors.lastName && !errors.mobile && !errors.email && !errors.gender){
            check=true;
        }
 
        if(check){
          const updatedUser = {
            ...selectedUser,
            firstName: modifiedUser.firstName,
            lastName: modifiedUser.lastName,
            email: modifiedUser.email,
            mobile: modifiedUser.mobile,
            gender: modifiedUser.gender
          };
      
          const updatedData = userData.map((user) => {
            if (user.id === selectedUser.id) {
              return updatedUser;
            }
            return user;
          });
        
         //  setUserData(updatedData);
         // dispatch(updateUser(user));
         dispatch(updateUser(updatedUser));
      
          console.log("EDIT SAVED and DISPATCHED");
          console.log(modifiedUser);
          setSuccess(true);
          handleClose();
        }
     
   };
 
   const handleDeleteUser = () => {
     setFailure(false);
    //  console.log(selectedUser);
     if (selectedUser) {
    //    const updatedData = userData.filter((user) => user.id !== selectedUser.id);
        // dispatch(deleteUser(updatedData));
        dispatch(deleteUser(selectedUser.id));
        // dispatch(deleteUser(selectedUser.email));
     }
     
     console.log("DELETED");
     setSuccess(true);
     handleClose();
   };
 
 
 
   let startingIndex = currentPage * rowsPerPage;
   let endingIndex = startingIndex + rowsPerPage;
   const slicedData = userData.slice(startingIndex, endingIndex)
    // const slicedData =[];
   const content = ["ID","NAME","PHONE","EMAIL","GENDER","ACTION"];  

   const handleClick = () => {
    setOpenEditForm(true);
    navigate('/editUser')
   }

   const emptyTable = () => {
    dispatch(deleteTable());
   }
  return (
    <>
      <CustomTable 
      content={content}
      userData={userData}
      rowsPerPage={rowsPerPage}
      currentPage={currentPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      >
        {slicedData.map((user) => (
            <StyledTableRow  key={user.id}>
            <StyledTableCell>{user.id}</StyledTableCell>
            <StyledTableCell>{user.firstName} {user.lastName} </StyledTableCell>
            <StyledTableCell>{user.mobile}</StyledTableCell>
            <StyledTableCell>{user.email}</StyledTableCell>
            <StyledTableCell>{user.gender}</StyledTableCell>
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

      {/* <CustomDialogBox open={openEdit} onClose={handleClose} title="Edit User"></CustomDialogBox> */}
      {/* {openEdit && <Link to={'/editUser'}></Link><CustomForm onClose={() => setOpenEdit(false)} />} */}
      {/* <a href="/editUser">
        <CustomButton type="submit" color="primary">Add User</CustomButton>
      </a> */}
      <CustomButton type="submit" color="primary" onClick={handleClick}>Add User</CustomButton>
      <br></br>
      <CustomButton type="submit" color="primary" onClick={emptyTable}>Delete Table</CustomButton>
    
      
      
      <CustomDialogBox open={openEdit} onClose={handleClose} title="Edit User" 
        content={<><CustomTextField type="text" id="firstName" label="First Name" name="firstName" value={modifiedUser.firstName} onChange={handleChange}
        helperText={errors.firstName} error={Boolean(errors.firstName)}/>
                  <CustomTextField type="text" id="lastName" label="Last Name" name="lastName" value={modifiedUser.lastName} onChange={handleChange}
        helperText={errors.lastName} error={Boolean(errors.lastName)}          />
                  <CustomTextField type="text" id="mobile" label="Phone" name="mobile" value={modifiedUser.mobile} onChange={handleChange} 
        helperText={errors.mobile} error={Boolean(errors.mobile)}          />
                  <CustomTextField type="text" id="email" label="Email" name="email" value={modifiedUser.email} onChange={handleChange} 
        helperText={errors.email} error={Boolean(errors.email)}          />
                  <CustomTextField type="text" id="gender" label="Gender" name="gender" value={modifiedUser.gender} onChange={handleChange} 
        helperText={errors.gender} error={Boolean(errors.gender)}          />
                  <br/>
          </>}
        actions={<><CustomButton type="submit" color="primary" onClick={close}>Cancel</CustomButton>
                   <CustomButton type="submit" color="error" onClick={handleSaveUser}>Save</CustomButton></>}>
        </CustomDialogBox>
      
      <CustomDialogBox open={openDelete} onClose={handleClose} title="Delete User"
        content={<p>Are you sure you want to delete this user with id: {selectedUser.id}?</p>}
        actions={<><CustomButton type="submit" color="primary" onClick={close}>Cancel</CustomButton>
                   <CustomButton type="submit" color="error" onClick={handleDeleteUser}>Delete</CustomButton></>}>
      </CustomDialogBox>

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

export default UserTable
