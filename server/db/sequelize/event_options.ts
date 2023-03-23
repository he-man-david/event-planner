import { DataTypes } from "sequelize";
import { SequelizeParams } from "..";

export const EVENT_OPTIONS_SEQUELIZE_PARAMS: SequelizeParams = [
  "EventOptions",
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
    eventOptionDetailsId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "EventOptionDetails",
        key: "id",
      },
    },
  },
];
