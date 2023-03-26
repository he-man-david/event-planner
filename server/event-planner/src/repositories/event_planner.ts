import { Sequelize } from "sequelize";
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../config/env";
import { EVENT_SEQUELIZE_PARAMS } from "../../../db/sequelize/event";
import { EVENT_ATTENDEES_SEQUELIZE_PARAMS } from "../../../db/sequelize/event_attendees";
import { EVENT_COMMENTS_SEQUELIZE_PARAMS } from "../../../db/sequelize/event_comments";
import { EVENT_OPTION_VOTES_SEQUELIZE_PARAMS } from "../../../db/sequelize/event_option_votes";
import { EVENT_OPTIONS_LOOKUP_SEQUELIZE_PARAMS } from "../../../db/sequelize/event_options_lookup";
import { EVENT_OPTIONS_SEQUELIZE_PARAMS } from "../../../db/sequelize/event_options";
import { USER_SEQUELIZE_PARAMS } from "../../../db/sequelize/user";
import { CreateEventRequest } from "../types/event_types";

const sequelizeInstance = new Sequelize({
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: "event_planner",
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
});

const User = sequelizeInstance.define(...USER_SEQUELIZE_PARAMS);
const Event = sequelizeInstance.define(...EVENT_SEQUELIZE_PARAMS);
const EventAttendees = sequelizeInstance.define(
  ...EVENT_ATTENDEES_SEQUELIZE_PARAMS
);
const EventOptionsLookup = sequelizeInstance.define(
  ...EVENT_OPTIONS_LOOKUP_SEQUELIZE_PARAMS
);
const EventOptions = sequelizeInstance.define(
  ...EVENT_OPTIONS_SEQUELIZE_PARAMS
);
const EventOptionVotes = sequelizeInstance.define(
  ...EVENT_OPTION_VOTES_SEQUELIZE_PARAMS
);
const EventComments = sequelizeInstance.define(
  ...EVENT_COMMENTS_SEQUELIZE_PARAMS
);

const getEventDetails = async (id: string) => {
  const result = await Event.findByPk(id);
  return result;
};

const saveNewEventDetails = async (
  newEvent: typeof CreateEventRequest._type
) => {
  const result = await Event.create(newEvent);
  return result;
};

export default {
  getEventDetails,
  saveNewEventDetails,
};
