"use strict";
// import { DataSource, DataSourceOptions } from "typeorm";
// import { User } from "./entities/User";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User"); // importa tus entidades reales
const StockProduct_1 = require("./entities/StockProduct");
const StockPurchase_1 = require("./entities/StockPurchase");
const StockPurchaseItem_1 = require("./entities/StockPurchaseItem");
const DishRecipe_1 = require("./entities/DishRecipe");
const StockMovement_1 = require("./entities/StockMovement");
const StockLoss_1 = require("./entities/StockLoss");
const Expense_1 = require("./entities/Expense");
const ExtraIncome_1 = require("./entities/ExtraIncome");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "auth-db1050.hstgr.io",
    port: 3306,
    username: "u805022007_root",
    password: "Foodmix2025$",
    database: "u805022007_foodmix",
    entities: [User_1.User, StockProduct_1.StockProduct, StockPurchase_1.StockPurchase, StockPurchaseItem_1.StockPurchaseItem, DishRecipe_1.DishRecipe, StockMovement_1.StockMovement, StockLoss_1.StockLoss, Expense_1.Expense, ExtraIncome_1.ExtraIncome], // acá van tus entidades
    logging: true,
    synchronize: true,
});
