import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CustomDialogBox = (props) => {
    const {open, onClose, title, content, actions} = props;
  return (
    <div>
      <Dialog sx={{textAlign:"center"}} open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{minWidth:"500px"}}>{content}</DialogContent>
      <DialogActions> {actions} </DialogActions>
    </Dialog>
    </div>
  )
}

export default CustomDialogBox
