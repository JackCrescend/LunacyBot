module.exports = {
    name: "remotecontrol",
    alias: ["remote"],
    parameters: [
        "[channel name] = channel name to be posted in, partial match ok",
        "[sentence] = the message the bot will post (similar to message command)"
    ],
    info: "Intended for admin use only, posts a message on another channel within the same server (roleplay as the bot)",
    execute(client, message, args) {
        if (message.channel.type !== "text") { 
            message.reply("Remotecontrol only works from within the discord server!");
            return;
        }
        if (args.length < 2) { return; }
        const targetChannel = args.shift().toLowerCase();

        let response = "";
        for (word of args) {
            const lowercase = word.toLowerCase();
            if (client.comboemotes.has(lowercase)) {
                response += " " + client.comboemotes.get(lowercase);
            } else {
                response += " " + word;
            }
        }

        const channels = message.guild.channels.cache.values();
        for (const channel of channels) {
            if (channel.name.includes(targetChannel)) {
                channel.send(response);
                return;
            }
        }
    }
};