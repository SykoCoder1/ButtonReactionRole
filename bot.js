const MessageAttachment = require('discord.js');
const fs = require('fs');
const discord = require('discord.js');
-
const Collection = require('discord.js');
const http = require('http');
const moment = require('moment')
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);

//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client({ intents: Discord.Intents.ALL });
require('discord-buttons')(client);
const { MessageButton, MessageActionRow } = require('discord-buttons')
const db = require('syko.db');
require("discord-replys");
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);

 client.user.setActivity(`Reaction Role BOT By SykoCoder`, { type:'WATCHING' })

  console.log("Bot is ready bro.!!")
});

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 5000);

  client.user.setActivity("SykoCoder", {
    type: "STREAMING",
    url: "https://sykocoder.tk" // herhangi bir twitch kanalı
  });
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
client.login(ayarlar.token)


/////SYKOCODER 
client.on("clickButton", async button => {

let member = button.clicker.member;
let veri = db.get(`reactionrole-${button.channel.id}`)
if(!veri) return;
let rol = veri.role
let rol2 = button.guild.roles.cache.get(rol)
let kanal = veri.channel
let mesaj = veri.mesaj
if(button.id === "AddRole-"+kanal) {
  button.reply.send("Başarılı bir şekilde rol verildi.", true)
await member.roles.add(rol2)

}

if(button.id === "RemoveRole-"+kanal) {
  button.reply.send("Başarılı bir şekilde rol alındı.", true)
await member.roles.remove(rol2)

}
})
/////MADE BY SYKOCODER  