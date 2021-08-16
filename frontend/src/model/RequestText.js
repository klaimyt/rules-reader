export default function requestText(fileUrl) {
  return fetch(fileUrl, {
    method: "GET",
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => err);
}
