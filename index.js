const fs = require('fs');
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.emotes = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

let commandInfo = `**LunacyBot Commands**\n`;
for (command of client.commands.values()) {
    commandInfo += `\n!${command.name} => ${command.description}`;
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log('Loading Emote commands...');

    for (guild of client.guilds.values()) {

        commandInfo += `\n\n${guild.name} emote commands:`;

        for (emoji of guild.emojis.values()) {
            const command = {};
            command.name = emoji.name.toLowerCase();

            client.emotes.set(command.name, emoji);

            if (emoji.animated) {
                command.content = `<a:${emoji.name}:${emoji.id}>`;
            } else {
                command.content = `<:${emoji.name}:${emoji.id}>`;
            }

            command.execute = (message, args) => {
                
                message.channel.send(command.content);
                message.delete()
                    .then(console.log(`${command.name} posted by ${message.author.username}`))
                    .catch(console.log);

            };
            client.commands.set(command.name, command);

            commandInfo += `\n!${command.name}`;
        }
    }

    const command = {};
    command.name = "commands";
    command.execute = (message, args) => {

        message.author.send(commandInfo)
            .catch(console.log);

    };
    client.commands.set(command.name, command);

    console.log('Ready!');
});

client.on('message', message => {
    if (message.author.bot) { return; }
    if (message.channel.type === "dm") {
        console.log(`\n${message.author.username}: ${message.content}\n`);
        return;
    }
    if (message.channel.type !== "text") { return; }
    if (!message.content.startsWith(prefix)) { return; }

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    /******************/
    /* REACT COMMANDS */
    /******************/

    if (commandName === "r") {
        if (args.length !== 1) { return; }
        if (message.channel.type !== "text") { return; }

        const emote = args[0].toLowerCase();

        if (!client.emotes.has(emote)) { return; }

        const channel = message.channel;
        const user = message.author.username;
        const messages = message.channel.messages.last(2);

        if (messages.length < 2) {
            console.log("Message too old to add reaction!");
            return;
        }

        messages[0].react(client.emotes.get(emote))
            .then(console.log(`${user} reacted with ${emote}`))
            .catch();


        message.delete().catch(console.log("Error deleting command message!"));

        return;
    }

    const command = client.commands.get(commandName);
    if (!command) { return; }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            message.reply(`please wait ${cooldownAmount / 1000}s between commands.`);
            return;
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (e) {
        console.log(e);
        message.reply('An error occurred running the command!');
    }
});

/******************************/
/* CUSTOM REACTION CONTROLLER */
/******************************/

const reactionControls = new Discord.Collection();

const roleGrandChase = { name: "GrandChase", id: "583625266333745154" };
const roleFFXIV = { name: "FFXIV", id: "583625154064810015"};
const rolePotato = { name: "Potato", id: "584139153130651765"};
const roleEdgelord = { name: "Edgelord", id: "575741888926187522"};
const roleFabulous = { name: "Fabulous", id: "584286913645510656"};

reactionControls.set("AltairQt", roleGrandChase);
reactionControls.set("FatterCat", roleFFXIV);
reactionControls.set("🥔", rolePotato);
reactionControls.set("SiegEvil", roleEdgelord);
reactionControls.set("SiegFabulous", roleFabulous);

const reactionChannelId = "583634913484472340";

client.on('customReactionAdd', (reaction, guild, user) => {
    console.log(`${user.username} reacted with ${reaction.emoji.name}.`);

    if (reactionControls.has(reaction.emoji.name)) {
        const role = reactionControls.get(reaction.emoji.name);
        const member = guild.members.get(user.id);
        if (!member) { return; }
        member.addRole(role.id);
        console.log(`${role.name} role added to ${user.username}!`);
    }
});

client.on('customReactionRemove', (reaction, guild, user) => {
    console.log(`${user.username} removed their ${reaction.emoji.name} reaction.`);

    if (reactionControls.has(reaction.emoji.name)) {
        const role = reactionControls.get(reaction.emoji.name);
        const member = guild.members.get(user.id);
        if (!member) { return; }
        member.removeRole(role.id);
        console.log(`${role.name} role was removed from ${user.username}.`);
    }
});

const events = {
    MESSAGE_REACTION_ADD: 'customReactionAdd',
    MESSAGE_REACTION_REMOVE: 'customReactionRemove',
};

client.on('raw', async event => {
    // console.log(event);
    if (!events.hasOwnProperty(event.t)) { return; }

    try {
        const { d: data } = event;

        if (data.channel_id !== reactionChannelId) { return; }

        const user = client.users.get(data.user_id);
        const channel = client.channels.get(data.channel_id) || await user.createDM();

        const message = await channel.fetchMessage(data.message_id);

        const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
        const reaction = message.reactions.get(emojiKey);

        const guild = client.guilds.get(data.guild_id);

        client.emit(events[event.t], reaction, guild, user);
    }
    catch (e) {
        console.log(e);
    }
    
});

client.login(token);