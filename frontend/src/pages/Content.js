import { useHistory } from "react-router-dom";

const Content = (props) => {
  const history = useHistory()

  // Opens the clicked page
  function clickHandler(cellData) {
    if (cellData[1].size < 1) return
    history.push({pathname: '/', state: {text: cellData[1]}})
  }

  function showTextWith(titles) {
    if (!titles) return null;
    // Creates array of [titleText, subtitleMap]
    return Array.from(titles).map((title) => {
      return (
        <div>
          <p>{title[0]}</p>
          <ul>
          {Array.from(title[1]).map((subtitle) => {
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
    return <div>{showTextWith(props.location.state.text)}</div>;
  }

  return <div>Loading...</div>
};

export default Content;
