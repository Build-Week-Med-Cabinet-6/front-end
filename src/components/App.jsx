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
import Login from "./Login";
import Register from "./Register";
import Search from "./Search";

// route

import PrivateRoute from "./PrivateRoute";

function App() {
  const initialFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const [searchString, setSearchString] = useState("");
  const [formValues, setFormValues] = useState(initialFormValues);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    return setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onLoginSubmit = (evt) => {
    evt.preventDefault();

    for (let i = 0; i < users.length; i++) {
      const userEmail = users[i].email;
      const userPassword = users[i].password;

      // If this user's email and password matches the form values
      // go to the /home route and break out of this loop.
      if (
        userEmail === formValues.email &&
        userPassword === formValues.password
      ) {
        history.push("/search");
        break;
      }
    }
  };

  const onRegisterSubmit = (evt) => {
    evt.preventDefault();
    setFormValues(initialFormValues);
    history.push("/");
    return setUsers([...users, formValues]);
  };

  const onSearchSubmit = (evt) => {
    evt.preventDefault();
    setSearchString("");
    console.log(searchString);
  };

  const addSearchTerm = (evt) => {
    const searchTerm = evt.target.value;

    if (!searchString.includes(searchTerm)) {
      if (searchString === "") {
        // If this is the first search term
        return setSearchString(searchTerm);
      }

      return setSearchString(`${searchString}, ${searchTerm}`);
    }
  };

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
          <PrivateRoute exact path="/protected" component={SearchComp} />
          <Route path="/register" component={Register} />
          <Route component={Register} />
        </Switch>
      </div>
    </Route>
  );
}

export default App;
