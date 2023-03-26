import { Migration } from "sequelize-cli";
import { EVENT_SEQUELIZE_PARAMS } from "../sequelize/event";
import { EVENT_ATTENDEES_SEQUELIZE_PARAMS } from "../sequelize/event_attendees";
import { EVENT_COMMENTS_SEQUELIZE_PARAMS } from "../sequelize/event_comments";
import { EVENT_OPTION_VOTES_SEQUELIZE_PARAMS } from "../sequelize/event_option_votes";
import { EVENT_OPTIONS_SEQUELIZE_PARAMS } from "../sequelize/event_options";
import { EVENT_OPTIONS_LOOKUP_SEQUELIZE_PARAMS } from "../sequelize/event_options_lookup";
import { USER_SEQUELIZE_PARAMS } from "../sequelize/user";
import { SequelizeParams } from "..";

// Note order maters here since tables and relations are created in order
const SEQUELIZE_TABLE_PARAMS: SequelizeParams[] = [
  USER_SEQUELIZE_PARAMS,
  EVENT_SEQUELIZE_PARAMS,
  EVENT_ATTENDEES_SEQUELIZE_PARAMS,
  EVENT_COMMENTS_SEQUELIZE_PARAMS,
  EVENT_OPTIONS_SEQUELIZE_PARAMS,
  EVENT_OPTIONS_LOOKUP_SEQUELIZE_PARAMS,
  EVENT_OPTION_VOTES_SEQUELIZE_PARAMS,
];

export const up: Migration["up"] = async (queryInterface, _) => {
  for (const params of SEQUELIZE_TABLE_PARAMS) {
    console.log("Creating table - " + params[0]);
    await queryInterface.createTable(...params);
  }
};

export const down: Migration["down"] = async (queryInterface, _) => {
  for (const params of SEQUELIZE_TABLE_PARAMS) {
    console.log("Dropping table - " + params[0]);
    await queryInterface.dropTable(params[0]);
  }
};
