import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthHandle from "./AuthHandle";

export default function ProtectedUser(props) {
  const { Component1 } = props;
  const { Component2 } = props;
  useEffect(() => {
    const isAuthenticated =
      AuthHandle.signin() &&
      AuthHandle.refreshToken() &&
      AuthHandle.accessToken() &&
      AuthHandle.expirationTime();
    if (true) {
      <Navigate to="/" />;
    }
  });

  return(
    <>
      <Component1/>
    </>
  );
}
