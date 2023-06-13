import { Checkbox } from '@mui/material';
import React from 'react'

export default function CustomCheckBox(props) {

    const {name, checked, onChange} = props;
  return (
    <div>
      <Checkbox  onChange={onChange}
      name={name}
      checked={checked}
      >

      </Checkbox>
    </div>
  )
}
