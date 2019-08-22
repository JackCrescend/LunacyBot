module.exports = {
    name: "text",
    alias: ["t"],
    execute(client, message, args) {
        let response = `${message.author.username}:`;

        for (word of args) {
            const lowercase = word.toLowerCase();
            if (client.comboemotes.has(lowercase)) {
                response += " " + client.comboemotes.get(lowercase);
            } else {
                response += " " + word;
            }
        }

        message.channel.send(response);

        message.delete().catch(console.log);
    }
};
