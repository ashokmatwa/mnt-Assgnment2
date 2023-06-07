import React, { useState } from 'react'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import CustomTextField from './CustomTextField';
import CustomButton from './CustomButton';
import CustomCheckBox from './CustomCheckBox';
import CustomRadioButton from './CustomRadioButton';
import { Checkbox } from '@mui/material';


export default function Form2() {

    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      gender: '',
      check: false
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: ''
    });
    // console.log(errors);
    
    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        let errorVariable=""; //console.log(name + value + type + checked);
        
        if(name==="firstName" || name==="lastName"){
            let regex = /^[a-zA-Z]+$/;
            if(!regex.test(newValue)){
                errorVariable = "Only Characters Allowed";
            }
        }
        if(name === "mobile"){
            let regex = /^[0-9]+$/;
            if(!regex.test(newValue)){
                errorVariable="Only Numbers Allowed";
            }
        }
        if(name === "email"){
            let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
            if(!regex.test(value)){
                errorVariable="format abc@gmail.com";
            }
        }

        setFormData( {
          ...formData,
          [name]: value,
        });

        setErrors({
          ...errors,
          [name]: errorVariable
        });
      }
    
      function handleSubmit() {
    
        const { firstName, lastName, mobile, email, gender, check } = formData;
    
        if (!firstName || !lastName || !mobile || !gender || !check || !email) {
          setErrors({
            firstName: !firstName ? 'Required' : '',
            lastName: !lastName ? 'Required' : '',
            mobile: !mobile ? 'Required' : '',
            email: !email ? 'Required' : '',
          });
          alert('Fill all the details');
          return;
        }
        alert('Details Updated');
      }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h2>FORM2 : Please Enter Details</h2>
      <CustomTextField
        type='text' id="firstName" label="FIrst Name" name='firstName' value={formData.firstName}
        onChange={handleChange} helperText={errors.firstName} error={Boolean(errors.firstName)}
      />
      <CustomTextField 
        type='text' id="lastName" label="Last Name" name='lastName' value={formData.lastName} 
        onChange={handleChange} helperText={errors.lastName} error={Boolean(errors.lastName)}
      />
      <CustomTextField 
        type='text' id="mobileNumber" label="Mobile Number" name='mobile'value={formData.mobile}
        onChange={handleChange} helperText={errors.mobile} error={Boolean(errors.mobile)}
      />
      <CustomTextField  
        type='email' id="email" label="Email" name='email' value={formData.email}
        onChange={handleChange} helperText={errors.email} error={Boolean(errors.email)} 
      />
      <br></br>
      
      <h3>Gender</h3>
      <RadioGroup
        name="gender" value={formData.gender} onChange={handleChange}
      >
        <FormControlLabel value="female" control={<CustomRadioButton />} label="Female" />
        <FormControlLabel value="male" control={<CustomRadioButton />} label="Male" />
        <FormControlLabel value="other" control={<CustomRadioButton />} label="Other" />
      </RadioGroup>
 
      <FormControlLabel label="Accept all terms and conditions" control={<CustomCheckBox onChange={() => setFormData( {
        ...formData,
        check : !formData.check})}>  
        </CustomCheckBox>}></FormControlLabel>

      <CustomButton type='submit' onClick={handleSubmit} >Submit</CustomButton>
    </div>
  )
}
