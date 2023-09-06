import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoute(props) {
  useEffect(() => {
    console.log('protected route');
  },[])
  const location = useLocation()
  if (props.isAuthenticated) {
    if (location.pathname === '/login' || location.pathname === '/register') {
      return  <Navigate to="/"></Navigate>
    }
    return props.children
  } else {
    if (location.pathname === '/login' || location.pathname === '/register') {
      return  props.children
    }
    return <Navigate to="/login"></Navigate>
  }
  
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.userStatus,
});

export default connect(mapStateToProps)(ProtectedRoute);
