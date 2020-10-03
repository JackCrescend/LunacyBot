let roleData = require("../roleconfig.json");
const fs = require("fs");

const roleEditPermission = 0x000000020;

module.exports = {
  name: "removerolesetup",
  alias: [],
  hidden: true,
  parameters: [],
  info: `Moderator only command, removes old role setup`,
  execute(client, message, args) {
    if (message.channel.type != "text") { return; }

    const sender = message.guild.members.cache.get(message.author.id);
    if (!sender.hasPermission(roleEditPermission)) {
      message.reply("Not permitted to use the command.");
      return;
    }

    const serverData = roleData.find(server => server.serverID === message.guild.id);
    if (!serverData) {
      message.reply("Server has no configured roles.");
      return;
    }

    const rolename = args[0];
    const roleIndex = serverData.roles.findIndex(role => role.name === rolename);
    if (roleIndex === -1) {
      message.reply(`Setting for role ${rolename} not found.`);
      return;
    }

    serverData.roles.splice(roleIndex, 1);
    
    message.react("👌");
  }
}