// import { DataSource, DataSourceOptions } from "typeorm";
// import { User } from "./entities/User";


// export const AppDataSource: DataSourceOptions = {
//   type: "mysql",
//   host: "auth-db1050.hstgr.io",
//   port: 3306,
//   username: "u805022007_root",
//   password: "Foodmix2025$",
//   database: "u805022007_foodmix",
//   entities: [],
//   logging: true,
//   synchronize: true,
// }


// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User"; // importa tus entidades reales

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "auth-db1050.hstgr.io",
  port: 3306,
  username: "u805022007_root",
  password: "Foodmix2025$",
  database: "u805022007_foodmix",
  entities: [], // acá van tus entidades
  logging: true,
  synchronize: true,
});
