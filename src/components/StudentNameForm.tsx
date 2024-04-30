import React from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

interface Props {
  studentName: string;
  setStudentName: Function;
  handleAddStudent: Function;
}

const StudentNameForm: React.FC<Props> = ({
  studentName,
  setStudentName,
  handleAddStudent,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Student Name</Form.Label>
      <Row>
        <Col>
          <Form.Control
            type="text"
            size="sm"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </Col>
        <Col>
          <ButtonGroup>
            <Button
              size="sm"
              variant={"outline-primary"}
              onClick={() => handleAddStudent()}
            >
              Add New Student
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Form.Group>
  );
};

export default StudentNameForm;
