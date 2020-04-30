import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import * as Yup from "yup";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

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
  <Form>
    <div>
      <p>Login:</p>
      <Field
        type="text"
        name="username"
        placeholder="Username"
        className="fields"
      />
      {touched.username && errors.username && <p>{errors.username}</p>}
    </div>

    <div>
      <Field
        type="password"
        name="password"
        placeholder="Password"
        className="fields"
      />
      {touched.password && errors.password && <p>{errors.password}</p>}
    </div>

    <button
      disabled={isSubmitting}
      onClick={() => {
        auth.login(() => {});
      }}
    >
      Submit
    </button>
    <Link to="/register">Register</Link>
  </Form>
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
