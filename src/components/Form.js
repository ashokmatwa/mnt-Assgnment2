import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { FormGroup } from '@mui/material';
import CustomTextField from './CustomTextField';
import CustomButton from './CustomButton';
import CustomCheckBox from './CustomCheckBox';
import CustomRadioButton from './CustomRadioButton';



export default function Form() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const [firstName, setFirstName] = useState(" ");
    const [lastName, setlastName] = useState(" ");
    const [mobile, setMobile] = useState(" ");
    const [email , setEmail] = useState(" ");
    const [gender, setGender] = useState(" ");
    const [check, setCheck] = useState("false");

    const [errorFirst, setErrorFirst] = useState();
    const [errorLast, setErrorLast] = useState();
    const [errorMobile, setErrorMobile] = useState();
    const [errorEmail, setErrorEmail] = useState(); 

    function handleFirstName(e){
        let value = e.target.value;
        let regex = /^[a-zA-Z]+$/;
        
        if(regex.test(value)){// if(value.match(regex))
            setFirstName(value);
            setErrorFirst();
        }  
        else {
            // alert("Enter Correct FirstName");
            setFirstName(" ");
            setErrorFirst("Incorrect");
        }
    }
    function handleLastName(e){
        let value = e.target.value;
        let regex = /^[a-zA-Z]+$/;
        if(regex.test(value)){
            setlastName(value);
            setErrorLast();
        }
        else{
            // alert("Enter Correct LastName");
            setErrorLast("Incorrect");
        } 
    }
    function handleMobileNumber(e){
        let value = e.target.value;
        let regex = /^[0-9]+$/;
        if(regex.test(value)){
            setMobile(value);
            setErrorMobile();
        }
        else{
            // alert("Enter Correct Mobile Number");
            setErrorMobile("Incorrect");
        } 
    }
    function handleEmail(e){
        let value = e.target.value;
        // let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/

        if(regex.test(value)){
            setEmail(value);
            setErrorEmail();
        }
        else{
            setErrorEmail("Incorrect");
        } 
    }
    function handleGender(e){
        setGender(e.target.value);
    }
    function handleCheckBox(e){
        if(check=="false")
            setCheck("true");
        else setCheck("false");
        // setCheck(!check);
    }
    function handleSubmit(){
        console.log("finish");
        console.log(email);

        if(firstName==" "||lastName==" "||mobile==" "||gender==" "||check=="false"){//||email==" "
            alert("Fill all the details"); 
            return;
        }
        // if(!(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email))){
        //     alert("Enter Correct Email");
        //     return;
        // } 
            
        alert("Details Updated");
    }
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h2>Please Enter Details</h2>
      <CustomTextField
        type='text' 
        id="firstName" 
        label="FIrst Name" 
        onChange={handleFirstName} 
        helperText={errorFirst} 
        name="firstName"
        //value={firstName}
        error={errorFirst == "Incorrect"}
      />
      <CustomTextField 
        type='text' 
        id="lastName" 
        label="Last Name" 
        name="lastName"
        // value={lastName}
        onChange={handleLastName} 
        helperText={errorLast} 
        error={errorLast == "Incorrect"} 
      />
      <CustomTextField 
        type='text' 
        id="mobileNumber" 
        label="Mobile Number" 
        name="mobile"
        // value={mobile}
        onChange={handleMobileNumber} 
        helperText={errorMobile} 
        error={errorMobile == "Incorrect"}
      />
      <CustomTextField  
        type='email' 
        id="email" 
        label="Email" 
        name="email"
        // value={email}
        onChange={handleEmail} 
        helperText={errorEmail} 
        error={errorEmail == "Incorrect"} 
      />
      <br></br>
      
      <h3>Gender</h3>
      <RadioGroup
        // aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="female"
        name="gender"
        // value={gender}
        onChange={handleGender}
      >
        <FormControlLabel value="female" control={<CustomRadioButton />} label="Female" />
        <FormControlLabel value="male" control={<CustomRadioButton />} label="Male" />
        <FormControlLabel value="other" control={<CustomRadioButton />} label="Other" />
      </RadioGroup>
 
        
       
      <h3>Accept all terms and conditions <CustomCheckBox name="check" onChange={handleCheckBox}/> </h3>

      <CustomButton type='submit' onClick={handleSubmit} >Submit</CustomButton>

      <hr></hr>
      <h3>User Details</h3>
      <div>
        <h4>Name : {firstName} {lastName}</h4>
        <h4>Mobile Number : {mobile}</h4>
        <h4>Email : {email}</h4>
        <h4>Gender : {gender}</h4>
        <h4>Accept all terms and conditions : {check}</h4>
      </div>
    </div>
  )
}