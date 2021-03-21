const Discord = require("discord.js");
const config = require("./config.json");
const commands = require("./Command.json");


const client = new Discord.Client();

const prefix = "!";

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
});

client.login(config.BOT_TOKEN);