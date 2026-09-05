import { Router } from "express";
import { createOrden, getOneOrden } from "../controllers/orden.controllers";

const router = Router()
router.get("/ordenx/:id", getOneOrden);
router.post("/orden", createOrden);

export default router;