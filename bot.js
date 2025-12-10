const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const cors = require('cors');

const DISCORD_USER_ID = ''; // Your Discord user ID here
const BOT_TOKEN = '';   // Your original bot token

const app = express();
app.use(cors()); // Enable CORS so your website can fetch /status

let currentStatus = 'offline';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers
  ]
});

client.on('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
  updateStatus();               // Check status immediately on ready
  setInterval(updateStatus, 10000); // Update status every 10 seconds
});

async function updateStatus() {
  for (const guild of client.guilds.cache.values()) {
    try {
      const member = await guild.members.fetch(DISCORD_USER_ID);
      if (!member) continue; // Skip if user not found in this guild
      const presence = member.presence;
      currentStatus = presence?.status || 'offline';
      return; // Stop after finding the user in a guild
    } catch (err) {
      console.error(`Error fetching presence: ${err.message}`);
    }
  }
  currentStatus = 'offline'; // If user not found or error, fallback to offline
}

app.get('/status', (req, res) => {
  res.json({ status: currentStatus });
});

client.login(BOT_TOKEN);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Status server running on http://localhost:${PORT}`);
});

