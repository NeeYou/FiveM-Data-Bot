const { Client, RichEmbed } = require("discord.js");
const config = require("./config.json")
const request = require("request");
const fs = require("fs");

const client = new Client({
    disableEveryone: true,
    MESSAGE: true,
    CHANNEL: true,
});


client.on("ready", () => {
    console.log(`Logged in account ${client.user.username}`);
})


client.setInterval(async () => {
    client.channels.get(config.channel_status_id).fetchMessage(config.message_status_id).then(m => {
        request(config.fivem_info_url, function (err, response, fiveminfo) {
        request(config.fivem_players_url, function (err1, response, fivemplayers) {
            if (err || err1) {
                const ServerError = new RichEmbed()
                    .setTitle('Players:')
                    .setColor('#DA242F')
                    .addField(`Status:`, `**Offline**`, true)
                    .setTimestamp()
                    .setFooter('NeeY ©',)
                m.edit(ServerError)
                client.user.setPresence({
                    status: "ONLINE",
                    game: {
                        name: `Server offline!`,
                        type: "WATCHING"
                    }
                });
            } else {
                var info = JSON.parse(fiveminfo);
                var players = JSON.parse(fivemplayers);
                if (players.length === 0) {
                    const ServerOnline = new RichEmbed()
                        .setTitle(`Players online: ${players.length}/${info.vars.sv_maxClients} `)
                        .setColor('#00fbff')
                        .setTimestamp()
                        .setFooter('NeeY ©',)
                    m.edit(ServerOnline);
                } else {
                    var nick = "";
                    var id = "";
                    
                    players.forEach(function (element) {
                        nick += `\n${element.name}`
                        id += `\n${element.id}`
                    });
                    const ServerOnline = new RichEmbed()
                        .setTitle(`Players online: ${players.length}/${info.vars.sv_maxClients} `)
                        .setColor('#00fbff')
                        .addField(`ID:`, `${id}`, true)
                        .addField(`Nick:`, `${nick}`, true)
                        .setTimestamp()
                        .setFooter(NeeY ©',)
                    m.edit(ServerOnline);                    
                }
                client.user.setPresence({
                    status: "ONLINE",
                    game: {
                        name: `Online: ${players.length}/${info.vars.sv_maxClients} `,
                        type: "WATCHING"
                    }
                });
            }
        });
        });
    }).catch(error => {
        console.log('\x1b[41m%s\x1b[0m', `Error:\n${error}`);
    });
}, 5 * 1000);

client.login(config.token);

