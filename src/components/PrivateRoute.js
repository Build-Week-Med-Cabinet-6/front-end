import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth";
import Search from "./Search";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth.isAuthenticated()) {
          return <Search {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
