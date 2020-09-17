const { ClientUser } = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
  name: "help",
  alias: ["instructions", "halp", "hep"],
  parameters: ["[command name] = Optional, get more info for a specific command"],
  info: "Lists out all bot commands, or tells more about a particular command",
  execute(client, message, args) {
    if (args.length > 1) {
      message.reply("Help only takes one parameter");
      return;
    }
    if (args.length === 1) {
      const commandName = args[0].toLowerCase();
      if (!client.commands.has(commandName)) {
        message.reply("Command with that name or alias was not found.");
        return;
      }

      const command = client.commands.get(commandName);
      let response = `Command: **${prefix}${command.name}**`;
      for (alt of command.alias) {
        response +=  `, ${prefix}${alt}`;
      }

      response += "\n\n";

      if (command.parameters.length > 0) {
        response += "**parameters**\n";
        for (parameter of command.parameters) {
          response += `${parameter}\n`;
        }

        response += "\n";
      }

      response += command.info;

      message.channel.send(response);
      return;
    }

    // No arguments, give full list

    let response = "**Full list of commands:**\n";
    response += client.commandList.join(", ");
    response += "\n\n";
    response += `Get more info about each command by typing ${prefix}help [command name]\n`;
    response += "Many commands also work in DM's to test / play around with!"; 
    
    message.channel.send(response);
    return;
  }
}