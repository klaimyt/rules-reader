export default function requestText(fileUrl) {
  // I'm not sure is it okay to use a solution like this to get data. In real project I would use separate back-end server to handle data.
  // Thanks to https://github.com/Freeboard/thingproxy
  return fetch(`https://thingproxy.freeboard.io/fetch/${fileUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "text/html",
    },
  })
    .then((response) => {
      return response.text()
    })
    .catch((err) => err);
}
