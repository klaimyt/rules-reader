import { createContext, useState } from "react";

// Just for auto-complition
const DataContext = createContext({
  setParsedText: () => {},
  setPlainText: () => {},
  parsedText: Map,
  plainText: String
});

export function DataContextProvider(props) {
  const [parsedText, setParsedText] = useState();
  const [plainText, setPlainText] = useState()

  const context = {
    setParsedText: setParsedText,
    setPlainText: setPlainText,
    parsedText: parsedText,
    plainText: plainText
  };

  return (
    <DataContext.Provider value={context}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
