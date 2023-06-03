import { TextField } from '@mui/material'
import React from 'react'


export default function CustomTextField(props) {
    const{type, id, label, onChange, helperText, error} = props;

  return (
    <div>
      <TextField 
        required 
        variant='outlined' 
        sx={{margin:"7px"}} 
        type={type} 
        id={id} 
        label={label} 
        onChange={onChange} 
        helperText={helperText} 
        error={error}>
      </TextField>
    </div>
  )
}
