module.exports = {
	name: "flip",
	description: "Random coin toss",
	execute(message, args) {

		const rand = Math.floor(Math.random() * 2);
		let result = "Heads!";
		if (rand === 1) {
			result = "Tails!";
		}
		message.reply(result);

	}
};