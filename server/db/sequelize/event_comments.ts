import { DataTypes, Sequelize } from "sequelize";
import { SequelizeParams } from "..";

export const EVENT_COMMENTS_SEQUELIZE_PARAMS: SequelizeParams = [
  "EventComments",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Event",
        key: "id",
      },
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    content: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["createdAt"],
      },
    ],
  },
];
