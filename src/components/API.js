import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function API() {
    const [data, setData] = useState();

    useEffect(()=>{
        fetchData();
    }, [data])

    const fetchData = async() =>{
        let response2 = await fetch("https://jsonplaceholder.typicode.com/users");
            response2 = await response2.json();
            console.log(response2);

        // let response = await axios.get("https://jsonplaceholder.typicode.com/users");
        // console.log(response.data);
    }
  return (
    <div>
      
    </div>
  )
}
