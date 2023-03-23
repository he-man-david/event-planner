import { DataTypes } from "sequelize";
import { SequelizeParams } from "..";

export const EVENT_ATTENDEES_SEQUELIZE_PARAMS: SequelizeParams = [
  "EventAttendees",
  {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      references: {
        model: "User",
        key: "id",
      },
    },
    eventId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      references: {
        model: "Event",
        key: "id",
      },
    },
  },
];
