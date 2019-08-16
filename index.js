const fs = require('fs');
const token = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.emotes = new Discord.Collection();

client.once('ready', () => {

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    console.log('Ready!');
});

client.login(token);