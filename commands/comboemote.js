module.exports = {
    name: "emote",
    alias: ["e"],
    execute(client, message, args) {
        let response = `${message.author.username}:`;

        for (word of args) {
            const lowercase = word.toLowerCase();
            if (client.emotes.has(lowercase)) {
                response += " " + client.emotes.get(lowercase);
            } else {
                response += " " + word;
            }
        }

        message.channel.send(response);

        message.delete().catch();
    }
};
