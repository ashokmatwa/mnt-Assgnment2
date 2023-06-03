import { Checkbox } from '@mui/material';
import React from 'react'

export default function CustomCheckBox(props) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const {onChange} = props;
  return (
    <div>
      <Checkbox {...label} onChange={onChange}></Checkbox>
    </div>
  )
}
