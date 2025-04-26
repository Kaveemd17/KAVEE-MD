const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "",
  OWNER_NUM: process.env.OWNER_NUM || "94741839074",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/Kaveemd17/BOT-IMGS/refs/heads/main/4e10a675-5de7-4552-8c31-b5dc1a31ed01.webp",
  ALIVE_MSG: process.env.ALIVE_MSG || "Hello , I am alive now!!\n\n*👻MADE BY KAVEE-MD👻*",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "private",
};
