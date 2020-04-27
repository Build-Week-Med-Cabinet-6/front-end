import React, {useState} from 'react';
import { Switch, Route, Link } from 'react-router-dom';

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

  const onInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;

    return setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const onFormSubmit = evt => {
    evt.preventDefault();
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/register">
          <Register 
            onInputChange={onInputChange} 
            onFormSubmit={onFormSubmit} 
            formValues={formValues}
          />
          <Link to="/">Login</Link> {/* This link is for testing the Routes */}
        </Route>
        <Route path="/">
          <Login 
            onInputChange={onInputChange} 
            onFormSubmit={onFormSubmit} 
            formValues={formValues}
          />
          <Link to="/register">Register</Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
