import React, { useEffect, useState } from 'react'
import axios from "axios";
import MyTable from './components/table';
import ApiReduxTable from './apiReduxTable';
// import NewMyTable from './components/check';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApi } from '../Redux/reducers/apiSlice';
import CustomButton from '../Assignment3/components/CustomButton';


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

    const postData = async() =>{
        const article = { id: 11, name:"Avdut", email:"avdut@gmail.com", address:{street:"gali no 2", city:"Pune"},
                         phone:"0291-123456789", company:{name:"Mindnerves"}};
        const response = await axios.post("https://jsonplaceholder.typicode.com/users", article);
        setData({id:response.data.id});
    }

    const dispatch = useDispatch();
    // const newapiData = useSelector((state) => state.api.apiData);
    const state = useSelector((state) => state);

    const handleClick = () => {
        dispatch(fetchApi());
        console.log(state.api.apiData)
    }

    if(state.api.isLoading){
        return <h1>LOADING...</h1>
    }
    console.log(state.api.apiData)
  return (
    <div>
        {/* <MyTable data={data}></MyTable> */}

        <br></br>
        <CustomButton type='submit' color='primary' onClick={handleClick}>Fetch API</CustomButton>
        { state.api.apiData && <ApiReduxTable data={state.api.apiData}></ApiReduxTable> }

        {/* <NewMyTable data={data}></NewMyTable> */}
        {/* <button onClick={postData}>Add Data</button> */}
    </div>
  )
}
export default APIS;