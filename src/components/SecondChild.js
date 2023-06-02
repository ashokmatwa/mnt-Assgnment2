import React from 'react'

export default function SecondChild(props) {
    function onClick(e){
        props.onSubmit("asf")
    }

    function check(){
        props.setName("Child");
    }
  return (
    <div>
      {/* <button type="submit" onClick={onClick}>Submit</button> */}
      
      <button type="submit" onClick={check}>Submit 2</button>
    </div>
  )
}
