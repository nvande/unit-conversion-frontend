import React from "react";

import ConversionTable from "../components/ConversionTable";

import { Container } from "react-bootstrap";

const ConversionPage: React.FC = () => {
  return (
    <div style={style}>
      <Container>
        <header className="mt-5">
          <h1>Unit Conversion</h1>
        </header>
        <main className="mt-3">
          <ConversionTable />
        </main>
      </Container>
    </div>
  );
};

const style: React.CSSProperties = {
  fontFamily:
    "system, -apple-system, BlinkMacSystemFont, Helvetica Neue, Lucida Grande",
  fontSize: "12px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

export default ConversionPage;
