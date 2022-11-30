import React, { useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./Chapter.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useContext } from "react";
import useHttp from "../../hooks/use-http";
import AlertContext from "../../store/alert-context";
import { useHistory, useRouteMatch } from "react-router-dom";

let score = 0;
const Assessment = (props) => {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState(false);
  console.log(props);
  const questions = [...props.section.assessment.questions];
  const alertCtx = useContext(AlertContext);
  const { sendPostRequest: postMethod } = useHttp();
  const urlPath = useRouteMatch();
  const history = useHistory();
  console.log(props.section);

  const submitHandler = (e) => {
    e.preventDefault();
    score = 0;
    setOpen(true);
  };

  const optionsHandler = (e, index) => {
    let labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
      if (labels[i].getAttribute("for") === e.target.id) {
        questions[index].userAnswer = labels[i].innerText;
      }
    }
  };

  const programHandler = (event, index) => {
    questions[index].userAnswer = event.target.value;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    let userObj = {};
    if (props.section.assessment.type === "mcq") {
      questions.map((question) => {
        if (question.answer === question.userAnswer) score++;
      });
      score = (10 / questions.length) * score;
      userObj = {
        id: localStorage.getItem("userID"),
        programId: localStorage.getItem("programId"),
        technologyId: localStorage.getItem("technologyId"),
        sectionId: props.section.sectionId,
        questions: questions,
        score: score,
        ratings: score / 2,
        type: props.section.assessment.type,
      };
    } else {
      userObj = {
        id: localStorage.getItem("userID"),
        programId: localStorage.getItem("programId"),
        technologyId: localStorage.getItem("technologyId"),
        sectionId: props.section.sectionId,
        questions: questions,
        type: props.section.assessment.type,
      };
    }
    postMethod({ url: "/userData/updateScore", obj: userObj }, (data) => {
      alertCtx.setAlert("success", "Submitted Successfully");
      setOpen(false);
      setResult(true);
    });
    console.log(urlPath.path)
    console.log(urlPath.url)
  };

  const backToSectionsHandler = () => {
    props.reRender(true);
    let url = urlPath.path.replace('/assessment','')
    history.push(url);
  };
  return (
    <>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center">
          <i className="bi bi-files me-2"> </i>
          <b>Section {props.section.sectionId}:&nbsp;</b>{" "}
          {props.section.sectionName}
        </CardTitle>
        <CardBody className="p-4">
          {!result ? (
            <form onSubmit={submitHandler}>
              {props.section.assessment.type === "mcq" && (
                <>
                  {questions.map((question, index) => (
                    <div className="row p-4">
                      <div className="col-12">
                        {index + 1}. {question.question}
                      </div>
                      {question.options.map((option, index1) => (
                        <div className="col-5">
                          <div class="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`flexRadioDefault${index}`}
                              id={`flexRadioDefault${index}${index1}`}
                              onChange={(event) => optionsHandler(event, index)}
                            />
                            <label
                              className="form-check-label"
                              for={`flexRadioDefault${index}${index1}`}
                            >
                              {option}
                            </label>
                          </div>
                        </div>
                      ))}
                      <br />
                    </div>
                  ))}
                  <button className="btn btn-primary">Submit</button>
                </>
              )}
              {props.section.assessment.type === "programming" && (
                <>
                  {questions.map((question, index) => (
                    <div className="row p-4">
                      <div className="col-12">
                        {index + 1}. {question.question}
                      </div>
                      <br />
                      <br />
                      <div class="mb-3">
                        <textarea
                          className="form-control"
                          rows="10"
                          onChange={(event) => programHandler(event, index)}
                        ></textarea>
                      </div>
                      <br />
                    </div>
                  ))}
                  <button className="btn btn-primary">Submit</button>
                </>
              )}
            </form>
          ) : (
            <>
              <h3>Your Answers Submitted Successfully!</h3>
              <br />
              {props.section.assessment.type === "mcq" ? (
                <h1>Score: {score}</h1>
              ) : (
                <p className="text-danger">
                  Score will be updated once the solution is Reviewed by the
                  Mentor
                </p>
              )}
              <br />
              <button
                className="btn btn-primary"
                style={{ float: "right" }}
                onClick={backToSectionsHandler}
              >
                Done
              </button>
            </>
          )}
        </CardBody>
      </Card>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to submit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <b> No</b>
          </Button>
          <Button onClick={handleOk} autoFocus>
            <b> I'm Sure</b>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Assessment;
