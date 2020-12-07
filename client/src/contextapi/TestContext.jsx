import React, { useState, createContext } from "react";

export const TestContext = createContext();

export const TestProvider = (props) => {
  const [selectedTest, setSelectedTest] = useState();
  return (
    <TestContext.Provider value={[selectedTest, setSelectedTest]}>
      {props.children}
    </TestContext.Provider>
  );
};
