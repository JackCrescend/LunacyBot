const { prefix } = require("../config.json");
let roleData = require("../roleconfig.json");
const fs = require("fs");

const roleEditPermission = 0x000000020;

module.exports = {
  name: "rolesetup",
  alias: [],
  hidden: true,
  parameters: [],
  info: `Moderator only command, prepares a given role to be controlled by the bot. After setup, ${prefix}role lets users to toggle the role for themselves.`,
  execute(client, message, args) {
    if (message.channel.type != "text") { return; }

    const sender = message.guild.members.cache.get(message.author.id);
    if (!sender.hasPermission(roleEditPermission)) {
      message.reply("Not permitted to use the command.");
      return;
    }

    if (args.length < 1 || args.length > 2) {
      message.reply("give 1-2 parameters for the command, first role name and second optional role nickname");
      return;
    }

    const serverID = message.guild.id;
    let serverIndex = roleData.findIndex((server) => {
      return (server.serverID === serverID);
    });

    if (serverIndex === -1) {
      const newServerEntry = {
        serverID: serverID,
        roles: []
      };
      serverIndex = roleData.length;
      roleData.push(newServerEntry);
    }

    const rolename = args[0];
    const nickname = args[1] ? args[1] : args[0];

    for (role of roleData[serverIndex].roles) {
      if (role.name === nickname) {
        message.reply(`A rolesetup by nickname ${nickname} already exists.`);
        return;
      }
    }

    let roleID;
    for (role of message.guild.roles.cache.values()) {
      if (role.name.toLowerCase().includes(rolename)) {
        roleID = role.id;
        break;
      }
    }
    
    if (!roleID) {
      message.reply(`Couldn't find a role matching name ${args[0]}`);
      return;
    }

    const newRoleSetup = {
      name: nickname,
      id: roleID
    }

    roleData[serverIndex].roles.push(newRoleSetup);

    message.react('👌');

    fs.writeFileSync("./roleconfig.json", JSON.stringify(roleData));
  }
}