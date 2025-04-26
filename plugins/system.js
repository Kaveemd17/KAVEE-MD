// plugins/system.js
const { cmd, commands } = require('../command');
const config = require('../config');
const os = require('os');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "system",
    desc: "Get system information",
    react: "🖥️",
    category: "main",
    filename: __filename
},
async(kavee, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        // Get system info
        const uptime = runtime(process.uptime());
        const totalRAM = Math.round(os.totalmem() / (1024 * 1024 * 1024) * 100) / 100; // GB
        const freeRAM = Math.round(os.freemem() / (1024 * 1024 * 1024) * 100) / 100; // GB
        const usedRAM = Math.round((totalRAM - freeRAM) * 100) / 100;
        const cpuUsage = os.loadavg()[0];
        const platform = os.platform();
        const nodeVersion = process.version;
        const totalCommands = commands.filter(cmd => !cmd.dontAddCommandList).length;
        
        // Get WhatsApp info
        const { version } = require('@whiskeysockets/baileys');
        
        const systemInfo = `
╭────────────────────╮
│   *SYSTEM INFO*   
╰────────────────────╯

*📱 BOT INFO*
▫️ *Name:* ${config.BOT_NAME}
▫️ *Prefix:* ${config.PREFIX}
▫️ *Mode:* ${config.MODE}
▫️ *Commands:* ${totalCommands}
▫️ *Uptime:* ${uptime}

*💻 SYSTEM INFO*
▫️ *Platform:* ${platform}
▫️ *RAM:* ${usedRAM}GB / ${totalRAM}GB
▫️ *CPU Load:* ${cpuUsage.toFixed(2)}%
▫️ *Node:* ${nodeVersion}
▫️ *Baileys:* ${version}

*👨‍💻 DEVELOPER*
▫️ *Name:* Kavindu
▫️ *Contact:* wa.me/${config.OWNER_NUM}

*👻 MADE BY KAVINDU 👻*
`;

        await kavee.sendMessage(
            from,
            {
                image: {
                    url: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/system.jpg"
                },
                caption: systemInfo
            },
            { quoted: mek }
        );
    } catch(e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
