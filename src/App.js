import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import AuthContext from "./store/auth-context";
import NavBar from "./components/home/NavBar";
const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      {authCtx.isLoggedIn && <NavBar></NavBar>}
      <Switch>
        <Route path="/login" exact>
          {!authCtx.isLoggedIn ? <Login></Login> : <Redirect to="/" />}
        </Route>
        <Route path="/register" exact>
          {!authCtx.isLoggedIn ? <Register></Register> : <Redirect to="/" />}
        </Route>
        <Route path='*'>
          {!authCtx.isLoggedIn && <Redirect to="/login"/>}
        </Route>
      </Switch>
    </>
  );
};

export default App;
