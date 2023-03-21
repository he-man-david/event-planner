import { DataTypes, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../config/env";

const sequelize = new Sequelize({
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: "event_planner",
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
});

const EventDetails = sequelize.define("EventDetails", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
});

// const Suggestion = sequelize.define("Suggestion", {
//   title: {
//     type: DataTypes.STRING,
//   },
//   content: {
//     type: DataTypes.STRING,
//   },
// });

// const Thread = sequelize.define("Thread", {
//   author: {
//     type: DataTypes.STRING,
//   },
//   content: {
//     type: DataTypes.STRING,
//   },
// });

// Foreign keys are infered since we let sequelize create the IDs for us
// EventDetails.hasMany(Suggestion);
// EventDetails.hasMany(Thread);

export async function getEventDetails(id: string) {
  const result = await EventDetails.findByPk(id);
  return result;
}

export async function saveNewEventDetails(newEvent: {
  title: string;
  description: string;
  author: string;
}) {
  const result = await EventDetails.create(newEvent);
  return result;
}
