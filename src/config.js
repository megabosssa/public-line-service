// src/config.js
require('dotenv').config();

module.exports = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  port: process.env.PORT || 3000,
};
