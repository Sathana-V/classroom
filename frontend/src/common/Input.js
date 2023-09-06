import React from 'react'
import "./css/input.scss"
function Input(props) { 
  
  return (
    <>
     <input ref={props.ref} onChange={props.eventChangeHandler} className={props.className} type={props.type} placeholder={props.placeholder} />
    </>
  )
}

export default Input