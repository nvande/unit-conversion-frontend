import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StudentsList from "./StudentsList";

describe("StudentsList Component", () => {
  const mockLoadStudent = jest.fn();
  const mockDeleteStudent = jest.fn();
  const students = [
    { name: "Alice", index: 0 },
    { name: "Bob", index: 1 },
    { name: "Charlie", index: 2 },
  ];

  it("renders without crashing", () => {
    render(
      <StudentsList
        students={[]}
        loadStudent={mockLoadStudent}
        deleteStudent={mockDeleteStudent}
        saveIndex={null}
      />
    );
    expect(
      screen.getByText(/Saved students will be visible here/i)
    ).toBeInTheDocument();
  });

  it("displays a list of students", () => {
    render(
      <StudentsList
        students={students}
        loadStudent={mockLoadStudent}
        deleteStudent={mockDeleteStudent}
        saveIndex={null}
      />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("calls loadStudent when a student name is clicked", () => {
    render(
      <StudentsList
        students={students}
        loadStudent={mockLoadStudent}
        deleteStudent={mockDeleteStudent}
        saveIndex={null}
      />
    );
    fireEvent.click(screen.getByText("Alice"));
    expect(mockLoadStudent).toHaveBeenCalledWith(0);
  });

  it("calls deleteStudent when delete is clicked and there is more than one student", () => {
    render(
      <StudentsList
        students={students}
        loadStudent={mockLoadStudent}
        deleteStudent={mockDeleteStudent}
        saveIndex={null}
      />
    );
    fireEvent.click(screen.getAllByText("X")[0]);
    expect(mockDeleteStudent).toHaveBeenCalledWith(0);
  });

  it("highlights the currently selected student", () => {
    render(
      <StudentsList
        students={students}
        loadStudent={mockLoadStudent}
        deleteStudent={mockDeleteStudent}
        saveIndex={0}
      />
    );
    const firstStudent = screen.getByText("Alice");
    expect(firstStudent).toHaveClass("fw-bold");
  });

  it("does not show delete button when only one student exists", () => {
    const singleStudent = [{ name: "Alice", index: 0 }];
    render(
      <StudentsList
        students={singleStudent}
        loadStudent={mockLoadStudent}
        deleteStudent={mockDeleteStudent}
        saveIndex={0}
      />
    );
    expect(screen.queryByText("X")).toBeNull();
  });
});
