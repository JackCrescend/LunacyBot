module.exports = {
    name: "remotecontrol",
    alias: ["remote"],
    execute(client, message, args) {
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