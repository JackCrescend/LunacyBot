const Discord = require('discord.js');

const GC_id = "522571164208332810";

const GC_roles = new Discord.Collection();
GC_roles.set("fabulous", "584286913645510656");
GC_roles.set("axis", "610474668553535489");
GC_roles.set("edgelord", "575741888926187522");
GC_roles.set("potato", "584139153130651765");

module.exports = {
    name: "role",
    alias: [],
    execute(client, message, args) {
        if (args.length < 1) { return; }
        const rolename = args[0].toLowerCase();

        if (message.guild.id === GC_id) {
            if (GC_roles.has(rolename)) {
                const role = GC_roles.get(rolename);
                const member = message.member;
                if (!member) { return; }

                if (member.roles.has(role)) {
                    member.removeRole(role)
                        .then(console.log(`${rolename} removed from ${message.author.username}`))
                        .catch(console.log);
                } else {
                    member.addRole(role)
                        .then(console.log(`${rolename} added to ${message.author.username}`))
                        .catch(console.log);
                }
                message.delete().catch(console.log);
            }
        }
    }
};