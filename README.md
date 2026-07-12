# Slobos AFK / Aternos Bot

This is a Discord + Mineflayer bot scaffold for Slobos AFK / Aternos automation. It listens for Discord messages and accepts basic commands.

## Commands

- `!help` - show available commands
- `!mine` - attempt to find and dig a nearby block (requires a running Mineflayer bot connected to a Minecraft server)
- `!come [player]` - attempt to come to a player (basic placeholder behavior)

## Quick Start - Local Development

1. Clone the repository:
```bash
git clone https://github.com/utsab-cyber/Slobos-AFK-Aternos-Bot.git
cd Slobos-AFK-Aternos-Bot
```

2. Create a `.env` file at the repository root:
```bash
cp .env.example .env
```

3. Edit `.env` with your settings:
```
DISCORD_TOKEN=your_discord_bot_token
PREFIX=!
MC_HOST=your.minecraft.server.address
MC_PORT=25565
MC_USERNAME=AFKBot
MC_VERSION=auto
```

4. Install dependencies and run:
```bash
npm install
npm start
```

## Deploy to Render (Free Hosting)

For step-by-step deployment instructions, see [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

**Quick Deploy:**
1. Go to [render.com](https://render.com)
2. Connect this GitHub repository
3. Create a "Background Worker"
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables (see RENDER_DEPLOYMENT.md)
7. Deploy!

## Environment Variables

- **DISCORD_TOKEN** (required) - Your Discord bot token
- **MC_HOST** (optional) - Minecraft server address
- **MC_PORT** (optional) - Minecraft server port (default: 25565)
- **MC_USERNAME** (optional) - Bot's in-game username (default: AFKBot)
- **MC_VERSION** (optional) - Minecraft version (default: auto-detect)
- **PREFIX** (optional) - Discord command prefix (default: !)

## Next Steps

- Add `mineflayer-pathfinder` for proper bot movement
- Implement proper permissions and authentication
- Convert to Discord Slash Commands
- Add more Minecraft automation features
- Configure auto-reconnection on failures

## License

MIT

## Support

For issues or questions, check the [GitHub Issues](https://github.com/utsab-cyber/Slobos-AFK-Aternos-Bot/issues)
