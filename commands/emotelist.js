module.exports = {
    name: "emotelist",
    alias: [],
    execute(client, message, args) {
        for (guild of client.guilds.values()) {
            let response1 = "**" + guild.name + "**\n";
            let response2 = "**" + guild.name + " animated**\n";

            let animated = false;

            for (emoji of guild.emojis.values()) {
                if (emoji.animated) {
                    animated = true;
                    response2 += `<a:${emoji.name}:${emoji.id}>`;
                } else {
                    response1 += `<:${emoji.name}:${emoji.id}>`;
                }
            }

            message.channel.send(response1);
            if (animated) {
                message.channel.send(response2);
            }
        }

        message.delete().catch(console.log);
    }
};