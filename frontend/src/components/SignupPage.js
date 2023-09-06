import React, { useEffect, useRef, useState } from 'react'
import { submitRegistrationForm } from '../services/api'
import Card from '../common/Card.js'
import formImage from '../assets/images/form.webp'
import Input from '../common/Input.js'
import Button from '../common/Button.js'
export default function SignupPage() {
  //state
  const [userDetails, setUserDetails] = useState({ type: 'Student' })
  const [error, setError] = useState({})

  //updateUserInput

  const updateUserInput = (target, value) => {
    setUserDetails((prevState) => (
      {
        ...prevState,
        [target]: value
      }
    ))
  }

  const resetError = (value) => {
    setError((prevState) => ({
      ...prevState,
      [value]: ''
    }));
  }
  const passwordValidations = (password, confirmPassword) => {
    resetError('password')
    resetError('confirmPassword')
    if (!password || password.length < 5) {
      setError((prevState) => ({
        ...prevState,
        password: 'Password should have at least 5 letters'
      }));
      return true
    }
    if (password != confirmPassword) {
      setError((prevState) => ({
        ...prevState,
        confirmPassword: 'Password should match'
      }))
      return true
    }
    return false
  }
  const usernameValidations = (username) => {
    resetError('username')
    if (!username || username.length < 5) {
      setError((prevState) => ({
        ...prevState,
        username: 'Invalid username'
      }));
      return true
    }
    return false
  }
  const emailValidations = (email) => {
    resetError('email')
    if (!email || email.length < 5) {
      setError((prevState) => ({
        ...prevState,
        email: 'Invalid email'
      }));
      return true
    }
    return false
  }

  const handleUserRegister = async(e) => {
    resetError('submitError')
    resetError('submitMessage')

    e.preventDefault()
    let password = userDetails.password
    let confirmPassword = userDetails.confirmPassword
    let username = userDetails.username
    let passwordError = passwordValidations(password, confirmPassword)
    let userError = usernameValidations(username)
    let emailError = emailValidations(userDetails.email)
   
    if (Object.keys(userDetails).length > 0) {
      if (!passwordError && !userError && !emailError) {
        console.log('making api call');
        submitRegistrationForm(userDetails).then ((data) => {
          let {response} = data
          console.log(response.data.message);
      
          setError((prevState) => ({
            ...prevState,
            submitError: data.status == 400,
            submitMessage: response.data.message
          }));
        })
      }
    }
  }

  return (
    <div className="login-page">
      <Card>
        <div className="login-container">
          <div className="login-image">
            <img src={formImage} alt="form-image"></img>
          </div>
          <div className="login-form">
            <div className="login-form-heading">
              <h2>Sign up </h2>
            </div>
            <form onSubmit={handleUserRegister}>
              <Input type="text" className={error.username ? 'error' : ''} eventChangeHandler={(e) => updateUserInput('username', e.target.value)} placeholder="Username"></Input>

              {error.username && <span className="error-message">{error.username}</span>}
              <Input type="email" className={error.email ? 'error' : ''} eventChangeHandler={(e) => updateUserInput('email', e.target.value)} placeholder="Email Id"></Input>
              {error.email && <span className="error-message">{error.email}</span>}
              <Input type="password" className={error.password ? 'error' : ''} eventChangeHandler={(e) => updateUserInput('password', e.target.value)} placeholder="Password"></Input>
              {error.password && <span className="error-message">{error.password}</span>}
              <Input type="password" className={error.confirmPassword ? 'error' : ''} eventChangeHandler={(e) => updateUserInput('confirmPassword', e.target.value)} placeholder="Confirm Password"></Input>
              {error.confirmPassword && <span className="error-message">{error.confirmPassword}</span>}
              <select onChange={(e) => updateUserInput('type', e.target.value)}>
                <option value="Student">Student</option>
                <option value="Staff">Staff</option>
              </select>
              {error.submitError && <span className="error-message">{error.submitError}</span>}
              <a className="link" href="/login">Already have account ?</a>

              <Button type="submit" className="block" handleButtonClick={() => { }} value="Submit"></Button>
            </form>

          </div>

        </div>
      </Card>
      {error.submitMessage && <h1 className={`login-message-box ${error.submitError ? 'login-message-box-error': ''}`}> {error.submitMessage}</h1> } 
    </div >
  )
}
