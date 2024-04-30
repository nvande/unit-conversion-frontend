import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Row, Col, Button, ButtonGroup } from "react-bootstrap";

import ConversionRow from "./ConversionRow";
import StudentListComponent from "./StudentsList";
import StudentNameForm from "./StudentNameForm";

import {
  ConversionItem,
  TemperatureUnit,
  VolumeUnit,
  Unit,
  Student,
} from "../types/types";

const InitialRows: ConversionItem[] = [
  {
    inputValue: "",
    inputUnit: TemperatureUnit.Celsius,
    targetUnit: TemperatureUnit.Fahrenheit,
    studentAnswer: "",
    correctAnswer: "",
    gradeStatus: "",
    response: "",
  },
];

const API_URL = process.env.REACT_APP_API_URL;

const ConversionTable = () => {
  const [rows, setRows] = useState<ConversionItem[]>(InitialRows);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [savedTemplate, setSavedTemplate] = useState<ConversionItem[] | null>(
    null
  );
  const [saveIndex, setSaveIndex] = useState<number | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (hasChanged) {
      updateStudentData();
    }
  }, [rows, studentName]);

  const updateStudentData = () => {
    if (saveIndex !== null) {
      const updatedStudents = students.map((student, index) =>
        index === saveIndex
          ? { ...student, rows: rows, name: studentName || "Unnamed Student" }
          : student
      );
      setStudents(updatedStudents);
    } else {
      handleSaveStudent();
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof ConversionItem,
    value: string
  ) => {
    const newRows = rows.map((row, idx) => {
      if (idx === index) {
        return { ...row, [field]: value };
      }
      return row;
    });

    if (field === "inputValue") {
      const newErrors = [...errors];
      newErrors[index] = "";
      setErrors(newErrors);
    }
    setHasChanged(true);
    setRows(newRows);
  };

  const handleAddRow = () => {
    setHasChanged(true);
    setRows([...rows, InitialRows[0]]);
  };

  const handleDeleteRow = (index: number) => {
    setHasChanged(true);
    const newRows = rows.filter((_, idx) => idx !== index);
    setRows(newRows);
  };

  const validateInputValues = (): boolean => {
    const newErrors = rows.map((row) => {
      return row.inputValue.trim() === "" || isNaN(Number(row.inputValue))
        ? "Invalid input value"
        : "";
    });
    setErrors(newErrors);

    return newErrors.every((error) => error === "");
  };

  const sanitizeRows = (rows: ConversionItem[]): Partial<ConversionItem>[] => {
    return rows.map((row) => {
      const { correctAnswer, gradeStatus, response, ...restOfRow } = row;
      const sanitizedRow: Partial<ConversionItem> = {};

      Object.entries(restOfRow).forEach(([key, value]) => {
        if (value !== "") {
          if (key === "inputUnit" || key === "targetUnit") {
            sanitizedRow[key as "inputUnit" | "targetUnit"] = isValidUnit(value)
              ? (value as Unit)
              : undefined;
          } else {
            sanitizedRow[
              key as keyof Omit<
                ConversionItem,
                | "inputUnit"
                | "targetUnit"
                | "correctAnswer"
                | "gradeStatus"
                | "response"
              >
            ] = value;
          }
        }
      });

      return sanitizedRow;
    });
  };

  function isValidUnit(value: string): value is Unit {
    return (
      Object.values(TemperatureUnit).includes(value as TemperatureUnit) ||
      Object.values(VolumeUnit).includes(value as VolumeUnit)
    );
  }

  const clearResults = () => {
    setRows(
      rows.map((row) => ({
        ...row,
        correctAnswer: "",
        gradeStatus: "",
      }))
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    clearResults();
    const sanitizedRows = sanitizeRows(rows);

    try {
      if (validateInputValues() && API_URL !== undefined) {
        const response = await axios.post(
          `${API_URL}/convert`,
          sanitizedRows,
          {
            withCredentials: false,
          }
        );

        if (response.data && Array.isArray(response.data)) {
          const updatedRows = response.data.map((result, index) => ({
            ...rows[index],
            correctAnswer: result.convertedValue,
            gradeStatus: result.gradeStatus,
          }));
          setRows(updatedRows);
        }
      }
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const prepareTemplate = (rows: ConversionItem[]): ConversionItem[] => {
    return rows.map((row) => ({
      ...row,
      correctAnswer: "",
      gradeStatus: "",
      response: "",
      studentAnswer: "",
    }));
  };

  const handleSaveTemplate = () => {
    setSavedTemplate(prepareTemplate(rows));
  };

  const handleLoadTemplate = () => {
    if (savedTemplate != null) {
      setRows(savedTemplate);
    }
  };

  const deleteStudent = (index: number) => {
    const filteredStudents = students.filter(
      (_student, studentIndex) => index !== studentIndex
    );

    if (saveIndex === index) {
      if (filteredStudents.length > 0) {
        if (index < filteredStudents.length) {
          loadStudent(index);
        } else {
          loadStudent(0);
        }
      } else {
        setRows(InitialRows);
        setStudentName("");
        setSaveIndex(null);
      }
    } else if (saveIndex !== null && saveIndex > index) {
      setSaveIndex(saveIndex - 1);
    }

    setStudents(filteredStudents);
  };

  const handleSaveStudent = () => {
    if (saveIndex === null) {
      const newStudent: Student = {
        name: studentName || "Unnamed Student",
        rows: rows,
      };
      setStudents([...students, newStudent]);
      setSaveIndex(students.length);
    } else {
      const updatedStudents = students.map((student, index) =>
        index === saveIndex
          ? { ...student, name: studentName, rows: rows }
          : student
      );
      setStudents(updatedStudents);
    }
  };

  const handleAddStudent = () => {
    setStudentName("");
    if(savedTemplate) {
        setRows(prepareTemplate(savedTemplate));
    } else {
        setRows(prepareTemplate(rows))
    }
    setSaveIndex(null);
    setHasChanged(true);
  };

  const handleStudentName = (name:string) => {
    setHasChanged(true);
    setStudentName(name);
  }

  const loadStudent = (index: number) => {
    const student = students[index];
    if (student) {
      setRows(student.rows);
      setStudentName(student.name);
      setSaveIndex(index);
    }
  };

  return (
    <div>
      <Row>
        <Col xs={12} xxl={10}>
          <StudentNameForm
            studentName={studentName}
            setStudentName={handleStudentName}
            handleAddStudent={handleAddStudent}
          />
          <ButtonGroup className="float-end mt-5 mb-1">
            <Button
              size="sm"
              variant={"outline-primary"}
              onClick={handleSaveTemplate}
            >
              Save Template
            </Button>
            <Button
              size="sm"
              onClick={handleLoadTemplate}
              disabled={savedTemplate === null}
            >
              Load Template
            </Button>
          </ButtonGroup>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Input Value</th>
                <th>Input Unit</th>
                <th>Target Unit</th>
                <th>Student Answer</th>
                <th>Correct Answer</th>
                <th>Correctness</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <ConversionRow
                  key={index}
                  index={index}
                  row={row}
                  error={errors[index]}
                  handleInputChange={handleInputChange}
                  handleDeleteRow={handleDeleteRow}
                  disabledDelete={rows.length < 2}
                />
              ))}
            </tbody>
          </Table>
          <div className="mt-4">
            <Button onClick={handleAddRow} className="float-start">
              Add Question
            </Button>
            <Button
              onClick={handleSubmit}
              variant={"success"}
              className="float-end"
            >
              {!loading ? `Grade Answers` : `Loading`}
            </Button>
          </div>
        </Col>
        <Col className="mt-5 mt-xl-0">
          <StudentListComponent
            students={students}
            saveIndex={saveIndex}
            loadStudent={(index: number) => loadStudent(index)}
            deleteStudent={(index: number) => deleteStudent(index)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ConversionTable;
