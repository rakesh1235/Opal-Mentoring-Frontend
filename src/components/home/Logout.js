import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: "#dd2c00",
    }
  },
});

const Logout = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  // const colorCtx = useContext(ColorContext)

  const logoutHandler = () => {
    authCtx.logout();
    history.push("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="d-flex m-2">
      
        <Button onClick={logoutHandler}><Avatar sx={{ bgcolor: deepOrange[500] }}>{localStorage.getItem('userName').charAt(0)}</Avatar></Button>
        {/* <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button> */}
        ;
      </div>
    </ThemeProvider>
  );
};

export default Logout;
