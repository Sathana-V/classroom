import React from 'react'
import "./css/button.scss"

function Button(props) {
  return (
    <>
      <button type={props.type} className={props.className} onClick={(e) => props.handleButtonClick(e)}>{props.value}</button>
    </>
  )
}

export default Button