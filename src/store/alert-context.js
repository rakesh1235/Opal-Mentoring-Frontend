import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AlertContext = React.createContext({
  setAlert: (severity, msg) => {},
});

export const AlertContextProvider = (props) => {
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msg, setMsg] = useState("");
  const vertical = "bottom";
  const horizontal = "right";

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
  });

  const setAlertHandler = (severity, msg) => {
    setAlert(true);
    setSeverity(severity);
    setMsg(msg);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const contextValue = {
    setAlert: setAlertHandler,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {props.children}
      <>
        <Snackbar
          open={alert}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            severity={severity}
            onClose={handleClose}
            sx={{ width: "100%",
                    marginBottom:'5rem' }}
          >
            {msg}
          </Alert>
        </Snackbar>
      </>
    </AlertContext.Provider>
  );
};

export default AlertContext;
