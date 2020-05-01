import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import * as Yup from "yup";

import { withFormik, Form, Field } from "formik";
import axios from "axios";
import auth from "./auth";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button } from 'reactstrap';
import Wrapper from './Wrapper';
import FormErrorAlert from './FormErrorAlert';
const SignUp = ({ values, errors, touched, isSubmitting }, props) => (
  <Wrapper top>
    <Form>
      <FormErrorAlert render={errors.username} errorMessage={errors.username}/>
      <FormErrorAlert render={errors.password && touched.password} errorMessage={errors.password}/>
      <div>
        <h2 className="h1">Register</h2>
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
    </Form>
  </Wrapper>
);
const FormikSignUp = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || "",
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup
      .string()
      .min(4, "username must be at least 4 characters")
      .required("username is required"),
    password: Yup
      .string()
      .min(4, "password must be at least 4 characters")
      .required("password is required"),
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
