import React, {useEffect} from 'react'
import UserTable from './userTable'

import { useDispatch } from 'react-redux';
import { setUserData } from '../Redux/reducers/formSlice';
import axios from 'axios';


const Assignment = () => {
    const data = [{
            id:"1",
            firstName:"Ashok",
            lastName:"Matwa",
            phone:"1234567890",
            email:"ashok@gmail.com",
            gender:"Male"
        }
    ]

    const dispatch = useDispatch();
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData = async() =>{
        try{
            let response = await axios.get("https://jsonplaceholder.typicode.com/users");
            // dispatch(setUserData(data));
            // console.log(response.data);
        }catch(error){
            console.log(error);
        }
        
    }
  return (
    <>
      {/* <UserTable data={data}></UserTable> */}
      <UserTable></UserTable>
    </>
  )
}

export default Assignment
