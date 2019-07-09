module.exports = {
	name: "kannamenacing",
	description: "KannaFury + JojoMenacing",
	execute(message, args) {
        const text = "<:JojoMenacing:597852857265553438> <:KannaFury:598159194868285453> <:JojoMenacing:597852857265553438>";
        message.channel.send(text);
        message.delete()
            .then(console.log(`KannaMenacing posted by ${message.author.username}`))
            .catch(console.log);
    }
};