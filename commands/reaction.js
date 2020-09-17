module.exports = {
    name: "react",
    alias: ["r", "reaction"],
    hidden: false,
    parameters: [
        "[emote name] = The emote you want the bot to react with",
        "[message number] = Optional, Specify which message to reply to. Count from bottom, default is 1 and reacts to the latest message"
    ],
    info: "Allows you to add a reaction to a message with any of the bots emotes, both normal or animated",
    execute(client, message, args) {
        if (args.length < 1 || args.length > 2) { return; }

        const emote = args[0].toLowerCase();
        if (!client.emotes.has(emote)) { return; }

        let offset = 2;
        if (args.length === 2) {
            if (isNaN(args[1])) { return; }
            offset = (parseInt(args[1]) + 1);
        }

        const messages = message.channel.messages.cache.last(offset);

        if (messages.length < offset) {
            message.reply("Bot can't reply to messages older than when Bot was rebooted, sorry!");
            return;
        }
        
        messages[0].react(client.emotes.get(emote)).catch(console.log);

        if (message.channel.type === "text") {
            setTimeout(() => message.delete().catch(console.log), 2000);
        }
    }
};