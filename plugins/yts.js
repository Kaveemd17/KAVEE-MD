const { cmd, commands } = require("../command");
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const { getBuffer } = require("../lib/functions");

cmd(
  {
    pattern: "yts",
    alias: ["ytsearch"],
    react: "🔍",
    desc: "YouTube Search and Download",
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
      // If the query contains numbers, it's a download request
      if (/^\d+\s+\d+$/.test(q)) {
        // Format: "index downloadType"
        const [videoIndex, downloadType] = q.split(" ").map(Number);
        
        // Check if results exist in user session
        if (!global.ytSearchResults || !global.ytSearchResults[sender] || 
            !global.ytSearchResults[sender][videoIndex-1]) {
          return reply("❌ No search results found or invalid index. Please search first using .yts keyword");
        }
        
        const selectedVideo = global.ytSearchResults[sender][videoIndex-1];
        
        // Process download based on download type
        return await handleDownload(kavee, mek, from, reply, selectedVideo, downloadType);
      } 
      
      // If no input, show usage instructions
      if (!q) {
        return reply(`
*🎬 YouTube Search Usage:*

1️⃣ *Search:* 
   .yts your search query

2️⃣ *Download:* 
   .yts index downloadType

*Download Types:*
🎵 *Audio Options:*
   1 - Audio (mp3)
   2 - Document (mp3)

🎞️ *Video Options:*
   3 - 240p
   4 - 360p
   5 - 720p

*Example:*
Search: .yts Alan Walker Faded
Download: .yts 1 2 (downloads first result as document)
        `);
      }
      
      // Perform YouTube search
      reply(`🔍 *Searching for:* ${q}`);
      
      const results = await yts(q);
      if (!results.videos || results.videos.length === 0) {
        return reply("❌ No results found");
      }
      
      // Store results for this user
      if (!global.ytSearchResults) global.ytSearchResults = {};
      global.ytSearchResults[sender] = results.videos.slice(0, 10);
      
      // Format search results as a list
      let resultText = `*🎬 YouTube Search Results:*\n\n`;
      
      results.videos.slice(0, 10).forEach((video, index) => {
        resultText += `*${index + 1}.* ${video.title}\n`;
        resultText += `   • *Duration:* ${video.timestamp}\n`;
        resultText += `   • *Views:* ${formatNumber(video.views)}\n`;
        resultText += `   • *Channel:* ${video.author.name}\n`;
        resultText += `   • *URL:* ${video.url}\n\n`;
      });
      
      resultText += `
*📥 To download:*
Use command: .yts index downloadType

*Download Types:*
🎵 *Audio Options:*
1 - Audio (mp3)
2 - Document (mp3)

🎞️ *Video Options:*
3 - 240p
4 - 360p
5 - 720p

*Example:* .yts 1 3 (downloads first video in 240p)`;
      
      // Send results with thumbnail of first video
      await kavee.sendMessage(
        from,
        {
          image: { url: results.videos[0].thumbnail },
          caption: resultText,
        },
        { quoted: mek }
      );
      
    } catch (error) {
      console.error(error);
      reply(`❌ Error: ${error.message}`);
    }
  }
);

// Helper function to handle different download types
async function handleDownload(kavee, mek, from, reply, video, downloadType) {
  try {
    // Check if the video exists and is valid
    if (!video || !video.url) {
      return reply("❌ Invalid video selected");
    }
    
    const videoId = video.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Get video info
    const info = await ytdl.getInfo(videoUrl);
    
    reply(`⏳ *Processing:* ${video.title}\n\nPlease wait, this may take a moment...`);
    
    switch (downloadType) {
      case 1: // Audio
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        if (!audioFormats.length) return reply("❌ No audio format available");
        
        await kavee.sendMessage(
          from,
          {
            audio: { url: audioFormats[0].url },
            mimetype: 'audio/mp4',
            ptt: false,
            caption: `🎵 *${video.title}*`,
            contextInfo: {
              externalAdReply: {
                title: video.title,
                body: `Duration: ${video.timestamp}`,
                thumbnail: await getBuffer(video.thumbnail),
                mediaType: 2,
                mediaUrl: video.url
              }
            }
          },
          { quoted: mek }
        );
        break;
        
      case 2: // Document (audio)
        const docAudioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        if (!docAudioFormats.length) return reply("❌ No audio format available");
        
        await kavee.sendMessage(
          from,
          {
            document: { url: docAudioFormats[0].url },
            mimetype: 'audio/mp3',
            fileName: `${video.title}.mp3`,
            caption: `📄 *${video.title}*`
          },
          { quoted: mek }
        );
        break;
        
      case 3: // 240p Video
        const p240Formats = ytdl.filterFormats(info.formats, format => 
          format.qualityLabel === '240p' && format.hasVideo && format.hasAudio
        );
        
        if (!p240Formats.length) return reply("❌ 240p format not available");
        
        await kavee.sendMessage(
          from,
          {
            video: { url: p240Formats[0].url },
            mimetype: 'video/mp4',
            caption: `🎬 *${video.title}* (240p)`
          },
          { quoted: mek }
        );
        break;
        
      case 4: // 360p Video
        const p360Formats = ytdl.filterFormats(info.formats, format => 
          format.qualityLabel === '360p' && format.hasVideo && format.hasAudio
        );
        
        if (!p360Formats.length) return reply("❌ 360p format not available");
        
        await kavee.sendMessage(
          from,
          {
            video: { url: p360Formats[0].url },
            mimetype: 'video/mp4',
            caption: `🎬 *${video.title}* (360p)`
          },
          { quoted: mek }
        );
        break;
        
      case 5: // 720p Video
        const p720Formats = ytdl.filterFormats(info.formats, format => 
          format.qualityLabel === '720p' && format.hasVideo && format.hasAudio
        );
        
        if (!p720Formats.length) return reply("❌ 720p format not available");
        
        await kavee.sendMessage(
          from,
          {
            video: { url: p720Formats[0].url },
            mimetype: 'video/mp4',
            caption: `🎬 *${video.title}* (720p)`
          },
          { quoted: mek }
        );
        break;
        
      default:
        return reply(`
❌ *Invalid download type!*

*Download Types:*
🎵 *Audio Options:*
1 - Audio (mp3)
2 - Document (mp3)

🎞️ *Video Options:*
3 - 240p
4 - 360p
5 - 720p
        `);
    }
    
    return reply("✅ Download completed successfully!");
    
  } catch (error) {
    console.error(error);
    return reply(`❌ Download failed: ${error.message}`);
  }
}

// Helper function to format large numbers
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
