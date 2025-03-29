const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "bIJH0RxK#yBnLBP9ZFRWTy1Y4lQnI5MsBfew6Ruex_GYTbnNjNBg",
  MONGODB: process.env.MONGODB || "mongodb://mongo:tHzGJWpKgjtWjOSWpeWXOTozZBiRWtsn@maglev.proxy.rlwy.net:27598",
  OWNER_NUM: process.env.OWNER_NUM || "94741839074",
};
