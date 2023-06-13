import { Button } from '@mui/material'
import React from 'react'

export default function CustomButton(props) {
    const{type, onClick, color, children} = props;
  
    return (
    <div>
      <Button 
        variant="outlined"
        type={type}
        onClick={onClick}
        color={color}
        children={children}
      >
      </Button>
    </div>
  )
}
