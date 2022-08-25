import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const { sendPostRequest: postMethod } = useHttp();
  const history = useHistory();

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

    postMethod({ url: "/auth/login", obj: userObj }, (data) => {
      if (data.error) {
        alert(data.error)
      } else {
        authCtx.login(data.authtoken);
        alert("Login Success")
        history.push('/');

      }
    });
    resetEmail();
    resetPassword();
  };

  const emailClasses = emailHasError
    ? "form-control is-invalid"
    : "form-control";

  const passwordClasses = passwordHasError
    ? "form-control is-invalid"
    : "form-control";
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-6">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row">
                  <div className="d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Logo</span>
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
                            type="submit"
                          >
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
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
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
