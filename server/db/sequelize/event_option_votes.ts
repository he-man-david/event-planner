import { DataTypes } from "sequelize";
import { SequelizeParams } from "..";

export const EVENT_OPTION_VOTES_SEQUELIZE_PARAMS: SequelizeParams = [
  "EventOptionVotes",
  {
    eventOptionDetailsId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "EventOptionDetails",
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
