const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "HEh2QAgb#uheR_6eDhdDdQlieNIqcogeBwGM0BbAfzAP0nl1IJIo",
  OWNER_NUM: process.env.OWNER_NUM || "94741839074",
};
