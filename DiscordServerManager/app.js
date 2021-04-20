const Discord = require("discord.js");
const config = require("./config.json");
const commands = require("./Commands.json");
const { spawn } = require("child_process");


const client = new Discord.Client();

const prefix = "!";
var runningServers = {};

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");

    if (args.includes("start")) {
        commands.games.forEach(function (game) {
            if (args.includes(game.name)) {

                if (game.name in runningServers) {
                    message.reply(game.name + " already running");
                }
                else {
                    runningServers[game.name] = spawn(game.startup, { shell: true });

                    runningServers[game.name].stdout.on('data', (data) => {
                        console.log(`stdout: ${data}`);
                    });

                    runningServers[game.name].stderr.on('data', (data) => {
                        console.error(`stderr: ${data}`);
                    });

                    runningServers[game.name].on('close', (code) => {
                        console.log(`child process exited with code ${code}`);
                    });


                    message.reply(game.name + " has been started");
                }
            }
        });
    }

    else if (args.includes("stop")) {
        commands.games.forEach(function (game) {
            if (args.includes(game.name) && game.name in runningServers) {
                spawn("taskkill", ["/pid", runningServers[game.name].pid, '/f', '/t']);
                message.reply(game.name + " has been stopped");
            }
        });
    }

});

client.login(config.BOT_TOKEN);