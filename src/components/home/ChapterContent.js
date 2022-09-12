import React from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import './Chapter.module.css'

const ChapterContent = (props) => {
  return (
    <>
      <Card className="vh-100">
        <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center">
          <i className="bi bi-journal-check me-2"> </i>
          <b>Chapter {props.content.chapterId}: </b> {props.content.chapterName}
        </CardTitle>
        <CardBody className="p-4">
          <Row justify-content>
            <Col>
              {props.content.chapterContent === undefined ? (
                <div className="mt-5 d-flex justify-content-center">
                  <h3>No Data Found</h3>
                </div>
              ) : (
                <pre>{props.content.chapterContent}</pre>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default ChapterContent;
