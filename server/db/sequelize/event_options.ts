import { DataTypes, Sequelize } from "sequelize";
import { SequelizeParams } from "..";

export const EVENT_OPTIONS_SEQUELIZE_PARAMS: SequelizeParams = [
  "EventOptions",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkPreview: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
];
