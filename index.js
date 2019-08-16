const fs = require('fs');
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.emotes = new Discord.Collection();

client.once('ready', () => {

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        for (alias of command.alias) {
            client.commands.set(alias, command);
        }
    }

    let loadEmotes = client.commands.get("loademotes");
    loadEmotes.execute(client);

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

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) { return; }
    const command = client.commands.get(commandName);

    try {
        command.execute(client, message, args);    
    } catch (e) {
        console.log(e);
        message.reply('An error occurred running the command!');
    }
});

client.login(token);