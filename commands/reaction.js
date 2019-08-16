module.exports = {
    name: "react",
    alias: ["r"],
    execute(client, message, args) {
        if (args.length < 1 || args.length > 2) { return; }

        const emote = args[0].toLowerCase();
        if (!client.emotes.has(emote)) { return; }

        let offset = 2;
        if (args.length === 2) {
            if (isNaN(args[1])) { return; }
            offset = (parseInt(args[1]) + 1);
        }

        const user = message.author.username;
        const messages = message.channel.messages.last(offset);

        if (messages.length < offset) {
            message.reply("Bot cannot reply to messages that are older than when Bot was last rebooted, sorry!");
            message.delete().catch();
            return;
        }

        messages[0].react(client.emotes.get(emote)).catch(console.log);
        message.delete().catch(console.log);

        return;
    }
};