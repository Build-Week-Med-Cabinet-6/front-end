import React from 'react';

function Login(props) {
  const {onInputChange, onLoginSubmit, formValues} = props;
  return(
    <form>
      <label htmlFor="email">Email</label>
      <input onChange={onInputChange} type="text" name="email" id="email" value={formValues.email}/>
      <label htmlFor="password">Password</label>
      <input onChange={onInputChange} type="password" name="password" id="password" value={formValues.password}/>
      <input onClick={onLoginSubmit} type="submit" value="Login" />
    </form>
  );
}

export default Login;