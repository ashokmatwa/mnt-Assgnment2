import { FormControlLabel } from '@mui/material';
import React from 'react'

export default function CustomFormControllabel(props) {
    const{value, control, label} = props;
  
    return (
    <div>
      <FormControlLabel value={value} control={control} label={label}></FormControlLabel>
    </div>
  )
}
