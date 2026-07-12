# Render Deployment Setup

## Prerequisites
Before deploying to Render, you'll need:
1. A [Render account](https://render.com) (free)
2. A Discord Bot Token
3. Your Minecraft server details
4. This repository connected to your GitHub account

## Step-by-Step Deployment

### 1. Create Discord Bot Token
- Go to [Discord Developer Portal](https://discord.com/developers/applications)
- Click "New Application"
- Go to "Bot" section and click "Add Bot"
- Copy the token (this is your DISCORD_TOKEN)

### 2. Deploy to Render

**Option A: Using Render Dashboard (Recommended)**
1. Go to [render.com](https://render.com)
2. Click "New +" → "Background Worker"
3. Connect your GitHub repository
4. Fill in the settings:
   - **Name**: `slobos-afk-bot`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

**Option B: Using render.yaml**
Render will auto-detect the Procfile.

### 3. Configure Environment Variables

In the Render dashboard, add these environment variables:

| Variable | Example | Description |
|----------|---------|-------------|
| `DISCORD_TOKEN` | `MzU4Nzk2NTA2OTc0NzQxNzQ4.DkKl1g.xKXLY_` | Your Discord bot token |
| `MC_HOST` | `utsabDutta.aternos.me` | Minecraft server address |
| `MC_PORT` | `59819` | Minecraft server port |
| `MC_USERNAME` | `UtsabAFKBot` | Bot's in-game username |
| `PREFIX` | `!` | Discord command prefix |

### 4. Deploy
Click "Create Web Service" and Render will start deploying!

## Monitoring

View logs in Render dashboard:
- Go to your service
- Click "Logs" tab
- Watch for "Discord client logged in as..." and "Minecraft bot spawned..." messages

## Troubleshooting

**Bot not responding in Discord:**
- Check DISCORD_TOKEN is correct
- Make sure bot has Message Content Intent enabled in Developer Portal
- Verify bot is invited to your Discord server with read/write permissions

**Can't connect to Minecraft server:**
- Verify MC_HOST, MC_PORT, MC_USERNAME are correct
- Check if Aternos server is online
- Ensure the bot account has access to the server

**Render keeps restarting:**
- Check logs for errors
- Verify all required environment variables are set
