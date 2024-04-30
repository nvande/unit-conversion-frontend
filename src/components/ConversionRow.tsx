import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ConversionItem, GradeStatus, unitOptions, unitNames } from "../types/types";

interface Props {
  index: number;
  row: ConversionItem;
  error: string;
  handleInputChange: Function;
  handleDeleteRow: Function;
  disabledDelete: boolean;
}

const getRowColor = (text: GradeStatus): string => {
  switch (text) {
    case "correct":
      return "text-success";
    case "incorrect":
      return "text-danger";
    case "invalid":
      return "text-muted";
    default:
      return "";
  }
};

const ConversionRow: React.FC<Props> = ({
  index,
  row,
  error,
  handleInputChange,
  handleDeleteRow,
  disabledDelete,
}) => {
  return (
    <tr key={index}>
      <td style={{ width: "8rem" }}>
        <Form.Control
          type="text"
          value={row.inputValue}
          onChange={(e) =>
            handleInputChange(index, "inputValue", e.target.value)
          }
          isInvalid={!!error}
        />
      </td>
      <td>
        <Form.Select
          value={row.inputUnit}
          onChange={(e) =>
            handleInputChange(index, "inputUnit", e.target.value)
          }
          className="fs-6"
        >
          {Object.values(unitOptions).map((unit) => (
            <option key={unit} value={unit}>
              {unitNames[unit]}
            </option>
          ))}
        </Form.Select>
      </td>
      <td>
        <Form.Select
          value={row.targetUnit}
          onChange={(e) =>
            handleInputChange(index, "targetUnit", e.target.value)
          }
        >
          {Object.values(unitOptions).map((unit) => (
            <option key={unit} value={unit}>
              {unitNames[unit]}
            </option>
          ))}
        </Form.Select>
      </td>
      <td  style={{ width: "8rem" }}>
        <Form.Control
          type="text"
          value={row.studentAnswer}
          onChange={(e) =>
            handleInputChange(index, "studentAnswer", e.target.value)
          }
        />
      </td>
      <td  style={{ width: "8rem" }}>
        <Form.Control type="text" value={row.correctAnswer} disabled />
      </td>
      <td style={{ width: "8rem" }}>
        <Form.Control
          type="text"
          value={row.gradeStatus}
          className={getRowColor(row.gradeStatus)}
          disabled
        />
      </td>
      <td style={{ width: "5rem" }}>
        <Button
          variant="danger"
          onClick={() => handleDeleteRow(index)}
          disabled={disabledDelete}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ConversionRow;
