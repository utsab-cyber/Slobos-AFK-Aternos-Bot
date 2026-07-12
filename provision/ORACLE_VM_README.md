Oracle Always Free VM provision script (example)

This script is intended to be run locally after you create an Oracle Cloud Compute instance using the `cloud-init.yaml` as `user-data`.

Usage (after creating the instance and SSHing in):

1. SSH to your VM (replace <IP> with your instance's public IP):
   ssh ubuntu@<IP>

2. Verify Docker containers are running:
   docker ps

3. Inspect logs for the afk-bot service:
   docker compose -f /home/ubuntu/afk-bot/docker-compose.yml logs -f

4. If you need to update settings.json, edit /home/ubuntu/settings.json and restart the container:
   nano /home/ubuntu/settings.json
   docker compose -f /home/ubuntu/afk-bot/docker-compose.yml restart

Security recommendations
- Rotate the password(s) you placed in settings.json after first run.
- Lock down SSH access (use key pairs, disable password auth) and configure a firewall to limit access.
