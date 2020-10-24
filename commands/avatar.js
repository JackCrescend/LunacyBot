module.exports = {
  name: "avatar",
  alias: [],
  hidden: false,
  parameters: [],
  info: ``,
  execute(client, message, args) {
    if (args.length < 1) {
      message.channel.send(message.author.avatarURL("png"));
      return;
    }
    
    const searchTerm = args[0];
    const guildMembers = message.guild.members.cache;

    const member = guildMembers.find(member => member.user.username.toLowerCase().includes(searchTerm));
    
    if (!member) {
      message.reply(`Couldn't find a user ${searchTerm} on the server`);
      return;
    }

    message.channel.send(member.user.avatarURL("png"));
  }
}