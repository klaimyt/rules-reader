export default function requestText(fileUrl) {
  // I'm not sure is it okay to use solution like this to get data. In real project I would use separate back-end to process data.
  // Thanks to https://github.com/Freeboard/thingproxy
  return fetch(`https://thingproxy.freeboard.io/fetch/${fileUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  })
    .then((response) => response.text())
    .catch((err) => err);
}
