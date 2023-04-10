# EventPlanner

# Backend

nx run backend:dbs
nx run backend:serve

# Webapp

nx run webapp:serve

# db

Generate Types and client code with:
nx run db:generate:schema

Start docker with:
nx run db:docker

Migrate db with:
npm run db:migrate
