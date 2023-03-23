import { DataTypes, Sequelize } from "sequelize";
import { SequelizeParams } from "..";

export const EVENT_SEQUELIZE_PARAMS: SequelizeParams = [
  "Event",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    eventStart: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
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
