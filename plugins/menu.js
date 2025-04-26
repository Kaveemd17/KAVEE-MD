// plugins/menu.js
const { cmd, commands } = require("../command");
const config = require('../config');

cmd(
  {
    pattern: "menu",
    alias: ["getmenu", "help"],
    react: "📋",
    desc: "get cmd list",
    category: "main",
    filename: __filename,
  },
  async (
    kavee,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {    
      const prefix = config.PREFIX;
      
      // Get current time in Sri Lanka
      const time = new Date().toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      // Calculate uptime
      const { runtime } = require('../lib/functions');
      const uptime = runtime(process.uptime());
      
      // Get total commands
      const totalCmds = commands.filter(cmd => !cmd.dontAddCommandList).length;
      
      let menu = {
          main: "",
          download: "",
          group: "",
          owner: "",
          convert: "",
          search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && !commands[i].dontAddCommandList) {
          menu[
            commands[i].category || "misc"
          ] += `    ▫️${prefix}${commands[i].pattern}\n`;
        }
      }

      let madeMenu = `
╭────────────────────╮
│   *KAVEE-MD MENU*   
│    *BOT COMMANDS*   
╰────────────────────╯

👋 *Hello ${pushname}*
⏰ *Time:* ${time}
⚡ *Uptime:* ${uptime}
🧮 *Commands:* ${totalCmds}

╭────────────────────╮
│    *MAIN COMMANDS*
│    ▫️${prefix}alive
│    ▫️${prefix}menu
│    ▫️${prefix}ai <text>
│    ▫️${prefix}system
│    ▫️${prefix}owner
│    ▫️${prefix}pair
╰────────────────────╯

╭────────────────────╮
│    *DOWNLOAD COMMANDS*
│    ▫️${prefix}song <text>
│    ▫️${prefix}video <text>
│    ▫️${prefix}fb <link>
╰────────────────────╯

╭────────────────────╮
│    *GROUP COMMANDS*
${menu.group || "│    (No group commands available)"}
╰────────────────────╯

╭────────────────────╮
│    *OWNER COMMANDS*
│    ▫️${prefix}restart
│    ▫️${prefix}update
╰────────────────────╯

╭────────────────────╮
│    *CONVERT COMMANDS*
│    ▫️${prefix}sticker <reply img>
│    ▫️${prefix}img <reply sticker>
│    ▫️${prefix}tr <lang><text>
│    ▫️${prefix}tts <text>
╰────────────────────╯

╭────────────────────╮
│    *SEARCH COMMANDS*
${menu.search || "│    (No search commands available)"}
╰────────────────────╯

*👻 MADE BY KAVINDU 👻*

*Type ${prefix}help <command>* for detailed info
`;
      await kavee.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20menu.jpg",
          },
          caption: madeMenu,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);

// Add help command for detailed command info
cmd(
  {
    pattern: "help",
    react: "❓",
    desc: "Get detailed command info",
    category: "main",
    filename: __filename,
  },
  async (
    kavee,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      pushname,
      isMe,
      isOwner,
      reply,
    }
  ) => {
    try {
      if (!q) {
        // If no specific command is provided, show the main menu
        return kavee.sendMessage(
          from,
          { text: `*Usage:* ${config.PREFIX}help <command>` },
          { quoted: mek }
        );
      }
      
      // Find the command
      const cmd = commands.find(
        (c) => c.pattern === q.toLowerCase() || (c.alias && c.alias.includes(q.toLowerCase()))
      );
      
      if (!cmd) {
        return reply(`*Command '${q}' not found!*\nUse ${config.PREFIX}menu to see available commands.`);
      }
      
      // Format detailed help message
      const helpText = `
╭────────────────────╮
│   *COMMAND DETAILS*   
╰────────────────────╯

*📌 Command:* ${config.PREFIX}${cmd.pattern}
*📝 Description:* ${cmd.desc || "No description"}
${cmd.alias ? `*🔄 Aliases:* ${cmd.alias.map(a => config.PREFIX + a).join(", ")}` : ""}
*🏷️ Category:* ${cmd.category || "misc"}
*👤 Owner Only:* ${cmd.fromMe ? "Yes" : "No"}

*📋 Usage Example:*
${config.PREFIX}${cmd.pattern} ${cmd.usage || ""}

*👻 MADE BY KAVINDU 👻*
`;
      
      await kavee.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/help.jpg",
          },
          caption: helpText,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);
