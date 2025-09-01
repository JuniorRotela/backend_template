import { Router } from "express";
import { updateDescuento } from "../controllers/descuento.controllers";
import { descuentoValidate } from "../validators/descuento.validation";
import { pvbValidate } from "../validators/pvb.validation";
import { createPvb,getOnePvb,getPvb,createEntradaNotalFiscal, getPvbStock, updatePvb, updatePvbMedida, getOne} from "../controllers/pvb.controllers";
import { entradaNotalFiscalValidate } from "../validators/entradaNotalFiscal.validation";

const router = Router()
router.post("/pvb",pvbValidate, createPvb);
router.post("/notafiscal/pvb", createEntradaNotalFiscal);
router.get("/pvb", getPvb);
router.get("/pvbStock", getPvbStock);
router.get("/pvb/:cod", getOnePvb);
router.get("/stockPvb/:id", getOne);
router.put("/pvb/:id", updatePvb);
router.put("/pvbMedida/:id", updatePvbMedida);

// router.delete("/garden/:id", deleteGarden);


export default router;