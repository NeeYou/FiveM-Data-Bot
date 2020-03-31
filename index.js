const config = require("./config.json");
const { Client} = require("discord.js");
global.req = require('request');

let players = `http://<ip>:<port>/players.json`;
        const client = new Client({
            disableEveryone: true
        });
    client.on("ready", () => {
        var interval = setInterval (function () {
            req(players, function (err2, response, playersinfo) {
                process.setMaxListeners(0);
                var start = JSON.parse(playersinfo)
                if (start === null || start === []) {
                    var e = 0
                } else {
                    var e = start.length
                }
                if (err1 || err2) { 
                    client.user.setPresence({
                        status: "ONLINE",
                        game: {
                            name: `Status: Offline`,
                        }
                    });                           
                    return;
                } else {
                    client.user.setPresence({
                        status: "ONLINE",
                        game: {
                            name: `${e}/${start.vars.sv_maxClients} graczy`,
                        }
                    });
                }                            
            });
        },1 * 6000); 
    });
    client.login(config.token);
});
