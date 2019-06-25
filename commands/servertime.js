module.exports = {
	name: "servertime",
	description: "Returns GC in-game time",
	aliases: ["time"],
	cooldown: 10,
	execute(message, args) {

		var d =  new Date();
    d.setTime(d.getTime() - 3600000);
		message.channel.send(`GrandChase Server Time: ${d.toLocaleTimeString()}`);
		
	}
};