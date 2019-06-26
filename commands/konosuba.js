module.exports = {
	name: "konosuba",
	description: "Konosuba dance",
	execute(message, args) {
        const text = "<a:AquaDance:584657222844547072><a:KazumaDance:584657222513065996><a:MeguminDance:584657223708311556><a:DarknessDance:584657224539045888>";
        message.channel.send(text);
        message.delete()
            .then(console.log(`Konosuba posted by ${message.author.username}`))
            .catch(console.log);
    }
};