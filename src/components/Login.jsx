import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import * as Yup from "yup";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Button } from 'reactstrap';

import Wrapper from './Wrapper';
import FormErrorAlert from './FormErrorAlert';
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import auth from "./auth";
const Login = (
  {
    values,
    errors,
    touched,
    isSubmitting,
    onInputChange,
    onRegisterSubmit,
    formValue,
  },
  props
) => (
  <Wrapper top>
      <Form>
        <FormErrorAlert render={errors.username} errorMessage={errors.username}/>
        <FormErrorAlert render={errors.password && touched.password} errorMessage={errors.password}/>
        <div>
        <h2 className="h1">Login</h2>
          <Field
            type="text"
            name="username"
            placeholder="Username"
            className="fields"
          />
        </div>

        <div>
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="fields"
          />
        </div>
        <Button
        type="submit"
          disabled={isSubmitting}
          onClick={() => {
            auth.login(() => {});
          }}
          color={
            values.username 
            && !errors.username 
            && values.password 
            && !errors.password 
              ? "success" 
              : "secondary"
          }
        >
          Submit
        </Button>
        <Link to="/register">Register</Link>
      </Form>
  </Wrapper>
);

const FormikSignIn = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || "",
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().min(4).required("Username is required"),
    password: Yup.string().required("Password is required"),
  }),
  handleSubmit(
    values,
    { resetForm, setErrors, setSubmitting, setStatus, props }
  ) {
    console.log(values);

    resetForm();
    props.history.push("/protected");
    setSubmitting(false);

    axios
      .post("https://medcabinets.herokuapp.com/api/auth/login", values)
      .then((res) => {
        console.log("login", res);
        setStatus(res.data);
        props.history.push("/protected");
      })
      .catch((err) => console.log("error", err));
  },
})(Login);

render(<Router><FormikSignIn /></Router>, document.getElementById("root"));

export default FormikSignIn;
