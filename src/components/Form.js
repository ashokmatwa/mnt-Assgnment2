import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import isEmail from 'validator/lib/isEmail';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { FormGroup } from '@mui/material';



export default function Form() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [firstName, setFirstName] = useState(" ");
    const [lastName, setlastName] = useState(" ");
    const [mobile, setMobile] = useState(" ");
    const [email , setEmail] = useState(" ");
    const [gender, setGender] = useState(" ");
    const [check, setCheck] = useState("false");

    function handleFirstName(e){
        let value = e.target.value;
        let regex = /^[a-zA-Z]+$/;
        // if(value.match(regex))
        if(regex.test(value))
            setFirstName(value);
        else alert("Enter Correct FirstName");
    }
    function handleLastName(e){
        let value = e.target.value;
        let regex = /^[a-zA-Z]+$/;
        if(regex.test(value))
            setlastName(value);
        else alert("Enter Correct LastName");
    }
    function handleMobileNumber(e){
        let value = e.target.value;
        let regex = /^[0-9]+$/;
        if(regex.test(value))
            setMobile(value);
        else alert("Enter Correct Mobile Number");
    }
    function handleEmail(e){
        let value = e.target.value;
        // let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        // let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/

        // if(regex.test(value))
            setEmail(value);
        // else alert("Enter Correct Email");
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
        // handleEmail();

        if(firstName==" "||lastName==" "||mobile==" "||gender==" "||check=="false")//||email==" "
        {   alert("Fill all the details"); 
            return
        }
        if(!(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email))){
            alert("Enter Correct Email");
            return;
        } 
            
        alert("Details Updated");
    }
  return (
    <div>
        <h2>Please Enter Details</h2>
      <TextField required type='text' id="firstName" label="FIrst Name" variant="outlined" onChange={handleFirstName}/>
      <TextField required type='text' id="lastName" label="Last Name" variant="outlined" onChange={handleLastName}  />
      <br></br>
      <br></br>
      <TextField required type='text' id="mobileNumber" label="Mobile Number" variant="outlined" onChange={handleMobileNumber}/>
      <TextField required type='email' id="email" label="Email" variant="outlined" onChange={handleEmail}/>
      <br></br>
      
      <h3>Gender</h3>
      <RadioGroup
        // aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="female"
        name="gender"
        onChange={handleGender}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
 
        
       
      <h3>Accept all terms and conditions <Checkbox {...label} onChange={handleCheckBox}/> </h3>

      <Button variant="outlined" type='submit' onClick={handleSubmit} sx={{color:"#004236"}}>Submit</Button>

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



{/* <FormGroup>{ <FormControlLabel label="Accept all terms and conditions"></FormControlLabel>      }</FormGroup> */}