import React, {useState} from 'react';
import { Login, Register } from './AuthForms.component';

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
      <Login onInputChange={onInputChange} onFormSubmit={onFormSubmit} formValues={formValues}/>
      <Register onInputChange={onInputChange} onFormSubmit={onFormSubmit} formValues={formValues}/>
    </div>
  );
}

export default App;
