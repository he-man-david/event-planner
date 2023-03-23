import { DataTypes, Sequelize } from "sequelize";
import { SequelizeParams } from "..";

export const USER_SEQUELIZE_PARAMS: SequelizeParams = [
  "User",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    profileName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    profileImgUrl: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
];
