const { cmd, commands } = require("../command");
const getFbVideoInfo = require("fb-downloader-scrapper");

cmd(
  {
    pattern: "fb",
    alias: ["facebook"],
    react: "#️⃣",
    desc: "Download Facebook Video",
    category: "download",
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
      // Split the input to separate URL and quality code
      const inputParts = q.split(' ');
      const url = inputParts[0];
      const qualityCode = inputParts[1]; // 1.1 for HD, 1.2 for SD

      if (!url) return reply("*Please provide a valid Facebook video URL!* 🌚❤️");

      // Validate the Facebook URL format
      const fbRegex = /(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
      if (!fbRegex.test(url))
        return reply("*Invalid Facebook URL! Please check and try again.* 🌚");

      // Fetch video details
      reply("*Downloading your video...* 🌚❤️");

      const result = await getFbVideoInfo(url);

      if (!result || (!result.sd && !result.hd)) {
        return reply("*Failed to download video. Please try again later.* 🌚");
      }

      const { title, sd, hd } = result;

      // Prepare and send the message with video details
      let desc = `
*❤️ KAVEE-MD FB VIDEO DOWNLOADER ❤️*

👻 *Title*: ${title || "Unknown"}
👻 *Quality*: ${hd ? "HD Available" : "SD Only"}

MADE BY KAVINDU
        `;
      await kavee.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20fb-1.jpg",
          },
          caption: desc,
        },
        { quoted: mek }
      );

      // Send video based on quality code
      if (qualityCode === "1.1" && hd) {
        // Code 1.1 - Download HD video
        await kavee.sendMessage(
          from,
          { video: { url: hd }, caption: "----------HD VIDEO----------" },
          { quoted: mek }
        );
      } else if (qualityCode === "1.2" || !hd) {
        // Code 1.2 - Download SD video, or if HD not available
        await kavee.sendMessage(
          from,
          { video: { url: sd }, caption: "----------SD VIDEO----------" },
          { quoted: mek }
        );
      } else if (!qualityCode) {
        // If no quality code provided, send both if available
        if (hd) {
          await kavee.sendMessage(
            from,
            { video: { url: hd }, caption: "----------HD VIDEO----------" },
            { quoted: mek }
          );
          await kavee.sendMessage(
            from,
            { video: { url: sd }, caption: "----------SD VIDEO----------" },
            { quoted: mek }
          );
        } else if (sd) {
          await kavee.sendMessage(
            from,
            { video: { url: sd }, caption: "----------SD VIDEO----------" },
            { quoted: mek }
          );
        } else {
          return reply("*No downloadable video found!* 🌚");
        }
      } else {
        return reply("*Invalid quality code! Use 1.1 for HD or 1.2 for SD.* 🌚");
      }

      return reply("*Thanks for using my bot* 🌚❤️");
    } catch (e) {
      console.error(e);
      reply(`*Error:* ${e.message || e}`);
    }
  }
);
