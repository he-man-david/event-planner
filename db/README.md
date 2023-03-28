## Server - DB

This folder contains a node js package with the DB model and migrations as Sequlize scripts.

### Dev setup

- install dependencies with `npm install`
- build with `npm run build` (note the build generates files that are used by the event-planner repo!)
- setup docker to run scripts against with `docker-compose up -d`
- setup db url in `.env` (already setup to work with docker-compose file)
- view migrations with `npm run db-migrate:dry-run`, migration will be in prisma/migrations
- run migrations with `npm run db-migrate:execute`
