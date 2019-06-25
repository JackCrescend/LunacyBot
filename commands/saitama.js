module.exports = {
	name: "saitama-animated",
	description: "Emote combination of Saitama + OK",
	execute(message, args) {
        const text = "<a:SaitamaGif:593083507660816395><:OK:593083489998602270>";
        message.channel.send(text);
        message.delete()
            .then(console.log(`Saitama-animated posted by ${message.author.username}`))
            .catch(console.log);
    }
};