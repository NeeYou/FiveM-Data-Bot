const { Client, MessageEmbed } = require('discord.js');
const config = require('./config.json')
const request = require('request');

const client = new Client({
    disableEveryone: true,
    MESSAGE: true,
    CHANNEL: true,
});


client.on("ready", () => {
    console.log(`Logged in account ${client.user.username}`);
    client.user.setPresence({
        status: "ONLINE",
        game: {
            name: `Fetching status...`,
            type: "WATCHING",
        }
    });
})


client.on("message", async message => {
    if (!message.guild) return;
    if (!message.content.startsWith('/')) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    
    if (cmd === "send-message") {
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.delete();  
      message.delete();
      message.channel.send('Copy this message id and set is in config!');
    }
})

client.setInterval(async () => {
    if (config.message_status_id === null || config.channel_status_id === null || config.fivem_info_url === null || config.fivem_players_url == null) return;
    if (config.message_status_id === '' || config.channel_status_id === '' || config.fivem_info_url === '' || config.fivem_players_url == '') return;    
    client.channels.cache.get(config.channel_status_id).messages.fetch(config.message_status_id).then(m => {
        request(config.fivem_info_url, function (err, response, fiveminfo) {
        request(config.fivem_players_url, function (err1, response1, fivemplayers) {
            const ServerError = new MessageEmbed()
                .setTitle('Server Status')
                .setColor('#DA242F')
                .setDescription(`**Offline**`)
                .setTimestamp()
                .setFooter('NeeY ©',)
            let offline_presence = client.user.setPresence({status: "ONLINE", game: { name: `Server offline!`, type: "WATCHING",} });
            if (response === undefined || response1 === undefined) {
                m.edit(ServerError).catch(error => console.log(error));
                offline_presence
                console.log(1)
                return
            }
            if (err || err1) {
                m.edit(ServerError)
                offline_presence
                console.log(2)
                return
            } else {
                console.log(3)
                var info = JSON.parse(fiveminfo);
                var players = JSON.parse(fivemplayers);
                if (players.length === 0) {
                    const ServerOnline = new MessageEmbed()
                        .setTitle(`Players online: ${players.length}/${info.vars.sv_maxClients} `)
                        .setColor('#00fbff')
                        .setTimestamp()
                        .setFooter('NeeY ©',)
                    m.edit(ServerOnline).catch(error => console.log(error));
                } else {
                    var nick = "";
                    var id = "";
                    
                    players.forEach(function (element) {
                        nick += `\n${element.name}`
                        id += `\n${element.id}`
                    });
                    const ServerOnline = new MessageEmbed()
                        .setTitle(`Players online: ${players.length}/${info.vars.sv_maxClients} `)
                        .setColor('#00fbff')
                        .addField(`ID:`, `${id}`, true)
                        .addField(`Nick:`, `${nick}`, true)
                        .setTimestamp()
                        .setFooter('NeeY ©',)
                    m.edit(ServerOnline).catch(error => console.log(error));               
                }
                client.user.setPresence({status: "ONLINE", game: { name: `Online: ${players.length}/${info.vars.sv_maxClients}`, type: "WATCHING",} });
            }
        });
        });
    }).catch(error => {
        console.log('\x1b[41m%s\x1b[0m', `Error:\n${error}`);
    });
}, 30 * 1000);

client.login(config.token);

