import React from "react";
import { Card, CardTitle, CardBody, CardSubtitle } from "reactstrap";


const Technologies = () => {

  return (
    <>
          <Card style={{width:'50%'}}>
            <CardBody className="text-center mt-4">
              <CardTitle tag="h5">Test Card</CardTitle>
              <CardSubtitle className="text-muted" tag="h6">
                Start Learning
              </CardSubtitle>
              
            </CardBody>
          </Card>
    </>
  );
};

export default Technologies;
