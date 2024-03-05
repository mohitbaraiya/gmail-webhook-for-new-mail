const express = require("express");
const bodyParser = require("body-parser");
const emailNotificationHandler = require("./email-notification-handler");
let authorize = require("./google-auth");

// express setup
const app = express();
app.use(bodyParser.json());

(async () => {
  let googleAuth = await authorize();
  // console.log(googleAuth);
  app.post(
    "/notifications",
    emailNotificationHandler(googleAuth),
    async (_, res) => res.sendStatus(200)
  );
  app.listen(3000, function () {
    console.log("server started on 3000");
  });
})();

// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
