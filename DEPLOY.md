Docker + quick deploy

This branch adds Docker, docker-compose, and a PM2 ecosystem file to make it easy to run the bot on a server or a container host.

Quick start (local)
1. Copy your existing settings.json next to the repository (do NOT commit secrets):
   cp settings.json.example settings.json
   # or create settings.json and fill credentials locally

2. Build and run with Docker Compose:
   docker compose up --build -d

3. Check logs:
   docker compose logs -f

Using PM2 on a VM
1. Install Node.js and PM2 on your server
2. Pull the repo and run:
   npm ci
   pm2 start ecosystem.config.js
   pm2 save

Security notes
- Do NOT commit passwords or tokens. This repo currently contains settings.json — replace any real credentials after rotating them.
- Prefer mounting a local settings.json or using secrets management on your host.

If you want, I can open a Pull Request from this branch when you're ready. I can also update the code to read secrets from environment variables instead of settings.json; tell me if you want that change.
