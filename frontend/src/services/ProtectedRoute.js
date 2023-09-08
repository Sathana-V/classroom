import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoute(props) {
  useEffect(() => {
    console.log('protected route', props.isAuthenticated);
  },[])
  const location = useLocation()
  if (props.isAuthenticated) {
    if (location.pathname === '/login' || location.pathname === '/register') {
      return  <Navigate to="/"></Navigate>
    }
    window.href = location.pathname
    return props.children
  } else {
    if (location.pathname === '/login' || location.pathname === '/register') {
      return  props.children
    }
    debugger
    return <Navigate to="/login"></Navigate>
  }
  
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.userStatus,
});

export default connect(mapStateToProps)(ProtectedRoute);
