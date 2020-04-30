import React, { useState } from "react";
import SearchComp from "./Search";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";

// Components
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import Wrapper from './Wrapper';

// route
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Route>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/protected" component={PrivateRoute} />
          <Route exact path="/" component={Login} />

          <Route path="/profile" component={Profile}/>

          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/protected" component={Home} />
          <Route path="/register" component={Register} />
          <Route component={Login} />
        </Switch>
      </div>
    </Route>
  );
}

export default App;
