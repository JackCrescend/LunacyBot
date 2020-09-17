const { prefix } = require("../config.json");

module.exports = {
  name: "help",
  alias: ["instructions", "halp", "hep"],
  parameters: ["[command name] = Optional, get more info for a specific command"],
  info: "Lists out all bot commands, or tells more about a particular command",
  execute(client, message, args) {
    // TODO
  }
}