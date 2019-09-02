module.exports = {
    name: "emote",
    alias: ["e", "emotecombo", "comboemote"],
    execute(client, message, args) {
        let response = "";

        const first_emoji = '\u{1F300}';
        const last_emoji = '\u{1F5FF}';

        for (word of args) {
            const lowercase = word.toLowerCase();
            if (client.comboemotes.has(lowercase)) {
                response += " " + client.comboemotes.get(lowercase);
            } else if (word >= first_emoji && word <= last_emoji) {
                response += " " + word;
            }
        }

        if (response === "") { return; }
        message.channel.send(response);

        message.delete().catch(console.log);
    }
};
