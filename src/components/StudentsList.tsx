import React from "react";

import { Student } from "../types/types";

import { Table } from "react-bootstrap";

interface Props {
  students: Student[];
  loadStudent: Function;
  deleteStudent: Function;
  saveIndex: number | null;
}

const StudentsList: React.FC<Props> = ({
  students,
  loadStudent,
  deleteStudent,
  saveIndex,
}) => {
  return (
    <div>
      <h1>Students</h1>
      {students.length > 0 ? (
        <Table hover borderless>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} style={{ cursor: "pointer" }}>
                <td style={{ width: "25px" }}>{index + 1}</td>
                <td
                  onClick={() => loadStudent(index)}
                  className={`fs-6 text-primary ${
                    saveIndex === index ? "fw-bold" : ""
                  }`}
                >
                  {student.name}
                </td>
                {students.length > 1 && (
                  <td
                    style={{ width: "10px" }}
                    onClick={() => deleteStudent(index)}
                  >
                    X
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <i>Saved students will be visible here</i>
      )}
    </div>
  );
};

export default StudentsList;
