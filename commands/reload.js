const fs = require('fs');
const Discord = require('discord.js');

const adminPermission = 0x00000008;

module.exports =  {
    name: "reload",
    alias: [],
    hidden: true,
    parameters: [],
    info: "Reloads emotes without needing a bot restart. Also attempts to update commands (buggy)",
    execute(client, message, args) {
        if (message) {
            if (message.channel.type !== "text") { return; }
            const sender = message.guild.members.cache.get(message.author.id);
            if (!sender.hasPermission(adminPermission)) {
                message.reply("Lacking permission to use command.");
                return;
            }
        }

        client.commands = new Discord.Collection();
        client.commandList = new Array();
        client.emotes = new Discord.Collection();
        client.comboemotes = new Discord.Collection();
        
        for (guild of client.guilds.cache.values()) {
            if (!guild.available) { continue; }

            for (emoji of guild.emojis.cache.values()) {

                const command = {};

                command.name = emoji.name.toLowerCase();

                if (emoji.animated) {
                    command.content = `<a:${emoji.name}:${emoji.id}>`;
                } else {
                    command.content = `<:${emoji.name}:${emoji.id}>`;
                }

                command.execute = (client, message, args) => {
                    message.channel.send(command.content);
                    if (message.channel.type === "text") {
                        setTimeout(() => message.delete().catch(console.log), 2000);
                    }
                };

                client.commands.set(command.name, command);
                client.emotes.set(command.name, emoji);
                client.comboemotes.set(command.name, command.content);
            }
        }

        console.log("Emotes loaded!")

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (file of commandFiles) {
            const command = require(`./${file}`);
            client.commands.set(command.name, command);
            if (!command.hidden) {
                client.commandList.push(command.name);
            }
            for (alias of command.alias) {
                client.commands.set(alias, command);
            }
        }

        console.log("Commands loaded!");
    }
};