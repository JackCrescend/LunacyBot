const imageOptions = {
  format: "png",
  dynamic: true
}

module.exports = {
  name: "avatar",
  alias: [],
  hidden: false,
  parameters: [],
  info: ``,
  execute(client, message, args) {
    const searchTerm = args[0] ? args[0] : message.author.username.toLowerCase();
    const guildMembers = message.guild.members.cache;

    const member = guildMembers.find(member => member.user.username.toLowerCase().includes(searchTerm));
    
    if (!member) {
      message.reply(`Couldn't find a user ${searchTerm} on the server`);
      return;
    }

    const reply = `**${member.user.username}**`;
    const avatar = member.user.avatarURL(imageOptions);
    message.channel.send(reply, { files: [avatar] });
  }
}