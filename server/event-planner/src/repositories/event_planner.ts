import { Sequelize } from "sequelize";
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../config/env";
import { EVENT_SEQUELIZE_PARAMS } from "../../../db/sequelize/event";
import { EVENT_ATTENDEES_SEQUELIZE_PARAMS } from "../../../db/sequelize/event_attendees";
import { EVENT_COMMENTS_SEQUELIZE_PARAMS } from "../../../db/sequelize/event_comments";
import { EVENT_OPTION_VOTES_SEQUELIZE_PARAMS } from "../../../db/sequelize/event_option_votes";
import { EVENT_OPTION_DETAILS_SEQUELIZE_PARAMS } from "../../../db/sequelize/event_option_details";
import { EVENT_OPTIONS_SEQUELIZE_PARAMS } from "../../../db/sequelize/event_options";
import { USER_SEQUELIZE_PARAMS } from "../../../db/sequelize/user";

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
const EventOptionsDetails = sequelizeInstance.define(
  ...EVENT_OPTION_DETAILS_SEQUELIZE_PARAMS
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

// Assosiation. These shouldn't need to be defined since we defined them in the Sequelize module.
// Keeping them commented for now if we need to refer to it later

// Event.hasMany(EventOption, { foreignKey: "eventId" });
// EventOption.belongsTo(Event);

// EventOption.hasMany(EventOptionVotes, { foreignKey: "eventId" });
// EventOptionVotes.belongsTo(EventOption);

// Event.belongsToMany(User, { through: "EventAttendees" });
// User.belongsToMany(Event, { through: "EventAttendees" });

// Event.hasMany(EventComments, { foreignKey: "eventId" });
// EventComments.belongsTo(Event);

// User.hasMany(EventComments, { foreignKey: "userId" });
// EventComments.belongsTo(User);

async function getEventDetails(id: string) {
  const result = await Event.findByPk(id);
  return result;
}

async function saveNewEventDetails(newEvent: {
  title: string;
  description: string;
  author: string;
}) {
  const result = await Event.create(newEvent);
  return result;
}

export default {
  getEventDetails,
  saveNewEventDetails,
};
