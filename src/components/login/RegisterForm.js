import React from "react";
import { Link, useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const re =
  /^(?=.*)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&?]{5,20}$/;
const password = (value) => re.test(value);

const RegisterForm = (props) => {

  const {
    sendPostRequest: postMethod,
  } = useHttp();

  const history = useHistory();

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

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
  } = useInput(password);

  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    passValid: checkPass,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    passConfirmHandler: checkPassHandler,
    reset: resetConfirmPassword,
  } = useInput(password);

  let formIsValid = false;
  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    checkPass
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const userObj = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: passwordValue,
    };

    postMethod({ url: "/auth/createuser", obj: userObj }, (data) => {
      if(data.error){
        alert(data.error)
      }
      else{
      alert("User Registered Successfully.")
        history.push('/');
      }
    });

    resetFirstName();
    resetLastName();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
  };

  const firstNameClasses = firstNameHasError
    ? "form-control is-invalid"
    : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control is-invalid"
    : "form-control";
  const emailClasses = emailHasError
    ? "form-control is-invalid"
    : "form-control";

  const passwordClasses = passwordHasError
    ? "form-control is-invalid"
    : "form-control";

  const confirmPasswordClasses =
    confirmPasswordHasError || !checkPass
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
                          Create your account here
                        </h5>

                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label
                              htmlFor="validationServer01"
                              className="form-label"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              className={firstNameClasses}
                              id="validationServer01"
                              value={firstNameValue}
                              onChange={firstNameChangeHandler}
                              onBlur={firstNameBlurHandler}
                            />
                            <div className="invalid-feedback">Enter valid name</div>
                          </div>

                          <div className="col-md-6">
                            <label
                              htmlFor="validationServer02"
                              className="form-label"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              className={lastNameClasses}
                              id="validationServer02"
                              value={lastNameValue}
                              onChange={lastNameChangeHandler}
                              onBlur={lastNameBlurHandler}
                            />
                            <div className="invalid-feedback">Enter valid name</div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-10">
                            <label
                              htmlFor="validationServerUsername"
                              className="form-label"
                            >
                              Email
                            </label>
                            <div className="input-group has-validation">
                              <input
                                type="text"
                                className={emailClasses}
                                id="validationServerUsername"
                                aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                                value={emailValue}
                                onChange={emailChangeHandler}
                                onBlur={emailBlurHandler}
                              />
                              <div className="invalid-feedback">Enter valid email</div>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-10">
                            <label
                              htmlFor="validationServerPassword"
                              className="form-label"
                            >
                              Enter Password
                            </label>
                            <div className="input-group has-validation">
                              <input
                                type="password"
                                className={passwordClasses}
                                id="validationServerPassword"
                                aria-describedby="inputGroupPrepend3 validationServerPasswordFeedback"
                                value={passwordValue}
                                onChange={passwordChangeHandler}
                                onBlur={passwordBlurHandler}
                              />
                              <div className="invalid-feedback">Password should contain atleast 5 characters and should contain atleast one special character, one number, one uppercase letter and one lowecase letter.</div>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-10">
                            <label
                              htmlFor="validationServerConfirmPass"
                              className="form-label"
                            >
                              Re-Enter Password
                            </label>
                            <div className="input-group has-validation">
                              <input
                                type="password"
                                className={confirmPasswordClasses}
                                id="validationServerConfirmPass"
                                aria-describedby="inputGroupPrepend3 validationServerPasswordFeedback"
                                value={confirmPasswordValue}
                                onChange={(event) => {
                                  confirmPasswordChangeHandler(event);
                                  checkPassHandler(event, passwordValue);
                                }}
                                onBlur={confirmPasswordBlurHandler}
                              />
                              <div className="invalid-feedback">Password did not match</div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                            disabled={!formIsValid}
                          >
                            Register
                          </button>
                        </div>

                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Already have an account?{" "}
                          <Link to="/" style={{ color: "#393f81" }}>
                            Login here
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

export default RegisterForm;
