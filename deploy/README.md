# Deploying skillslash.com to an EC2 instance

One script brings up everything: Docker, a Postgres container, the app
container, nginx as the public reverse proxy, and a Let's Encrypt SSL
certificate — then runs the schema migration and seeds one admin login.

## Before you run it

1. **DNS**: point `skillslash.com` and `www.skillslash.com` A records at the
   EC2 instance's public IP. Certbot's HTTP-01 challenge (and the final
   redirect) need this to already resolve — do it first, DNS can take a
   while to propagate.
2. **Instance**: Ubuntu 22.04 or 24.04, a security group open on 22 (SSH),
   80 and 443. `t3.small` (2GB RAM) is a reasonable minimum — Postgres and
   the Next.js server both want headroom.
3. **Checkout**: clone this repo onto the instance, e.g. to `/opt/skillslash`.

## Run it

```bash
cd /opt/skillslash
sudo -E \
  DOMAIN=skillslash.com \
  LETSENCRYPT_EMAIL=you@skillslash.com \
  ADMIN_EMAIL=admin@skillslash.com \
  ADMIN_PASSWORD='pick a real 10+ character password here' \
  ./deploy/ec2-deploy.sh
```

`ADMIN_PASSWORD` is *your* choice — the script never invents one. It's the
password you'll actually use to log into `/admin/login`, so use a real
password manager to generate and store it, the same as any other login.

The script is safe to re-run — every step (apt installs, `docker compose up
-d`, the migration, the admin seed, the certbot request) is idempotent.

## What it does, in order

1. Installs Docker, nginx, certbot, and enables a minimal firewall (22/80/443
   only — Postgres and the app port are never exposed publicly; see
   `docker-compose.yml`, both are bound to `127.0.0.1`).
2. Generates `.env` with a random `POSTGRES_PASSWORD` and `ADMIN_JWT_SECRET`
   (skipped if `.env` already exists, so re-running never rotates secrets
   out from under a live deployment).
3. Installs the pre-SSL nginx vhost (`deploy/nginx/skillslash.conf`).
4. Builds the Docker images and brings up Postgres, waits for it to report
   healthy.
5. Runs `scripts/migrate.js` (schema + category seed) and
   `scripts/create-admin.js` (your admin login) inside a one-off container
   built from the full `builder` stage — the production `web` image is
   deliberately slimmed down and doesn't carry `scripts/` or dev
   dependencies; see the `migrate` service and its comment in
   `docker-compose.yml`.
6. Starts the app container, waits for it to answer on `127.0.0.1:3000`.
7. Requests the Let's Encrypt certificate for both the bare and `www`
   domain, and rewrites the nginx vhost to redirect HTTP → HTTPS. Renewal
   is handled by the `certbot.timer` the certbot package installs — nothing
   further to schedule.

## Deploying new code later

```bash
cd /opt/skillslash
git pull
docker compose build web
docker compose up -d web
# only if this pull added a schema change:
docker compose run --rm migrate node scripts/migrate.js
```

## Rolling back

```bash
git checkout <previous-commit>
docker compose build web && docker compose up -d web
```

The Postgres data volume (`pgdata`) is untouched by a code rollback — only
`docker compose down -v` removes it, and there is no reason to ever run
that command against a live deployment.
