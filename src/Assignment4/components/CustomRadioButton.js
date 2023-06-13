import { FormControlLabel, RadioGroup, Radio } from '@mui/material'
import React from 'react'

export default function CustomRadioButton(props) {
    const{...restprops} = props;

    return (
    <div>
     <Radio {...restprops}></Radio>
    </div>
  )
}


