const Discord = require('discord.js');

const guilds_roles = new Map();

const GC_id = "522571164208332810";
const GC_roles = new Map();
GC_roles.set("fabulous", "584286913645510656");
GC_roles.set("axis", "610474668553535489");
GC_roles.set("edgelord", "575741888926187522");
GC_roles.set("potato", "584139153130651765");
GC_roles.set("apple",'626533388844793856');
guilds_roles.set(GC_id, GC_roles);

const lounge_id = "674290040486232065";
const lounge_roles = new Map();
lounge_roles.set("green", "674347563062788109");
lounge_roles.set("gray", "674291144859058215");
lounge_roles.set("black", "674351017537568794");
lounge_roles.set("white", "674351204758716446");
lounge_roles.set("blue", "674290040486232065");
lounge_roles.set("purple", "674349448050245653");
lounge_roles.set("magenta", "674347964436840524");
lounge_roles.set("red", "674346959821078538");
lounge_roles.set("pink", "674347532905742359");
lounge_roles.set("cyan", "674346619545714688");
lounge_roles.set("turquoise", "674290776129273856");
lounge_roles.set("orange", "674346854577733662");
lounge_roles.set("yellow", "674350210159476736");
guilds_roles.set(lounge_id, lounge_roles);

module.exports = {
    name: "role",
    alias: [],
    execute(client, message, args) {
        if (args.length != 1) { return; }
        const rolename = args[0].toLowerCase();

        if (guilds_roles.has(message.guild.id)) {
            const available_roles = guilds_roles.get(message.guild.id);
            if (available_roles.has(rolename)) {
                const role = available_roles.get(rolename);
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