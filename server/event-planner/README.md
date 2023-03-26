## Local dev
- first build in `../db` folder
- start app with `npm run start-dev`


## Technologies

- sequelize
- zod (used for type guards at runtime)
- stytch

### API

GET /event/:eventId
POST /event 
PUT /event/:eventId

GET /comments/:eventId?offset=0&size=20
POST /comments/:eventId

GET /votes/:eventOptionId
POST /votes/:eventOptionId

GET /user/:userId
POST /user
PUT /user/:userId
