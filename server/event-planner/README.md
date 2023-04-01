## Local dev
- first build in `/db` folder
- start app with `npm run start-dev`


## Technologies

- sequelize
- zod (used for type guards at runtime)
- stytch

### API

POST /create-event

GET /event/:eventId
PUT /event <= {eventId}

GET /comments/:eventId?offset=0&size=20
POST /comments <= {eventId, ...comment stuff}

POST /attendees <= {eventId, userId}
DELETE /attendees <= {eventId, userId[]}

GET /options/:eventOption
POST /options <= {}
PUT /options/:eventOptionsId <= {}
DELETE /options <= {eventOptionId}

GET /votes/:eventOptionId
POST /votes <= {eventOtionId, userId}

GET /user/:userId
POST /user
PUT /user <= {userId, ...user stuff}
