import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./Chapter.module.css";
import Rating from "@mui/material/Rating";

const SectionContent = (props) => {
  return (
    <>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center">
          <i className="bi bi-files me-2"> </i>
          <b>Section {props.content.sectionId}:&nbsp;</b>{" "}
          {props.content.sectionName}
        </CardTitle>
        <CardBody className="p-4">
          <div>
            Status:{" "}
            <span
              className={`badge ${
                props.content.status === "Not Completed"
                  ? "text-bg-danger"
                  : props.content.status === "In-Progress"
                  ? "text-bg-warning"
                  : props.content.status === "Assessment Pending"
                  ? "text-bg-info"
                  : props.content.status === "Review Pending"
                  ? "text-bg-info"
                  : "text-bg-success"
              }`}
            >
              {props.content.status}
            </span>
          </div>
          <br />
          {props.content.status === "Not Completed" ||
            (props.content.status === "In-Progress" && (
              <p>Complete All Chapters to take Assessment</p>
            ))}

          <hr />
          {props.content.status === 'Completed' && (
            <>
              <div className="row">
                <div className="col-sm-8">
                  Score :&nbsp;{props.content.score}
                </div>
                <div className="col-sm-4">
                  Ratings :{" "}
                  <Rating
                    name="read-only"
                    value={props.content.rating}
                    readOnly
                  />
                </div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default SectionContent;
