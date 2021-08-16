const express = require("express");
const {requestText} = require('./Model/textHandler')

const app = express();

// Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  // Global variable from ./Model/textHandler.js
  res.send(globalTextJson)
});

app.use(express.json());

app.listen(5000, () => {
  console.log("Server started on port 5000")
  requestText("https://media.wizards.com/2021/downloads/MagicCompRules%2020210712.txt")
});
