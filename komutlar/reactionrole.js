const Discord = require('discord.js');
const client = new Discord.Client({ intents: Discord.Intents.ALL });
const { MessageButton, MessageActionRow } = require('discord-buttons')
const db = require('syko.db');
require("discord-replys");


exports.run = async (client, message, args) => {

  let role = message.mentions.roles.first()
  let channel = message.mentions.channels.first()
  let mesaj = args.splice(2).join(" ")
  if(!role) {
    const embed = new Discord.MessageEmbed()
    .setTitle("SykoCoder - New System")
    .setColor("BLUE")
    .setDescription("Please tag a role.")
    .setFooter("@SykoCoder - Buttons")
    return message.channel.send(embed)
  }

  if(!channel) {
    const embed = new Discord.MessageEmbed()
    .setTitle("SykoCoder - New System")
    .setColor("BLUE")
    .setDescription("Please tag a channel.")
    .setFooter("@SykoCoder - Buttons")
    return message.channel.send(embed)
  }

  if(!mesaj) {
    const embed = new Discord.MessageEmbed()
    .setTitle("SykoCoder - New System")
    .setColor("BLUE")
    .setDescription("Please enter a message.")
    .setFooter("@SykoCoder - Buttons")
    return message.channel.send(embed)
  }

  let veri = db.get(`reactions`)
  if(!veri) db.set(`reactions`, [])
  db.push(`reactions`, {role: role.id, channel: channel.id, mesaj: mesaj})
  db.set(`reactionrole-${channel.id}`, {role: role.id, channel: channel.id, mesaj: mesaj})

  const embed2 = new Discord.MessageEmbed()
  .setTitle("SykoCoder - New System")
  .setColor("BLUE")
  .setDescription(mesaj)
  .setFooter("@SykoCoder - Buttons")

  const add = new MessageButton()
	.setStyle('green')
	.setLabel('add')
	.setID(`AddRole-${channel.id}`)
  .setEmoji("✔")

  const remove = new MessageButton()
	.setStyle('red')
	.setLabel('remove')
	.setID(`RemoveRole-${channel.id}`)
  .setEmoji("❌")

  const row = new MessageActionRow()
  .addComponent([add, remove])


  return channel.send({component: row, embed: embed2})
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

  exports.help = {
    name: "reactionrole",
    description: "",
    usage: "test"
  };
