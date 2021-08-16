import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import requestText from "./model/RequestText";
import Content from "./pages/Content";

function App() {
  // Store json with rules
  const [textJson, setTextJson] = useState();
  // Rules found from a search query
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  // Request text from server
  useEffect(() => {
    requestText("http://192.168.1.233:5000").then((json) => {
      setTextJson(json);
      setLoading(false);
    });
  }, []);

  // Opens content page with parsed text when it is loaded.
  useEffect(
    () =>
      history.push({ pathname: "/", state: { text: textJson } }),
    [textJson]
  );

  // Search bar input handler
  function searchOnChangeHandler(e) {
    setSearchResult([]);
    if (!e.target.value) return;
    search(e.target.value, textJson);

    // Recursion function. Goes through each key and checks if it includes a query string. Saving found rules to useState.
    // It's power intensive. In a real project, it has to be on the server side.
    function search(query, rulesObject) {
      if (!rulesObject || Object.keys(rulesObject).length < 1) return;

      Object.entries(rulesObject).forEach((subrulesObject) => {
        search(query, subrulesObject[1]);
        if (subrulesObject[0].toLowerCase().includes(query.toLowerCase())) {
          setSearchResult((prev) => [...prev, subrulesObject[0]]);
        }
      });
    }
  }

  if (loading) return <h1>Loading text, please wait...</h1>;

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={searchOnChangeHandler}
        />
      </div>
      {searchResult.length > 0 ? (
        searchResult.map((object) => {
          console.log(searchResult.length)
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
