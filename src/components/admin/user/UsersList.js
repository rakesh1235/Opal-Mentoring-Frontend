import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user from "../../../assets/images/users/user2.jpg";
import Button from "@mui/material/Button";
import PlusIcon from "@mui/icons-material/Add";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import { Switch, useHistory, Route } from "react-router-dom";
import CreateUser from "./CreateUser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import AlertContext from "../../../store/alert-context";
import EditUser from './EditUser'


let userIndex = 0;
const UsersList = () => {
  const { sendGetRequest: getMethod } = useHttp();
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const [reload, setReload] = useState(false);
  const alertCtx = useContext(AlertContext);
  const [editUserData, setEditUserData] = useState(
    <EditUser userData={{}} reRender={setReload}></EditUser>
  );


  useEffect(() => {
    getMethod({ url: "/admin/getUsers", obj: {} }, (data) => {
      setTableData(data);
    });
  }, [reload,getMethod]);

  const createNewUserHandler = () => {
    setReload(false);
    history.push("/users/createUser");
  };

  const editUserHandler = (event, index) => {
    setReload(false);
    setEditUserData(<EditUser userData={tableData[index]} reRender={setReload}></EditUser>);
    history.push("/users/editUser");
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  

  const deleteUserHandler = (event, index) => {
    userIndex = index;
    setOpen(true);
  };

  const handleOk = () => {
    let user = tableData[userIndex];
    getMethod({ url: "/admin/deleteUser", obj: user }, (res) => {
      getMethod({ url: "/admin/getUsers", obj: {} }, (data) => {
        setTableData(data);
        setOpen(false);
        alertCtx.setAlert("success", "Successfully Removed the User");
      });
    });
  };

  

  return (
    <>
      <Switch>
        <Route exact path="/users">
          <div>
            <Card>
              <CardBody>
                <div className="row">
                  <div className="col-10">
                    <CardTitle tag="h5">Users</CardTitle>
                  </div>
                  <div className="col-2">
                    <Button
                      variant="contained"
                      startIcon={<PlusIcon />}
                      onClick={createNewUserHandler}
                    >
                      Create User
                    </Button>
                  </div>
                </div>

                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Programs</th>

                      <th>Mentor</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((tdata, index) => (
                      <tr key={index} className="border-top">
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <img
                              src={user}
                              className="rounded-circle"
                              alt="avatar"
                              width="45"
                              height="45"
                            />
                            <div className="ms-3">
                              <h6 className="mb-0">{`${tdata.firstName} ${tdata.lastName}`}</h6>
                              <span className="text-muted">{tdata.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>{tdata.programList}</td>
                        <td>{tdata.mentor}</td>
                        <td>
                        <EditIcon
                            color="secondary"
                            style={{ cursor: "pointer" }}
                            onClick={(event) => editUserHandler(event, index)}
                          />{" "}
                          &nbsp;&nbsp;{" "}
                          <DeleteIcon
                            style={{ cursor: "pointer" }}
                            onClick={(event) => deleteUserHandler(event, index)}
                            color="red"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the User?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleOk} autoFocus>
                I'm Sure
              </Button>
            </DialogActions>
          </Dialog>
        </Route>
        <Route exact path="/users/createUser">
          <CreateUser reRender={setReload}></CreateUser>
        </Route>
        <Route exact path="/users/editUser">
          {editUserData}
        </Route>
      </Switch>
    </>
  );
};

export default UsersList;
