import React, { useEffect, useState } from 'react'
import axios from "axios";
import MyTable from './components/table';


 const APIS = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async() =>{
        // let response2 = await fetch("https://jsonplaceholder.typicode.com/users");
        // response2 = await response2.json();
        // setData(response2);
        // console.log(response2);

        try{
            let response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setData(response.data);
            // console.log(response.data);
        }catch(error){
            console.log(error);
        }
        
    }
  return (
    <div>
        <MyTable data={data}></MyTable>
    </div>
  )
}
export default APIS;