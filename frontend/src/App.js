import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import {getCookie} from './services/cookie';
import Home from './components/Home';
import NoPage from './components/NoPage';
import Navbar from './components/Navbar';
import Products from './components/Products';
import NewProduct from './components/NewProduct';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from './services/ProtectedRoute';
import LoginPage from './components/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from './actions/userLogin';
import SignupPage from './components/SignupPage';
import Description from './components/Description';
import NavbarTemplate from './components/NavbarTemplate';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
const LazyAbout = React.lazy(() => import('./components/About'));  

function App() {
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    const cookie = getCookie('userAuth')
    console.log('hello', cookie);
    setIsAuthenticated(cookie)
    if(cookie) {
      dispatch(userLogin(cookie))
    }
  }, [])
  return (
    <div className="App">
      {/* <Navbar /> */}
    
      <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Routes>
          {/* <Route path="/" element={<React.Suspense fallback={<div>Loading...</div>}>
          <Home />
        </React.Suspense>} /> */}
        {/* <Route path="product" element={<Products />}>
          <Route path="new" element={<NewProduct />} />
        </Route> */}
        <Route path="/" element={
        <Home/>} />
        <Route path="/login" element={
        <LoginPage />} />
         <Route path="/register" element={
         <SignupPage />} /> 
         <Route path="/classroom" element={
         <Description />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      </ProtectedRoute>
    </div>
  
  );
}

export default App;
