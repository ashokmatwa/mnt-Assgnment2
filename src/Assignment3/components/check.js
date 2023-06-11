// import React, { useState, useEffect } from 'react';
// import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, TextField} from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { tableCellClasses } from '@mui/material/TableCell';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import CustomTextField from './CustomTextField';

// const StyledTable = styled(Table)(({ theme }) => ({
//   border: '10px solid grey', // Add border styling
// }));

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: 'brown',
//     color: theme.palette.common.white, // text color
//     border: '2px solid rgba(255, 255, 255, 0.12)', // Add border styling
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     border: '2px solid rgba(0, 0, 0, 0.12)', // Add border styling
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     // backgroundColor: theme.palette.action.hover,
//     backgroundColor: 'lightblue',
//   },
// }));

// const NewMyTable = (props) => {
//   const [userData, setUserData] = useState(props.data);
//   useEffect(() => {
//     setUserData(props.data);
//   }, [props.data]);

//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selectedUser, setSelectedUser] = useState([]);


//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setSelectedUser((prevState) => ({
//   //     ...prevState,
//   //     [name]: value,
//   //   }));
//   // };

//   const handleOpenEdit = (user) => {
//     setSelectedUser(user);
//     console.log(selectedUser);
//     setOpenEdit(true);
//   };

//   const handleOpenDelete = (user) => {
//     setSelectedUser(user);
//     setOpenDelete(true);
//   };

//   const handleClose = () => {
//     setOpenEdit(false);
//     setOpenDelete(false);
//   };

//   const handleEditUser = () => {
//     const updatedData = userData.map((user) => {
//       if (user.id === selectedUser.id) {
//         return {
//           ...user,
//           name: selectedUser.name,
//           email: selectedUser.email,
//           address: {
//             ...user.address,
//             street: selectedUser.addressS,
//             city: selectedUser.addressC,
//           },
//           phone: selectedUser.phone,
//           company: {
//             ...user.company,
//             name: selectedUser.company,
//           },
//         };
//       }
//       return user;
//     });
  
//     setUserData(updatedData);
//     handleClose();
//   };

//   const handleDeleteUser = () => {
//     if (selectedUser) {
//       const updatedData = userData.filter((user) => user.id !== selectedUser.id);
//       setUserData(updatedData);
//     }
//     handleClose();
//   };

//   let startingIndex = currentPage * rowsPerPage;
//   let endingIndex = startingIndex + rowsPerPage;
//   const slicedData = userData.slice(startingIndex, endingIndex);

//   return (
//     <div>
//       <h2>New Table</h2>
//       <TableContainer component={Paper} sx={{ minWidth: 700, margin: '20px auto' }}>
//         <StyledTable>
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>ID</StyledTableCell>
//               <StyledTableCell>NAME</StyledTableCell>
//               <StyledTableCell>EMAIL</StyledTableCell>
//               <StyledTableCell>ADDRESS</StyledTableCell>
//               <StyledTableCell>PHONE</StyledTableCell>
//               <StyledTableCell>COMPANY</StyledTableCell>
//               <StyledTableCell>ACTION</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {slicedData.map((user) => (
//               <StyledTableRow key={user.id}>
//                 <StyledTableCell>{user.id}</StyledTableCell>
//                 <StyledTableCell>{user.name}</StyledTableCell>
//                 <StyledTableCell>{user.email}</StyledTableCell>
//                 <StyledTableCell>
//                   Street: {user.address.street}, City: {user.address.city}
//                 </StyledTableCell>
//                 <StyledTableCell>{user.phone}</StyledTableCell>
//                 <StyledTableCell>{user.company.name}</StyledTableCell>
//                 <StyledTableCell>
//                   <IconButton color="primary" aria-label="edit" onClick={() => handleOpenEdit(user)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="secondary" aria-label="delete" onClick={() => handleOpenDelete(user)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </StyledTable>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[3, 5, 10, 25, 50, 100]}
//         component="div"
//         count={userData.length}
//         rowsPerPage={rowsPerPage}
//         page={currentPage}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       <Modal open={openEdit} onClose={handleClose}>
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Edit the user
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             <CustomTextField type="text" id="name" label="Name" name="name" value={selectedUser?.name ?? ""} onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       name: e.target.value,
//                     })
//                   } />
//             <CustomTextField type="text" id="email" label="Email" name="email" value={selectedUser?.email ?? ""} onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       email: e.target.value,
//                     })
//                   } />
//             <CustomTextField type="text" id="addressS" label="Address Street" name="addressS" value={selectedUser?.addressS?.street ?? ""} onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       // address:{ ...address, street : e.target.value}
//                     })
//                   } />
//             <CustomTextField type="text" id="addressC" label="Address City" name="addressC" value={selectedUser?.addressS?.city ?? ""} onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       // address:{ ...address, city : e.target.value}
//                     })
//                   } />
//             <CustomTextField type="text" id="phone" label="Phone" name="phone" value={selectedUser?.phone ?? ""} onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       phone: e.target.value,
//                     })
//                   } />
//             <CustomTextField type="text" id="company" label="Company" name="company" value={selectedUser?.company?.name ?? ""} onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       // company:{ ...company, name : e.target.value}
//                     })
//                   } />
//           </Typography>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleEditUser}>Save</Button>
//         </Box>
//       </Modal>

//       <Modal open={openDelete} onClose={handleClose}>
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Delete User
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Are you sure you want to delete this user with id {selectedUser.id}?
//           </Typography>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleDeleteUser}>Delete</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default NewMyTable;
