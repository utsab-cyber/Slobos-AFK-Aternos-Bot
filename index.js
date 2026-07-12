require('dotenv').config();

const { Client, GatewayIntentBits, Partials } = require('discord.js');
const Mineflayer = require('mineflayer');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PREFIX = process.env.PREFIX || '!';

if (!DISCORD_TOKEN) {
  console.warn('Warning: DISCORD_TOKEN is not set. The Discord part will not run until you set it in .env');
}

// Setup Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel]
});

let mcBot = null;
const MC_HOST = process.env.MC_HOST;
const MC_PORT = parseInt(process.env.MC_PORT || '25565', 10);
const MC_USERNAME = process.env.MC_USERNAME || 'AFKBot';
const MC_VERSION = process.env.MC_VERSION || false; // leave false for auto-detect

if (MC_HOST) {
  console.log(`Attempting to connect to Minecraft server at ${MC_HOST}:${MC_PORT} as ${MC_USERNAME}`);
  try {
    mcBot = Mineflayer.createBot({
      host: MC_HOST,
      port: MC_PORT,
      username: MC_USERNAME,
      version: MC_VERSION
    });

    mcBot.once('spawn', () => {
      console.log('Minecraft bot spawned and ready.');
    });

    mcBot.on('error', (err) => {
      console.error('Mineflayer error:', err);
    });

    mcBot.on('end', () => {
      console.log('Minecraft bot disconnected.');
      mcBot = null;
    });
  } catch (err) {
    console.error('Failed to create mineflayer bot:', err);
    mcBot = null;
  }
} else {
  console.log('MC_HOST not set; Mineflayer integration disabled.');
}

// Basic command handlers
async function handleMineCommand(message, args) {
  if (!mcBot) {
    await message.reply('Minecraft bot is not connected. Set MC_HOST and restart the bot to enable in-game actions.');
    return;
  }

  await message.reply('Received mine command — searching for a nearby block to dig...');

  try {
    // find a block to dig within 6 blocks
    const block = mcBot.findBlock({
      matching: (b) => b && b.name !== 'air',
      maxDistance: 6
    });

    if (!block) {
      await message.reply('No diggable block found within range (6). Move the bot near the target block or increase search distance.');
      return;
    }

    await message.reply(`Found block ${block.name} at ${block.position.x},${block.position.y},${block.position.z} — attempting to dig.`);
    await mcBot.dig(block, true);
    await message.reply('Done digging (or attempted).');
  } catch (err) {
    console.error('Error during mine command:', err);
    await message.reply('An error occurred while trying to dig: ' + String(err));
  }
}

async function handleComeCommand(message, args) {
  if (!mcBot) {
    await message.reply('Minecraft bot is not connected.');
    return;
  }

  // If the command includes a player name, try to come to that player; otherwise come to the message author if a player exists with same name.
  const targetName = args[0] || message.author.username;
  const player = mcBot.players[targetName];

  if (!player || !player.entity) {
    await message.reply(`Player '${targetName}' not found on the server.`);
    return;
  }

  const pos = player.entity.position;
  await message.reply(`Trying to come to ${targetName} at ${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}.`);

  // NOTE: This repository scaffold does not include the pathfinder plugin. To enable proper movement, install and configure mineflayer-pathfinder.
  // For now, we'll just chat that we are coming.
  console.log(`Coming to ${targetName} (requested via Discord).`);
}

client.on('ready', () => {
  console.log(`Discord client logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content) return;

  const text = message.content.trim();
  if (!text.startsWith(PREFIX) && !message.mentions.has(client.user)) return;

  // allow either prefix commands (!mine) or mention-style (@bot mine)
  const withoutPrefix = text.startsWith(PREFIX) ? text.slice(PREFIX.length).trim() : text.replace(/<@!?\d+>/, '').trim();
  const [cmd, ...args] = withoutPrefix.split(/\s+/);
  const command = cmd.toLowerCase();

  if (command === 'help') {
    await message.reply('Commands available: `!help` - show this message, `!mine` - dig a nearby block (requires MC bot), `!come [player]` - attempt to come to a player (basic), more can be implemented.');
    return;
  }

  if (command === 'mine') {
    await handleMineCommand(message, args);
    return;
  }

  if (command === 'come') {
    await handleComeCommand(message, args);
    return;
  }

  // fallback
await message.reply(`Unknown command: ${command}. Try ${PREFIX}help for a list.`);
});

// Start Discord client if token provided
if (DISCORD_TOKEN) {
  client.login(DISCORD_TOKEN).catch((err) => console.error('Failed to login to Discord:', err));
}
