import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UsersList from "./UsersList";
import useHttp from "../../../hooks/use-http";
import { Form } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import AlertContext from "../../../store/alert-context";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, programName, theme) {
  return {
    fontWeight:
      programName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const EditUser = (props) => {
  const { sendPostRequest: postMethod, sendGetRequest: getMethod } = useHttp();
  const alertCtx = useContext(AlertContext);
  console.log(props.userData);
  const history = useHistory();
  const [programsList, setProgramsList] = useState([]);
  const [mentor, setMentor] = React.useState(props.userData.mentor);
  let arr1 = [];
  props.userData.programs.forEach((program) => {
    arr1.push(program.programName);
  });

  const [programName, setprogramName] = React.useState(arr1);

  useEffect(() => {
    getMethod({ url: "/admin/getPrograms", obj: {} }, (data) => {
      setProgramsList(data);
    });
  }, [getMethod]);

  const theme = useTheme();

  const handleProgramsChange = (event) => {
    const {
      target: { value },
    } = event;
    setprogramName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleMentorChange = (event) => {
    setMentor(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let programs = [];
    programName.forEach(e=>{
        programsList.forEach(program=>{
            if(e===program.program.programName){
                programs.push(program.program);
            }
        })
    })
    let updateObj ={
        programs: programs,
        mentor: mentor,
        userId: props.userData._id,
        programList: programName.toString(),
    }
    postMethod({ url: "/admin/updateUser", obj: updateObj }, (data) => {
        alertCtx.setAlert("success", "User Registered Successfully.");
        props.reRender(true);
          history.push("/users");
      });
  };

  return (
    <>
      <section>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row">
                  <div className="d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span className="h1 fw-bold mb-0">Edit User</span>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-12">
                            User Name
                            <Form.Control
                              type="text"
                              value={props.userData.firstName}
                              aria-label="Disabled input example"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          Last name
                          <Form.Control
                            type="text"
                            value={props.userData.lastName}
                            aria-label="Disabled input example"
                            disabled
                          />
                        </div>
                        <br></br>
                        <div>
                          <FormControl fullWidth>
                            <InputLabel id="multiple-chip-label">
                              Programs
                            </InputLabel>
                            <Select
                              labelId="multiple-chip-label"
                              id="multiple-chip"
                              multiple
                              value={programName}
                              onChange={handleProgramsChange}
                              input={
                                <OutlinedInput
                                  id="select-multiple-chip"
                                  label="Programs"
                                />
                              }
                              renderValue={(selected) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                            >
                              {programsList.map((name) => (
                                <MenuItem
                                  key={name.program.programName}
                                  value={name.program.programName}
                                  style={getStyles(
                                    name.program.programName,
                                    programName,
                                    theme
                                  )}
                                >
                                  {name.program.programName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <br></br>
                        <div>
                          <FormControl fullWidth>
                            <InputLabel id="simple-select-label">
                              Mentor
                            </InputLabel>
                            <Select
                              labelId="simple-select-label"
                              id="simple-select"
                              value={mentor}
                              //value=""
                              label="Mentor"
                              onChange={handleMentorChange}
                            >
                              <MenuItem value="Ranganath">Ranganath</MenuItem>
                              <MenuItem value="Rakesh">Rakesh</MenuItem>
                              <MenuItem value="Ravi">Ravi</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <br></br>
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Submit
                        </button>
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

export default EditUser;
