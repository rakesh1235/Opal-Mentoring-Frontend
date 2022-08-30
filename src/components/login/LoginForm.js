import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import AlertContext from "../../store/alert-context";
import AuthContext from "../../store/auth-context";
import { Spinner } from "reactstrap";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const { sendPostRequest: postMethod } = useHttp();

  const alertCtx = useContext(AlertContext);
  const [loggingIn, setLoggingIn] = useState(false)

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const userObj = {
      email: emailValue,
      password: passwordValue,
    };
    setLoggingIn(true);

    postMethod({ url: "/auth/login", obj: userObj }, (data) => {
      if (data.error) {
        alertCtx.setAlert("error", data.error);
        setLoggingIn(false);
      } else {
        alertCtx.setAlert("success", "Logged in Successfully");
        authCtx.login(data.authtoken);
        localStorage.setItem("userName", data.userName);
        setLoggingIn(false);
        resetEmail();
        resetPassword();
      }
    });
  };

  const emailClasses = emailHasError
    ? "form-control is-invalid"
    : "form-control";

  const passwordClasses = passwordHasError
    ? "form-control is-invalid"
    : "form-control";
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#cfd8dc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-6">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row">
                  <div className="d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span className="h1 fw-bold mb-0">
                            Welcome To Application
                          </span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className={emailClasses}
                            value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className={passwordClasses}
                            value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                          />

                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit" disabled={loggingIn}
                          >
                            {loggingIn &&<Spinner size="sm"/>}
                            Login
                          </button>
                        </div>

                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <Link to="/register" style={{ color: "#393f81" }}>
                            Register here
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
