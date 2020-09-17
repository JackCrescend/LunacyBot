module.exports = {
    name: "emote",
    alias: ["e", "c", "combo", "comboemote"],
    execute(client, message, args) {
        let response = "";
        
        for (word of args) {
            const lowercase = word.toLowerCase();
            if (client.comboemotes.has(lowercase)) {
                response += " " + client.comboemotes.get(lowercase);
            } else {
                response += " " + word;
            }
        }

        if (response === "") { return; }
        message.channel.send(response);

        if (message.channel.type === "text") {
            setTimeout(() => message.delete().catch(console.log), 2000);
        }
    }
};
