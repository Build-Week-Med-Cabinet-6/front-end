import React from 'react';

export function Login(props) {
  const {onInputChange, onFormSubmit, formValues} = props;
  return(
    <form>
      <label for="email">Email</label>
      <input onChange={onInputChange} type="text" id="email" value={formValues.email}/>
      <label for="password">Password</label>
      <input onChange={onInputChange} type="password" id="password" value={formValues.password}/>
      <input onClick={onFormSubmit} type="submit" value="Login" />
    </form>
  );
}

export function Register(props) {
  const {onInputChange, onFormSubmit, formValues} = props;
  return(
    <form>
      <label for="name">Name</label>
      <input onChange={onInputChange} type="text" id="name" value={formValues.name}/>
      <label for="email">Email</label>
      <input onChange={onInputChange} type="text" id="email" value={formValues.email}/>
      <label for="password">Password</label>
      <input onChange={onInputChange} type="password" id="password" value={formValues.password}/>
      <input onClick={onFormSubmit} type="submit" value="Login" />
  </form>
  );
}