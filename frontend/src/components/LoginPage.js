import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitLoginForm } from '../services/api'
import { useNavigate } from 'react-router-dom';
import './css/loginPage.scss'
import formImage from '../assets/images/form.webp'
import { setCookie } from '../services/cookie'
import Card from '../common/Card';
import { userLogin } from '../actions/userLogin';
import Input from '../common/Input';
import Button from '../common/Button';
import { isValidInput } from '../mixins/validation';
export default function LoginPage() {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [error, setError] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginSubmit = (e) => {
        e.preventDefault()
        let passwordError = !isValidInput(userEmail) ? 'Invalid password' : ''
        let usernameError = !isValidInput(userPassword) ? 'Invalid username' : ''
        setError({
            password: passwordError,
            username: usernameError
        })
        if (!passwordError && !passwordError) {
            let data = {
                username: userEmail,
                password: userPassword
            }
            submitLoginForm(data).then((response) => {
                if (response.status === 200) {
                    setCookie('userAuth', userEmail, 30);
                    const {userDetails} = response.response.data
                    localStorage.setItem("userDetails", JSON.stringify({
                        username: userDetails.username,
                        email: userDetails.email,
                        type: userDetails.type,
                        _id: userDetails._id
                    }))
                    debugger
                    dispatch(userLogin(userEmail))
                    navigate("/")
                }
            })
        }
    }

    const userEmailHanlder = (e) => {
        setUserEmail(e.target.value)
    }
    const userPasswordHandler = (e) => {
        setUserPassword(e.target.value)
    }
    useEffect(() => {
        console.log('lgoin mounted');
    },[])
    return (
        <div className="login-page">
              <h1>Welcome to Classroom</h1>
            <Card>
                <div className="login-container">
                    <div className="login-image">
                        <img src={formImage} alt="form-image"></img>
                    </div>
                    <div className="login-form">
                        <div className="login-form-heading">
                            
                            <h2>Login </h2>
                        </div>
                            <form onSubmit={handleLoginSubmit}>
                                <Input type="text" className={error.username ? 'error': ''}  eventChangeHandler={userEmailHanlder} placeholder="Email"></Input>
                                <Input type="text" className={error.password ? 'error': ''}  eventChangeHandler={userPasswordHandler} placeholder="password"></Input>
                                <div className="login-buttons">
                                    <Button type="submit" handleButtonClick={() => {}} value="Login"></Button>
                                    <Button type="button" handleButtonClick={() => navigate('/register')} value="Register"></Button>
                                </div>
                            </form>
                       
                    </div>

                </div>
            </Card>
        </div >
    )
}
