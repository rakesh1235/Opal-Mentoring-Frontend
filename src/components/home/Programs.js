import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import useHttp from "../../hooks/use-http";
import { useState } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Technologies from "./Technologies";

const Programs = () => {
  const { sendGetRequest: getMethod } = useHttp();
  const [programs, setPrograms] = useState([]);
  const history = useHistory();
  const [data, setData] = useState(<Technologies program=""></Technologies>);

  useEffect(() => {
    const userObj = {
      userID: localStorage.getItem("userID"),
    };
    getMethod({ url: "/userData/getPrograms", obj: userObj }, (data) => {
      setPrograms(data);
    });
  }, [getMethod]);

  const startLearningHandler = (program) => {
    setData(<Technologies program={program}></Technologies>);
    history.push(`/programs/${program.programName}`);
  };

  const StyledCard = styled(Grid)`
    ${({ theme }) => `
  cursor: pointer;
  transition: ${theme.transitions.create(["transform"], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    transform: scale(1.1);
  }
  `}
  `;
  return (
    <>
      <Switch>
        <Route exact path="/programs">
          {programs.length !== 0 ? (
            <div className="container ">
              <div className="row">
                {programs.map((program) => (
                  <div className="col-sm" key={program.programId}>
                    <StyledCard>
                      <div
                        className="card"
                        onClick={() => startLearningHandler(program)}
                      >
                        <img
                          src={program.image}
                          className="card-img-top"
                          alt="..."
                          style={{ height: "150px" }}
                        ></img>
                        <div className="card-body">
                          <h3 className="card-title text-center">
                            {program.programName}
                          </h3>
                          <hr />
                          <p className="card-text">{program.programText}</p>
                          <Button color="primary">Start Learning</Button>
                        </div>
                      </div>
                    </StyledCard>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{color:'red'}}>No Programs Found</div>
          )}
        </Route>
        <Route path="/programs/:program">{data}</Route>
      </Switch>
    </>
  );
};

export default Programs;
