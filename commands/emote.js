const { prefix } = require("../config.json");

module.exports = {
  name: "emote",
  alias: [],
  parameters: [],
  info: `Post singular emotes with the bot by starting with ${prefix} and then emote name. Capitalization doesn't matter, check ${prefix}emotelist for full list`,
  execute(client, message, args) {
    // Placeholder, this file only meant as an info page about using single emote commands
    return;
  }
}