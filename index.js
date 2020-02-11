const config = require("./config.json");
const { Client} = require("discord.js");
global.req = require('request');

let players = `http://178.32.112.175:30120/players.json`;
let info = `http://178.32.112.175:30120/info.json`;
        const client = new Client({
            disableEveryone: true
        });
    client.on("ready", () => {
        var interval = setInterval (function () {
            req(info, function (err1, response, infoj) {
            req(players, function (err2, response, playersj) {
                process.setMaxListeners(0);
                var start = JSON.parse(infoj)
                var start2 = JSON.parse(playersj)
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
                            name: `${e}/${start2.vars.sv_maxClients} graczy`,
                        }
                    });
                }                            
            });
        },1 * 6000); 
    });
    client.login(config.token);
});