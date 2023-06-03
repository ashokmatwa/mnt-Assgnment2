import { Button } from '@mui/material'
import React from 'react'

export default function CustomButton(props) {
    const{type, onClick, children} = props;
  
    return (
    <div>
      <Button 
        variant="outlined"
        type={type}
        onClick={onClick}
        sx={{backgroundColor: '#004236', color: 'white'}}
        children={children}
      >
      </Button>
    </div>
  )
}
