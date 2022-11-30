import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import Sections from "./Sections";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import useHttp from "../../hooks/use-http";


const Technologies = (props) => {
  // const technologies = props.program.technologies;
  const { sendGetRequest: getMethod } = useHttp();
  const [technologies, setTechnologies] = useState([]);
  const urlPath = useRouteMatch();
  const [data, setData] = useState(<Sections technology=""></Sections>);

  useEffect(() => {
    const userObj = {
      userID: localStorage.getItem("userID"),
      programId: localStorage.getItem("programId")
    };
    getMethod({ url: "/userData/getTechnologies", obj: userObj }, (data) => {
      setTechnologies(data.programs[0].technologies);
    });
  }, [getMethod]);

  const startLearningHandler = (technology) => {
    localStorage.setItem('technologyId', technology.technologyId)
    setData(<Sections technology={technology}></Sections>);
  };

  return (
    <>
      <Switch>
        <Route exact path={`${urlPath.url}`}>
          <div>
            <Card>
              <CardBody>
                <CardTitle tag="h5">MEAN Stack</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  List of Technologies
                </CardSubtitle>

                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Sl.No</th>
                      <th>Technologies</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technologies!==undefined && technologies.map((technology, index) => (
                      <tr key={index} className="border-top">
                        <td>{index + 1}.</td>
                        <td>
                          <div className="d-flex p-2 align-items-center">
                            <div className="ms-3">
                              {index !== 0 &&
                              technologies[index - 1].status ===
                                "Not Completed" ? (
                                <div
                                  style={{
                                    cursor: "not-allowed",
                                    }}
                                >
                                  <h5 className="mb-0">
                                    {technology.technologyName}
                                  </h5>
                                </div>
                              ) : (
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "#26c6da",
                                  }}
                                  to={`${urlPath.url}/${technology.technologyName}`}
                                  onClick={() =>
                                    startLearningHandler(technology)
                                  }
                                >
                                  {" "}
                                  <h5 className="mb-0">
                                    {technology.technologyName}
                                  </h5>
                                </Link>
                              )}

                              <span className="text-muted">
                                {technology.description}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              technology.status === "Not Completed"
                                ? "text-bg-danger"
                                : "text-bg-success"
                            }`}
                          >
                            {technology.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Route>
        <Route path={`${urlPath.url}/:technology`}>
          {data}
        </Route>
      </Switch>
    </>
  );
};

export default Technologies;
