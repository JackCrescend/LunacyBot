module.exports = {
	name: "dice",
	description: "Throw a dice, specify dice size in arguments or empty for d20.",
	execute(message, args) {

		let diceSize = 20;

		if (args.length !== 0) {
			const d = Number(args[0]);
			if (isNaN(d)) {
				message.reply(`${args[0]} is not a valid number!`);
				return;
			}
			if (d < 2 || d > 1000) {
				message.reply(`number needs to be between 2 -- 1000`);
				return;
			}
			diceSize = d;
		}

		const result = Math.floor(Math.random() * diceSize) + 1;


		if (diceSize <= 6) {
			message.channel.send(`${message.author} rolls ${result}!`)
		}
		else if (result === 1) {
			message.channel.send(`${message.author} rolls 1. Epic Fail!`);
		}
		else if (result === diceSize) {
			message.channel.send(`${message.author} rolls ${result}! Critical Success!`);
		}
		else if (result <= (diceSize / 2)) {
			message.channel.send(`${message.author} rolls ${result}.`);
		}
		else {
			message.channel.send(`${message.author} rolls ${result}!`);
		}

	}
};