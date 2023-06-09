import { TextField } from '@mui/material'
import React from 'react'


export default function CustomTextField(props) {
    const{type, id, label, name, value, onChange, helperText, error} = props;

  return (
    <div>
      <TextField 
        required 
        variant='filled' 
        sx={{margin:"7px"}} 
        type={type} 
        id={id} 
        label={label} 
        onChange={onChange} 
        helperText={helperText} 
        error={error}
        name={name}
        value={value}
        >
      </TextField>
    </div>
  )
}
