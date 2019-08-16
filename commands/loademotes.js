const Discord = require('discord.js');

module.exports =  {
    name: "loademotes",
    alias: ["reload"],
    execute(client) {
        client.emotes = new Discord.Collection();
        
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

                client.emotes.set(command.name, command.content);
            }
        }

        console.log("Emotes loaded!");
    }
};