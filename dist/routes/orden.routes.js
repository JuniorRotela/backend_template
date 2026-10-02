"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orden_controllers_1 = require("../controllers/orden.controllers");
const router = (0, express_1.Router)();
router.get("/ordenx/:id", orden_controllers_1.getOneOrden);
router.post("/orden", orden_controllers_1.createOrden);
exports.default = router;
