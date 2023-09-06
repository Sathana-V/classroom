import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../actions/userLogin'
import { deleteCookie } from '../services/cookie'
function Navbar() {
  const value = useSelector(state => state.user)
  console.log(value);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(state => state.user.userStatus)
  const handleLogout = () => {
    deleteCookie("userAuth")
    dispatch(userLogout())
    navigate("/login")
  }
  return (
    <div>
      <Link to=""> Home </Link>
      <Link to="about"> About </Link> 
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </div>
  )
}

export default Navbar