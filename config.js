const fs = require("fs");

// Check if dotenv is installed and import it only if config.env exists
if (fs.existsSync("config.env")) {
  try {
    require("dotenv").config({ path: "./config.env" });
  } catch (error) {
    console.error("Error loading dotenv module. Make sure to install it with: npm install dotenv");
  }
}

// Helper function to convert string to boolean
function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "",
  OWNER_NUM: process.env.OWNER_NUM || "94741839074",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/Kaveemd17/BOT-IMGS/refs/heads/main/4e10a675-5de7-4552-8c31-b5dc1a31ed01.webp",
  ALIVE_MSG: process.env.ALIVE_MSG || "Hello , I am alive now!!\n\n*👻MADE BY KAVEE-MD👻*",
  AUTO_READ_STATUS: convertToBool(process.env.AUTO_READ_STATUS, "true"),
  MODE: process.env.MODE || "private",
  BOT_NAME: process.env.BOT_NAME || "KAVEE-MD",
  MONGODB_URI: process.env.MONGODB_URI || "",
  LOG_LEVEL: process.env.LOG_LEVEL || "silent",
  AUTO_TYPING: convertToBool(process.env.AUTO_TYPING, "false"),
  AUTO_RECORDING: convertToBool(process.env.AUTO_RECORDING, "false"),
  ANTI_DELETE: convertToBool(process.env.ANTI_DELETE, "false"),
  ANTILINK: convertToBool(process.env.ANTILINK, "false"),
  ERROR_MESSAGE: convertToBool(process.env.ERROR_MESSAGE, "true"),
};
