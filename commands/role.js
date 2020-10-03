let roleData = require("../roleconfig.json");

module.exports = {
    name: "role",
    alias: ["toggle"],
    hidden: false,
    parameters: ["[role name] = the name / alias of the role"],
    info: "Toggles the given role on / off as per user request",
    execute(client, message, args) {
        if (message.channel.type !== "text") {
            message.reply("Role commands only work within the discord server!");
            return;
        }
        if (args.length != 1) { return; }
        const rolename = args[0];

        const serverData = roleData.find(server => server.serverID === message.guild.id);
        if (!serverData) {
            message.reply(`No toggle-able roles defined for this server.`);
            return;
        }

        const role = serverData.roles.find(role => role.name === rolename);
        if (!role) {
            message.reply(`Can't find or not allowed to toggle role ${args[0]}.`);
            return;
        }

        const member = message.member;
        if (member.roles.cache.has(role.id)) {
            member.roles.remove(role.id)
                .catch(console.log);
        } else {
            member.roles.add(role.id)
                .catch(console.log);
        }

        /* 
        if (serverRoles) {
            const available_roles = guilds_roles.get(message.guild.id);
            if (available_roles.has(rolename)) {
                const role = available_roles.get(rolename);
                const member = message.member;
                if (!member) { return; }

                if (member.roles.cache.has(role)) {
                    member.roles.remove(role)
                        .then(console.log(`${rolename} removed from ${message.author.username}`))
                        .catch(console.log);
                } else {
                    member.roles.add(role)
                        .then(console.log(`${rolename} added to ${message.author.username}`))
                        .catch(console.log);
                }
            }
        }
        */

        message.react("👌");
        setTimeout(() => message.delete().catch(console.log), 2000);
    }
};