import { useHistory } from "react-router-dom";

const Content = (props) => {
  const history = useHistory()

  function clickHandler(cellData) {
    if (cellData[1].size < 1) return
    history.push({pathname: '/', state: {data: cellData[1]}})
  }

  function showDataWith(titles) {
    if (!titles) return null;
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
    return <div>{showDataWith(props.location.state.data)}</div>;
  }

  return <div>Loading...</div>
};

export default Content;
