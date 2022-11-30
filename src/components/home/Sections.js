import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ChapterContent from "./ChapterContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Assessment from "./Assessment";
import { Card, CardBody, CardTitle } from "reactstrap";
import Rating from "@mui/material/Rating";
import useHttp from "../../hooks/use-http";

let sectionIndex = 0;
let chapterIndex = 0;

const Sections = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState("");
  const [selectedSection, setSelectedSection] = useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [openChapter, setOpenChapter] = useState(false);
  const [Sections, setSections] = useState([]);
  const [chapterData, setChapterData] = useState("");
  const [sectionStatus, setSectionStatus] = useState(true);
  const [reload, setReload] = useState(false);
  const [assessmentData, setAssessmentData] = useState(
    <Assessment section="" reRender ={setReload}></Assessment>
  );
  const history = useHistory();
  const urlPath = useRouteMatch();
  const { sendPostRequest: postMethod, sendGetRequest: getMethod } = useHttp();

  

  useEffect(() => {
    const userObj = {
      userID: localStorage.getItem("userID"),
      programId: localStorage.getItem("programId"),
      technologyId: localStorage.getItem("technologyId"),
    };
    getMethod({ url: "/userData/getSections", obj: userObj }, (data) => {
      data.programs[0].technologies.forEach(elem=>{
        if(elem.technologyId===localStorage.getItem("technologyId")){
          setSections(elem.sections);
        }
      })
    });
  }, [reload,getMethod]);

  const handleChange = (panel, sIndex) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setSectionStatus(true);
    setSelectedSection(sIndex);
  };

  const handleListItemClick = (sectionIndex, chapterIndex) => {
    setSelectedIndex(chapterIndex);
    setChapterData(Sections[sectionIndex].chapters[chapterIndex]);
    setSectionStatus(false);
    setOpenChapter(true);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event, sIndex, cIndex) => {
    if (event.target.checked) {
      setOpen(true);
      sectionIndex = sIndex;
      chapterIndex = cIndex;
    }
  };

  const handleOk = () => {
    setOpen(false);
    let arr = [...Sections];
    arr[sectionIndex].chapters[chapterIndex].status = "Completed";
    let notCompleted = arr[sectionIndex].chapters.some(
      (chapter) => chapter.status === "Not Completed"
    );
    if (!notCompleted) {
      arr[sectionIndex].status = "Assessment Pending";
    }
    let userObj = {
      id: localStorage.getItem("userID"),
      programId: localStorage.getItem("programId"),
      technologyId: localStorage.getItem("technologyId"),
      sections: arr,
    };
    postMethod(
      { url: "/userData/updateSectionStatus", obj: userObj },
      (data) => {
        setSections(arr);
      }
    );
  };

  const takeAssessmentHandler = (event, sIndex) => {
    console.log(Sections[sIndex]);
    setReload(false);
    setAssessmentData(<Assessment section={Sections[sIndex]} reRender ={setReload}></Assessment>);
    history.push(`${urlPath.url}/assessment`);
  };

  return (
    <>
      <Switch>
        <Route exact path={urlPath.url}>
          {Sections.length !== 0 && (
            <div>
              <div className="row">
                <div className="col-sm-4">
                  {Sections.map((section, sectionIndex) => (
                    <div key={section.sectionId}>
                      <Accordion
                        expanded={expanded === section.sectionId}
                        onChange={handleChange(section.sectionId, sectionIndex)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                          sx={{ backgroundColor: "#eeeeee" }}
                        >
                          <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            Section {sectionIndex + 1}:
                          </Typography>
                          <Typography sx={{ color: "text.secondary" }}>
                            {section.sectionName}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            {section.chapters.length !== 0 &&
                              section.chapters.map((chapter, chapterIndex) => {
                                const labelId = `checkbox-list-label-${chapter.chapterId}`;

                                return (
                                  <ListItem
                                    key={chapter.chapterId}
                                    secondaryAction={
                                      <IconButton
                                        edge="end"
                                        aria-label="comments"
                                      ></IconButton>
                                    }
                                    disablePadding
                                  >
                                    <ListItemButton
                                      selected={selectedIndex === chapterIndex}
                                      onClick={(event) =>
                                        handleListItemClick(
                                          sectionIndex,
                                          chapterIndex
                                        )
                                      }
                                      role={undefined}
                                      dense
                                    >
                                      <ListItemIcon>
                                        <Checkbox
                                          edge="start"
                                          tabIndex={-1}
                                          disableRipple
                                          inputProps={{
                                            "aria-labelledby": labelId,
                                          }}
                                          checked={
                                            chapter.status !== "Not Completed"
                                          }
                                          disabled={
                                            selectedIndex !== chapterIndex
                                          }
                                          onChange={(event) =>
                                            handleStatusChange(
                                              event,
                                              sectionIndex,
                                              chapterIndex
                                            )
                                          }
                                        />
                                      </ListItemIcon>
                                      <ListItemText
                                        id={labelId}
                                        primary={`Chapter ${
                                          chapterIndex + 1
                                        }: ${chapter.chapterName}`}
                                      />
                                    </ListItemButton>
                                  </ListItem>
                                );
                              })}
                          </List>
                          {section.status === "Assessment Pending" ? (
                            <div className="d-flex justify-content-center">
                              <button
                                className="btn btn-primary"
                                onClick={(event) =>
                                  takeAssessmentHandler(event, sectionIndex)
                                }
                              >
                                Take Assesment
                              </button>
                            </div>
                          ) : (
                            section.status === "Not Completed" && (
                              <p className="text-warning">
                                Complete all chapters to take assesment
                              </p>
                            )
                          )}
                        </AccordionDetails>
                      </Accordion>
                      <br />
                    </div>
                  ))}
                </div>
                {openChapter && !sectionStatus ? (
                  <div className="col-sm-8">
                    <ChapterContent content={chapterData}></ChapterContent>
                  </div>
                ) : (
                  <div className="col-sm-8">
                    <Card>
                      <CardTitle
                        tag="h6"
                        className="border-bottom p-3 mb-0 text-center"
                      >
                        <i className="bi bi-files me-2"> </i>
                        <b>
                          Section {Sections[selectedSection].sectionId}:&nbsp;
                        </b>{" "}
                        {Sections[selectedSection].sectionName}
                      </CardTitle>
                      <CardBody className="p-4">
                        <b>Status:&nbsp;</b>{" "}
                        <span
                          className={`badge ${
                            Sections[selectedSection].status === "Not Completed"
                              ? "text-bg-danger"
                              : Sections[selectedSection].status ===
                                  "Review Pending" ||
                                Sections[selectedSection].status ===
                                  "Assessment Pending"
                              ? "text-bg-warning"
                              : "text-bg-success"
                          }`}
                        >
                          {Sections[selectedSection].status}
                        </span>
                        <hr />
                        {Sections[selectedSection].status ===
                        "Review Pending" ? (
                          <p className="text-danger">
                            Score will be updated once the solution is Reviewed
                            by the Mentor
                          </p>
                        ) : (
                          Sections[selectedSection].status === "Completed" && (
                            <Rating
                              name="read-only"
                              value={Sections[selectedSection].rating}
                              readOnly
                            />
                          )
                        )}
                      </CardBody>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          )}

          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to mark this chapter as completed?
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
        <Route path={`${urlPath.url}/assessment`}>{assessmentData}</Route>
      </Switch>
    </>
  );
};

export default Sections;
