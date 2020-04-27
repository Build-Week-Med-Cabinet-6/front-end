import React, {useState} from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

// Components
import Login from './Login';
import Register from './Register';

function App() {
  const initialFormValues = {
    name: "",
    email: "",
    password: "",
  }

  const [formValues, setFormValues] = useState(initialFormValues);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  const onInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;

    return setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const onLoginSubmit = evt => {
    evt.preventDefault();

    for(let i = 0; i < users.length; i++) {
      const userEmail = users[i].email;
      const userPassword = users[i].password;

      // If this user's email and password matches the form values 
      // go to the /home route and break out of this loop.
      if(userEmail === formValues.email && userPassword === formValues.password) { 
        history.push("/home");
        break;
      }
    }
  }

  const onRegisterSubmit = evt => {
    evt.preventDefault();
    setFormValues(initialFormValues);
    history.push("/");
    return setUsers([
      ...users,
      formValues,
    ]);
  }


  return (
    <div className="App">
      <Switch>
        <Route path="/home">
          <h1>Home Page</h1>
        </Route>
        <Route path="/register">
          <Register 
            onInputChange={onInputChange} 
            onRegisterSubmit={onRegisterSubmit} 
            formValues={formValues}
          />
        </Route>
        <Route path="/">
          <Login 
            onInputChange={onInputChange} 
            onLoginSubmit={onLoginSubmit} 
            formValues={formValues}
          />
          <Link to="/register">Register</Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
