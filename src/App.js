import { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import requestText from "./model/RequestText";
import parsingText from "./model/ParsingText";
import DataContext from "./Store/data-context";
import Content from "./pages/Content";

function App() {
  const dataContext = useContext(DataContext);
  const [searchResult, setSearchResult] = useState();
  const history = useHistory()

  useEffect(() => {
    // Initial load, parsing and storing rules data

    requestText.then(text => {
      console.log(text)
    })
    // dataContext.setParsedData(parsingText(t))
    // dataContext.setPlainText(t)
  }, []);

  useEffect(() => {
    if (!dataContext.data) return
    const object = Object.fromEntries(dataContext.data)
    const json = JSON.stringify(dataContext.data)
    console.log(json)
    history.push({pathname: '/', state: {data: dataContext.data}})
}, [dataContext.data])

  function searchOnChangeHandler(e) {
    if (!e.target.value) {
      setSearchResult(null)
      return
    }
    const input = escapeRegExp(e.target.value)
    console.log(e)
    const searchRegExp = new RegExp(String.raw`(?<=\n{2}).*${input}.*(?=\n{2})`, 'gi')
    setSearchResult(dataContext.plainText.match(searchRegExp))
    
  }

  // Copied from 
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  

  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Search..." onChange={searchOnChangeHandler}/>
      </div>
      {searchResult ? searchResult.map(object => {
        return <p>{object}</p>
      })
       :
        <Switch>
        <Route path='/' component={Content} />
      </Switch>}
    </div>
  );
}

export default App;
