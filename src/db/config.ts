import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import { OrderLines, Order } from "../models";
import * as dotenv from "dotenv";
dotenv.config();

const database: string | undefined = process.env.DB_NAME as string;
const username: string | undefined = process.env.DB_USER;
const host: string | undefined = process.env.DB_HOST;
const dialect: Dialect | undefined = process.env.DB_DRIVER as Dialect;
const password: string | undefined = process.env.DB_PWD as string;

const sequelizeConnection = new Sequelize({
  dialect,
  host,
  username,
  password,
  database,
  models: [OrderLines, Order],
  // modelPaths: ["../models"],
});

export default sequelizeConnection;
