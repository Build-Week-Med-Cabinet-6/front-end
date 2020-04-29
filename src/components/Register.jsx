import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import * as Yup from "yup";

import { withFormik, Form, Field } from "formik";
import axios from "axios";
import auth from "./auth";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Login from "./Login";
const SignUp = ({ values, errors, touched, isSubmitting }, props) => (
  <Form>
    <div>
      <p>Register:</p>
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
  </Form>
);
const FormikSignUp = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || "",
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().min(4).required("must be 4+ chars long"),
    password: Yup.string().min(4).required("must be 4+ chars long"),
  }),
  handleSubmit(
    values,
    { resetForm, setErrors, setSubmitting, setStatus, props }
  ) {
    console.log(values);

    resetForm();
    props.history.push("/login");

    setSubmitting(false);

    axios
      .post("https://medcabinets.herokuapp.com/api/auth/register", values)
      .then((res) => {
        console.log("axios", res);
        setStatus(res.data);
      })
      .catch((err) => console.log("error", err));
  },
})(SignUp);

render(<FormikSignUp />, document.getElementById("root"));

export default FormikSignUp;

// https://medcabinets.herokuapp.com/api/auth/register
// https://medcabinets.herokuapp.com/api/auth/login
