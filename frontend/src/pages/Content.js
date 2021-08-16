import { useHistory } from "react-router-dom";

const Content = (props) => {
  const history = useHistory()

  // Opens the clicked page
  function clickHandler(cellData) {
    if ((cellData[1].size < 1) || Object.keys(cellData[1]).length === 0) return
    history.push({ pathname: '/', state: {text: cellData[1] }})
  }

  function renderPageFrom(titlesJson) {
    if (!titlesJson) return null;
    // Creates array of [titleText, subtitleJSON] and parsing it to html
    return Object.entries(titlesJson).map((title) => {
      return (
        <div>
          <p>{title[0]}</p>
          <ul>
          {Object.entries(title[1]).map((subtitle) => {
            return (
              <li
                onClick={() => {
                  clickHandler(subtitle);
                }}
              >
                {subtitle[0]}
              </li>
            );
          })}
          </ul>
        </div>
      );
    });
  }

  if (props.location.state) {
    return <div>{renderPageFrom(props.location.state.text)}</div>;
  }

  return <div>Loading...</div>
};

export default Content;
