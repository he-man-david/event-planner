import { ModelAttributes, ModelOptions } from "sequelize";

export type SequelizeParams = [
  string,
  ModelAttributes<any, any>,
  ModelOptions?
]; // maps to sequealize function like this -> tableName, column definitions, table configs
