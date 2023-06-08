import React, { useEffect, useState } from 'react'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import CustomTextField from '../Assignment2/components/CustomTextField';
import CustomButton from '../Assignment2/components/CustomButton';
import CustomCheckBox from '../Assignment2/components/CustomCheckBox';
import CustomRadioButton from '../Assignment2/components/CustomRadioButton';
import { FormControl, FormHelperText } from '@mui/material';
import '../Assignment2/style.css';


const FinalForm = () => {

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
        email: '',
        gender:'',
        check:''
    });

    const [submitted, setSubmitted] = useState(false);
    
    const handleChange = (e) => {
        const name = e.target.name;
        const newValue = e.target.value;
        let errorVariable=""; 
        // console.log(typeof newValue);
        
        if(name==="firstName" || name==="lastName"){
            let regex = /^[a-zA-Z]+$/;
            if(!regex.test(newValue)){
                errorVariable = "Only Characters Allowed";
            }
        }
        if(name === "mobile"){
            let regex = /^[0-9]+$/;
            if(!regex.test(newValue) || newValue.length !== 10){
                errorVariable="Only Numbers Allowed";
            }
        }
        if(name === "email"){
            let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
            if(!regex.test(newValue)){
                errorVariable="format abc@gmail.com";
            }
        }

        setFormData( {
          ...formData,
          [name]: newValue,
        });

        setErrors({
          ...errors,
          [name]: errorVariable
        });
      }
        
    
      const handleSubmit = () => {
        
        const { firstName, lastName, mobile, email, gender, check } = formData;
        // console.log(formData);console.log(errors);

        if(firstName === "" || errors.firstName !== ''){
            setErrors({...errors, firstName : "Required" })
            return;
        }
        if(lastName === "" || errors.lastName !== ''){
            setErrors({...errors, lastName : "Required"})
            return;
        }
        if(mobile === "" || errors.mobile !== ''){
            setErrors({...errors, mobile : "Required"})
            return;
        }
        if(email === "" || errors.email !== ''){
            setErrors({...errors, email : "Required"})
            return;
        }
        if(gender === "" || errors.gender !== ''){
            setErrors({...errors, gender : "Required"})
            return;
        }
        if(check === false || errors.check !== ''){
            setErrors({...errors, check : "Required"})
            return;
        }

        if(!errors.firstName && !errors.lastName && !errors.mobile && !errors.email && !errors.gender && !errors.check){
            // console.log(formData);
            setSubmitted(true);
        }        
      }

  return (
    <div className="container">
        <h2>FINAL FORM : Please Enter Details</h2>
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
        name="gender" value={formData.gender} onChange={handleChange} sx={{display:"flex", flexDirection:"row", justifyContent: "center", alignItems: "center"}}
        >
        <FormControlLabel value="female" control={<CustomRadioButton />} label="Female" />
        <FormControlLabel value="male" control={<CustomRadioButton />} label="Male" />
        <FormControlLabel value="other" control={<CustomRadioButton />} label="Other" />
      </RadioGroup>
      {(<span style={{ color: 'red' }}>{errors.gender}</span>)}<br></br>
 
      
      <FormControlLabel label="Accept all terms and conditions" control={<CustomCheckBox onChange={() =>{
        setFormData( {
            ...formData,
            check : !formData.check
        })
        setErrors((prevState) => ({
            ...prevState,
            check : ""
        }))
      }}>  
        </CustomCheckBox>}></FormControlLabel>
        <br></br>
        {(<span style={{ color: 'red' }}>{errors.check}</span>)}

      <CustomButton type='submit' onClick={handleSubmit} >Submit</CustomButton>
        {submitted && (
        <div className="submitted-container">
          <hr />
          <h2>Form Submitted Successfully</h2>
          <h3>Name: {formData.firstName} {formData.lastName}</h3>
          <h3>Mobile: {formData.mobile}</h3>
          <h3>Email: {formData.email}</h3>
          <h3>Gender: {formData.gender}</h3>
          <h3>Accepted all conditions : {formData.check ? 'Yes' : 'No'}</h3>
        </div>
        )}
      </div>
  )
}
export default FinalForm;
