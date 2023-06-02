import React from 'react'


export default function Child(props) {
    
  return (
    <div>
        <hr></hr>
      <h3>Name : {props.name} Age : {props.age} Gender : {props.gender}</h3>
    </div>
  )
}
