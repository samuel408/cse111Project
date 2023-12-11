import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie'

const RequireAuth = ({children}) => {
  const [cookies, setCookie] = useCookies(['access_token'])
  const token = cookies.access_token
  if(!token) {
    return <Navigate to="/signin"/>
  }
  return children
};

export default RequireAuth;