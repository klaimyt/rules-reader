import { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import requestText from "./model/RequestText";
import parsingText from "./model/ParsingText";
import DataContext from "./store/data-context";
import Content from "./pages/Content";

function App() {
  // Store rules text
  const dataContext = useContext(DataContext);
  // Rules found from a search query
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  // Request text
  useEffect(() => {
    requestText(
      "https://media.wizards.com/2021/downloads/MagicCompRules%2020210609.txt"
    ).then((text) => {
      dataContext.setPlainText(text);
      // Parsing and saving text to context
      dataContext.setParsedText(parsingText(text));
      setLoading(false);
    });
  }, []);

  // Pushes page with parsed text.
  useEffect(
    () =>
      history.push({ pathname: "/", state: { text: dataContext.parsedText } }),
    [dataContext.parsedText]
  );

  // Search bar input handler
  function searchOnChangeHandler(e) {
    if (!e.target.value) {
      setSearchResult(null);
      return;
    }
    // Creates regExp from query
    const userInput = escapeRegExp(e.target.value);
    const searchRegExp = new RegExp(
      String.raw`(?<=(\r\n){2}).*${userInput}.*(?=(\r\n){2})`,
      "gi"
    );
    // Set founded rules to State.
    setSearchResult(dataContext.plainText.match(searchRegExp));

    // Copied from MDN RegExp documentation
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  }

  if (loading) return <h1>Loading and processing data, please wait...</h1>

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={searchOnChangeHandler}
        />
      </div>
      {searchResult ? (
        searchResult.map((object) => {
          return <p>{object}</p>;
        })
      ) : (
        <Switch>
          <Route path="/" component={Content} />
        </Switch>
      )}
    </div>
  );
}

export default App;
