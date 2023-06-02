import React, { useState } from 'react'
import Child from './Child'
import SecondChild from './SecondChild';

export default function Parent() {
    const[name, setName] = useState("Parent");

    function getData(data){
        console.log("data coming from Child --> " + data);
        alert("data coming from Child  --> " + data);
    }
  return (
    <div className='App'>

      <Child name={"child component"} age={7} gender={"male"}></Child>
      {/* <SecondChild onSubmit={getData}></SecondChild> */}
      
      <h2>Name : {name}</h2>
        <SecondChild setName={setName}></SecondChild>
    </div>
  )
}
