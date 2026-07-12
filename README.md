# Slobos AFK / Aternos Bot

This is a simple scaffold for a Discord bot with optional Mineflayer (Minecraft) integration. It listens for Discord messages and accepts a few basic commands:

- `!help` - show available commands
- `!mine` - attempt to find and dig a nearby block (requires a running Mineflayer bot connected to a Minecraft server)
- `!come [player]` - attempt to come to a player (basic placeholder behavior)

This repository contains a minimal working scaffold. Extend the bot with mineflayer-pathfinder for movement, permissions checks, better command parsing, slash commands, etc.

Getting started

1. Create a .env file at the repository root with these variables:

```
DISCORD_TOKEN=your_discord_bot_token
PREFIX=!
MC_HOST=your.minecraft.server.address   # optional
MC_PORT=25565                           # optional
MC_USERNAME=AFKBot                      # optional
MC_VERSION=auto                         # optional
```

2. Install dependencies and run:

```
npm install
npm start
```

Notes and next steps

- This scaffold uses the Discord message-based prefix commands for simplicity. Consider switching to Discord Slash Commands for a better experience.
- To enable safe movement and pathfinding in Minecraft, add `mineflayer-pathfinder` and configure it. The `come` command currently only uses chat to indicate intent and will need pathfinding to actually move the bot.
- Improve authentication and permissions so only authorized Discord users can control the in-game bot.

