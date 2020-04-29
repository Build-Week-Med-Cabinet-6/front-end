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
import StrainsList from './StrainsList';
import Header from './Header';
import Profile from './Profile';

// route
import PrivateRoute from "./PrivateRoute";

function App() {
  const initialFormValues = {
    name: "",
    email: "",
    password: "",
  };
  const initialStrains = [
    {
      name: "Strain name",
      effects: "Effects...",
      flavors: "Flavors...",
      description: "Strain description... Lorem Ipsum",
    }
  ];

  const history = useHistory();

  const [formValues, setFormValues] = useState(initialFormValues);
  const [strains, setStrains] = useState(initialStrains);

  return (
    <Route>
      <div className="App">
        <ul>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/protected" component={PrivateRoute} />
          <Route exact path="/" component={Register} />

          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/protected" component={Home} />
          <Route path="/register" component={Register} />
          <Route component={Register} />
        </Switch>
      </div>
    </Route>
  );
}

export default App;
