import React, { useState } from 'react'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import CustomTextField from './CustomTextField';
import CustomButton from './CustomButton';
import CustomCheckBox from './CustomCheckBox';
import CustomRadioButton from './CustomRadioButton';



export default function Form2() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      gender: '',
      check: false
    });

    const [errors, setErrors] = useState({
        errorFirst: '',
        errorLast: '',
        errorMobile: '',
        errorEmail: ''
    });

    console.log(errors);
    /*const handleChange2=(e)=>{
      let value=e.target.value;
      let name=e.target.name;
      
      let error="";
      if(name==="firstName" || name==="lastName")
      {
        if(!/^[a-zA-Z]+$/.test(value))
        error="Invalid"
      }

      setErrors((prevState)=>({
        ...prevState,
        [e.target.name]:error
      }))
    }*/
    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        let errorVariable="";

        console.log(name + value + type + checked);
        

        if(name=="firstName" || name=="lastName"){
            let regex = /^[a-zA-Z]+$/;
            if(!regex.test(newValue)){
                errorVariable = "Incorrect";

            }
            // console.log("firstnmae");
        }
        if(name == "mobile"){
            let regex = /^[0-9]+$/;
            if(!regex.test(newValue)){
                errorVariable="Incorrect";
            }
        }
        if(name == "email"){
            let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
            if(!regex.test(value)){
                errorVariable="Incorrect";
            }
        }
        // if(name == "check"){
        //     if(check)
        // }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));

          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorVariable
          }));

      }
    
      function handleSubmit(e) {
        e.preventDefault();
    
        const { firstName, lastName, mobile, gender, check } = formData;
    
        if (!firstName || !lastName || !mobile || !gender || !check) {
          setErrors({
            errorFirst: !firstName ? 'Required' : '',
            errorLast: !lastName ? 'Required' : '',
            errorMobile: !mobile ? 'Required' : '',
            // errorEmail: !email ? 'Required' : '',
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
        type='text' 
        id="firstName" 
        label="FIrst Name" 
        name='firstName'
        value={formData.firstName}
        onChange={handleChange}
        helperText={errors.errorFirst}
        error={Boolean(errors.errorFirst)}
      />
      <CustomTextField 
        type='text' 
        id="lastName" 
        label="Last Name" 
        name='lastName'
        value={formData.lastName}
        onChange={handleChange}
        helperText={errors.errorLast}
        error={Boolean(errors.errorLast)}
      />
      <CustomTextField 
        type='text' 
        id="mobileNumber" 
        label="Mobile Number" 
        name='mobile'
        value={formData.mobile}
        onChange={handleChange}
        helperText={errors.errorMobile}
        error={Boolean(errors.errorMobile)}
      />
      <CustomTextField  
        type='email' 
        id="email" 
        label="Email" 
        name='email'
        value={formData.email}
        onChange={handleChange}
        helperText={errors.errorEmail}
        error={Boolean(errors.errorEmail)} 
      />
      <br></br>
      
      <h3>Gender</h3>
      <RadioGroup
        // aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="female"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <FormControlLabel value="female" control={<CustomRadioButton />} label="Female" />
        <FormControlLabel value="male" control={<CustomRadioButton />} label="Male" />
        <FormControlLabel value="other" control={<CustomRadioButton />} label="Other" />
      </RadioGroup>
 
        
       
      <h3>Accept all terms and conditions <CustomCheckBox name="check" checked={formData.check} onChange={handleChange}/> </h3>

      <CustomButton type='submit' onSubmit={handleSubmit} >Submit</CustomButton>

      {/* <hr></hr>
      <h3>User Details</h3>
      <div>
        <h4>Name : {firstName} {lastName}</h4>
        <h4>Mobile Number : {mobile}</h4>
        <h4>Email : {email}</h4>
        <h4>Gender : {gender}</h4>
        <h4>Accept all terms and conditions : {check}</h4>
      </div> */}
    </div>
  )
}
