import { DataTypes } from "sequelize";
import { SequelizeParams } from "..";

export const EVENT_OPTION_VOTES_SEQUELIZE_PARAMS: SequelizeParams = [
  "EventOptionVotes",
  {
    eventOptionId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "EventOptions",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
];
