module.exports = {
    name: "emote",
    alias: ["e", "emotecombo", "comboemote"],
    execute(client, message, args) {
        let response = "";

        for (word of args) {
            const lowercase = word.toLowerCase();
            if (client.comboemotes.has(lowercase)) {
                response += " " + client.comboemotes.get(lowercase);
            }
        }

        if (response === "") { return; }
        message.channel.send(response);

        message.delete().catch(console.log);
    }
};
