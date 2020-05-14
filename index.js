const { prefix, token } = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {

    const reload = require(`./commands/reload.js`);
    reload.execute(client);

    console.log('Ready!');
});

client.on('message', message => {
    if (message.author.bot) { return; }
    if (message.channel.type === "dm") {
        console.log(`${message.author.username}: ${message.content}`);
        return;
    }
    if (message.channel.type !== "text") { return; }
    if (!message.content.startsWith(prefix)) { return; }

    console.log(`${message.author.username}: ${message.content}`);
    setTimeout(() => message.delete().catch(console.log), 2000);

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) { return; }
    const command = client.commands.get(commandName);

    try {
        command.execute(client, message, args);
    } catch (e) {
        console.log(e);
    }
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

// Kept for testing purposes
//client.on('raw', async event => {
    //console.log(event);
//});

client.login(token);