import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import AuthContext from "./store/auth-context";
import NavBar from "./components/UI/NavBar";
const App = () => {
  const authCtx = useContext(AuthContext);
  const userRole = localStorage.getItem("userRole");
  return (
    <>
      {authCtx.isLoggedIn && <NavBar></NavBar>}
      <Switch>
        <Route path="/login" exact>
          {!authCtx.isLoggedIn ? (
            <Login></Login>
          ) : userRole === "admin" ? (
            <Redirect to="/users" />
          ) : (
            <Redirect to="/programs" />
          )}
        </Route>
        <Route path="/register" exact>
          {!authCtx.isLoggedIn ? (
            <Register></Register>
          ) : userRole === "admin" ? (
            <Redirect to="/users" />
          ) : (
            <Redirect to="/programs" />
          )}
        </Route>
        <Route exact path="/">
          {authCtx.isLoggedIn ? (
            userRole === "admin" ? (
              <Redirect to="/users" />
            ) : (
              <Redirect to="/programs" />
            )
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="*">
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
      </Switch>
    </>
  );
};

export default App;
