## Local dev

- build package with `npm run build`
- start DB with `docker-compose up -d`
- migrate DB with `npm run db-migrate:execute`
- start app with `npm run dev:start-proxy`

## Technologies

- prisma
- zod (used for type guards at runtime)
- stytch

### API

POST /create-event

GET /events/:eventId
PUT /events <= {eventId}

GET /comments/:eventId?offset=0&size=20
POST /comments <= {eventId, ...comment stuff}

GET /attendees/:eventId?offset=0&size=20
POST /attendees <= {eventId, userId}
DELETE /attendees <= {eventId, userId[]}

GET /options/:eventId?offset=0&size=20
POST /options <= {}
PUT /options/:eventOptionsId <= {}
DELETE /options <= {eventOptionId}

GET /votes/:eventOptionId
POST /votes <= {eventOtionId, userId}
