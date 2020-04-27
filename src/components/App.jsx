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
    // check if the formValues email and password exist in the users state.
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
