import { Router } from "express";
import { createAprovechamiento } from "../controllers/aprovechamiento.controllers";
import { aprovechamientoValidate } from "../validators/aprovechamiento.validation";

const router = Router()
router.post("/aprovechamiento",aprovechamientoValidate, createAprovechamiento);



export default router;