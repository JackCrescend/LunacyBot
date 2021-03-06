module.exports = {
    name: "emotelist",
    alias: [],
    hidden: false,
    parameters: [],
    info: "Posts all emotes from every server the bot is on. Prepare for spam!",
    execute(client, message, args) {
        let timeoutMultiplier = 0;
        for (guildData of client.guilds.cache) {
            guild = guildData[1];            

            let emojis = `**${guild.name}** emojis\n`;
            let animatedEmojis = "animated emojis\n";

            let emojiCount = 0;
            let animatedCount = 0;

            for (emoji of guild.emojis.cache.values()) {
                if (emoji.animated) {
                    animatedCount += 1;
                    animatedEmojis += `<a:${emoji.name}:${emoji.id}>`;
                    if (animatedCount % 10 === 0) { animatedEmojis += "\n"; }
                } else {
                    emojiCount += 1;
                    emojis += `<:${emoji.name}:${emoji.id}>`;
                    if (emojiCount % 10 === 0) { emojis += "\n"; }
                }
            }

            setTimeout(() => {
                message.channel.send(emojis);
                if (animatedCount > 0) {
                    message.channel.send(animatedEmojis);
                }
            }, 2000 * timeoutMultiplier);
            timeoutMultiplier += 1;
        }

        if (message.channel.type === "text") {
            setTimeout(() => message.delete().catch(console.log), 2000);
        }
    }
};