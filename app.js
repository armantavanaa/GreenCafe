const express = require("express");
const app = express();

app.get("/", function (request, response) {
  response.send("hello arman");
});

app.listen(3000);
console.log("Server is ready.");
