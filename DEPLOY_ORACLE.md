# Oracle Always Free deployment steps (quick)

I recommend Oracle Cloud's Always Free Arm instances if you need a truly always-on, no-cost VM. I can't create the VM for you, but I've added a cloud-init template (cloud-init.yaml) to this branch that you can paste into the "user data" or "custom cloud init" field when creating an instance.

Steps I prepared for you (already in branch deploy/dockerize):
- Dockerfile, docker-compose.yml (app image + mount for settings.json)
- cloud-init.yaml (creates /home/ubuntu/afk-bot, clones the repo, writes /home/ubuntu/settings.json from the template, and runs docker compose up)
- ORACLE_VM_README.md with post-provision instructions

What you need to do now:
1. Create an Oracle Cloud account (requires verification).
2. Create a Compute instance (ARM) and paste the contents of cloud-init.yaml into the "user data" or "custom cloud-init" field. IMPORTANT: Edit the settings.json content in cloud-init.yaml before launching—replace placeholders with your real credentials.
3. Wait for the instance to boot. SSH into it and check docker compose logs.

If you prefer, I can also add a small helper script that will create a systemd unit or use PM2 instead of Docker; tell me which you'd prefer.
