import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function RedirectIfAuthenticatedRoute(props) {
  const { isAuthenticated, path, element } = props;

  const isUserAuthenticated = isAuthenticated;

  if (isUserAuthenticated && (path === '/login' || path === '/register')) {
    return <Navigate to="/" replace />;
  } else if (!isUserAuthenticated && path !== '/login' && path !== '/register') {
    return <Navigate to="/login" replace />;
  }

  return <Route {...props} />;
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.userStatus,
});

export default connect(mapStateToProps)(RedirectIfAuthenticatedRoute);