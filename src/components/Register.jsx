import React from 'react';

function Register(props) {
  const {onInputChange, onFormSubmit, formValues} = props;
  return(
    <form>
      <label htmlFor="name">Name</label>
      <input onChange={onInputChange} type="text" name="name" id="name" value={formValues.name}/>
      <label htmlFor="email">Email</label>
      <input onChange={onInputChange} type="text" name="email" id="email" value={formValues.email}/>
      <label htmlFor="password">Password</label>
      <input onChange={onInputChange} type="password" name="password" id="password" value={formValues.password}/>
      <input onClick={onFormSubmit} type="submit" value="Register" />
  </form>
  );
}

export default Register;