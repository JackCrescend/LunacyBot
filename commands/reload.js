const fs = require('fs');
const Discord = require('discord.js');

module.exports =  {
    name: "reload",
    alias: [],
    execute(client) {
        client.commands = new Discord.Collection();
        client.emotes = new Discord.Collection();
        client.comboemotes = new Discord.Collection();

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (file of commandFiles) {
            const command = require(`./${file}`);
            client.commands.set(command.name, command);
            for (alias of command.alias) {
                client.commands.set(alias, command);
            }
        }
        
        for (guild of client.guilds.values()) {
            for (emoji of guild.emojis.values()) {

                const command = {};

                command.name = emoji.name.toLowerCase();

                if (emoji.animated) {
                    command.content = `<a:${emoji.name}:${emoji.id}>`;
                } else {
                    command.content = `<:${emoji.name}:${emoji.id}>`;
                }

                command.execute = (client, message, args) => {
                    message.channel.send(command.content);
                    message.delete()
                        .catch(console.log);
                };

                client.commands.set(command.name, command);

                client.emotes.set(command.name, emoji);
                client.comboemotes.set(command.name, command.content);
            }
        }

        console.log("Emotes loaded!");
    }
};