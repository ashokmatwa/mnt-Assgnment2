import React, { useEffect, useState } from 'react'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import CustomTextField from './components/CustomTextField';
import CustomButton from './components/CustomButton';
import CustomCheckBox from './components/CustomCheckBox';
import CustomRadioButton from './components/CustomRadioButton';
import { FormControl, FormHelperText } from '@mui/material';
import '../Assignment4/style.css';

import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../Redux/actions/formActions';
import { setUserData } from '../Redux/reducers/formSlice';
import { useNavigate } from 'react-router-dom';


const CustomForm = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch(); // to dispacth the data to the STORE
  const newformData = useSelector((state) => state.form.formData); //just fethcing data to CONSOLE
  // const newformData = useSelector((state) => state);
  console.log(newformData);

  const lastObject = newformData[newformData.length - 1];
  const newId = lastObject ? (lastObject.id+1) : 1;
    
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      gender: '',
      check: false,
      id:newId
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        gender:'',
        check:''
    });

    const [submitted, setSubmitted] = useState(false);  // additinaol --> e.preventpage
    // useEffect(() => {
    //   if (submitted) {
    //     setFormData(prevFormData => ({
    //       ...prevFormData,
    //       firstName: '',
    //       lastName: '',
    //       mobile: '',
    //       email: '',
    //       gender: '',
    //       check: false,
    //       id: prevFormData.id + 1 // Increment the id correctly
    //     }));
    //   }
    // }, [submitted]);
    
    const handleChange = (e) => {
        const name = e.target.name;
        const newValue = e.target.value;
        let errorVariable=""; 
        
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

        // if (name === 'check') {
        //   setFormData({
        //     ...formData,
        //     check: !formData.check, // Toggle the value of check
        //   });
        //   setErrors((prevState) => ({
        //     ...prevState,
        //     check: '',
        //   }));
        // }

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
            dispatch(setUserData(formData));
            setFormData({
              firstName: '',
              lastName: '',
              mobile: '',
              email: '',
              gender: '',
              check: false,
              id:(formData.id + 1)
            });
      
            // console.log(formData);
            setSubmitted(true);
        }        
      }

      const handleClick = () => {
        navigate('/assignment4');
      };

  return (
    <div className="container1">
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
 
      
      <FormControlLabel label="Accept all terms and conditions" control={<CustomCheckBox 
      onChange={() =>{
        setFormData( {
            ...formData,
            check : !formData.check
        })
        setErrors((prevState) => ({
            ...prevState,
            check : ""
        }))
      }}
      // onChange={handleChange}
      >  
        </CustomCheckBox>}></FormControlLabel>
        <br></br>
        {(<span style={{ color: 'red' }}>{errors.check}</span>)}

      <CustomButton type='submit' onClick={handleSubmit} >Submit</CustomButton>

      {/* <a href="/assignment4" onClick={handleClick}>{formData}
        <CustomButton type='submit' onClick={handleSubmit} >Submit</CustomButton> 
      </a> */}
      <br></br>
      <CustomButton type='submit' color='success' onClick={handleClick}>SHOW TABLE</CustomButton>

      </div>
  )
}
export default CustomForm;
