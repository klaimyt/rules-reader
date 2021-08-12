import { createContext, useState } from "react";

const DataContext = createContext({
  setParsedData: () => {},
  setPlainText: () => {},
  parsedData: Map,
  plainText: String
});

export function DataContextProvider(props) {
  const [parsedData, setParsedData] = useState();
  const [plainText, setPlainText] = useState()

  const context = {
    setParsedData: setParsedData,
    setPlainText: setPlainText,
    parsedData: parsedData,
    plainText: plainText
  };

  return (
    <DataContext.Provider value={context}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
