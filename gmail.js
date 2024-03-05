const { google } = require("googleapis");

exports.Gmail = class Gmail {
  #gmail;
  constructor(auth) {
    this.#gmail = google.gmail({ version: "v1", auth: auth });
  }

  // private methods
  #getValueMessageFromHeader(message, key) {
    return message.data.payload.headers.find((header) => header.name === key)
      .value;
  }
  async #transferInMessageObj(messageId) {
    let message = await this.getMessageById(messageId);
    return {
      from: this.#getValueMessageFromHeader(message, "From"),
      to: this.#getValueMessageFromHeader(message, "To"),
      subject: this.#getValueMessageFromHeader(message, "Subject"),
      Date: this.#getValueMessageFromHeader(message, "Date"),
      Body: message.data.snippet,
      id: messageId,
    };
  }
  // public methods
  // get message by id
  getMessageById(id) {
    return this.#gmail.users.messages.get({
      userId: "me",
      id: id,
    });
  }

  usersHistory(historyId) {
    return this.#gmail.users.history.list({
      userId: "me",
      startHistoryId: historyId,
    });
  }
  // get message detail from hisroty id
  async getMessageFromHistory(id) {
    try {
      const response = await this.usersHistory(id);
      let messages = [];
      if (response.data.history) {
        let messagesAdded = response.data.history
          .map((history) => history.messages)
          .flat();
        for (const messageAdded of messagesAdded) {
          try {
            messages.push(await this.#transferInMessageObj(messageAdded.id));
          } catch (error) {
            console.log("error in ", messageAdded.id);
            throw error;
          }
        }
      } else {
        console.log("no message found");
      }
      return messages;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // get messages
  getMessages() {
    return this.#gmail.users.messages.list({ userId: "me" });
  }
  // get messages from specoific id
  async getMessageFromEmail(email) {
    let messages = [];

    try {
      let fetchedMessages = await this.#gmail.users.messages.list({
        userId: "me",
        q: `from:${email}`,
      });
      for (const messageAdded of fetchedMessages.data.messages) {
        try {
          messages.push(await this.#transferInMessageObj(messageAdded.id));
        } catch (error) {
          console.log("error in ", messageAdded.id);
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
    return messages;
  }
};
