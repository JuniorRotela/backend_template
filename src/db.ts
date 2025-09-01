import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/User";

// export const AppDataSource: DataSourceOptions = {
//     type: "mariadb",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "DRACENA2024$",
//     database: "medianera",
//     entities: [],
//     logging:true,
//     synchronize:true,
// }

export const AppDataSource: DataSourceOptions = {
  type: "mysql",
  host: "auth-db1050.hstgr.io",
  port: 3306,
  username: "u805022007_root",
  password: "Foodmix2025$",
  database: "u805022007_foodmix",
  entities: [],
  logging: true,
  synchronize: true,
}



// import { DataSource, DataSourceOptions } from "typeorm";

// export const AppDataSource: DataSourceOptions = {
//     type: "mysql",
//     host: "b8hkgmndxcvqg5nq950q-mysql.services.clever-cloud.com",
//     port: 3306,
//     username: "uq4j4bxhgb3f1ic2",
//     password: "0U1PwzDnfiK2lQycl8Gd",
//     database: "b8hkgmndxcvqg5nq950q",
//     entities: [],
//     logging:true,
//     synchronize:true,
// }