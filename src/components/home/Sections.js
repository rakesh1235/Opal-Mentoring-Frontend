import React, { useState } from "react";
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

let sectionIndex = 0;
  let chapterIndex = 0;

const Sections = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [openChapter, setOpenChapter] = useState(false);
  const [Sections, setSections] = useState(props.technology.sections);
  const [chapterData, setChapterData] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleListItemClick = (sectionIndex, chapterIndex) => {
    setSelectedIndex(chapterIndex);
    setChapterData(Sections[sectionIndex].chapters[chapterIndex]);
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
      arr[sectionIndex].status = "Completed";
    }
    setSections(arr);
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-sm-4">
            {Sections.map((section, sectionIndex) => (
              <div key={section.sectionId}>
                <Accordion
                  expanded={expanded === section.sectionId}
                  onChange={handleChange(section.sectionId)}
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
                                    inputProps={{ "aria-labelledby": labelId }}
                                    checked={chapter.status !== "Not Completed"}
                                    disabled = {selectedIndex !== chapterIndex}
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
                                  primary={`Chapter ${chapterIndex + 1}: ${
                                    chapter.chapterName
                                  }`}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                    </List>
                    {section.status !== "Not Completed" ? (
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-primary">
                          Take Assesment
                        </button>
                      </div>
                    ) : (
                      <p className="text-warning">
                        Complete all chapters to take assesment
                      </p>
                    )}
                  </AccordionDetails>
                </Accordion>
                <br />
              </div>
            ))}
          </div>
          {openChapter && (
            <div className="col-sm-8">
              <ChapterContent content={chapterData}></ChapterContent>
            </div>
          )}
        </div>
      </div>
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
    </>
  );
};

export default Sections;
