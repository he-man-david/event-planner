import { DataTypes } from "sequelize";
import { SequelizeParams } from "..";

export const EVENT_OPTIONS_LOOKUP_SEQUELIZE_PARAMS: SequelizeParams = [
  "EventOptionsLookup",
  {
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Event",
        key: "id",
      },
    },
    eventOptionId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "EventOptions",
        key: "id",
      },
    },
  },
];
