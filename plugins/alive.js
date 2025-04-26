const {cmd , commands} = require('../command')
const config = require('../config');

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    react: "👋",
    category: "main",
    filename: __filename
},
async(kavee, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
        return await kavee.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: config.ALIVE_MSG},{quoted: mek})
    }catch(e){
        console.log(e)
        reply(`${e}`)
    }
})
