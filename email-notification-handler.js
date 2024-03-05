const { Gmail } = require("./gmail");
module.exports = function (auth) {
  /**
   * handle google mail notification
   * @param {import('express').Request} req : express request object.
   * @param {import('express').Response} res : express response object.
   * @param {import('express').NextFunction} next : express next fucntion.
   * @returns {void} : return
   */
  return async function (req, res, next) {
    const gmail = new Gmail(auth);
    try {
      const data = req.body.message.data;
      const decodedData = Buffer.from(data, "base64").toString();
      const notification = JSON.parse(decodedData);
      console.log("Received notification:", notification);
      // next();
      // const { historyId } = notification;
      let messages = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            resolve(await gmail.getMessageFromEmail(notification.emailAddress));
          } catch (error) {
            console.error("messages not found", error);
            reject(error);
          }
        }, 1000 * 15);
      });

      // console.log(messages);
      next();
    } catch (error) {
      console.error("invalid request", error);
      return res.sendStatus(400);
      // return res.sendStatus(200);
    }
  };
};
