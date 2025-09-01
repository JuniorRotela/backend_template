import { Router } from "express";
import { getScrapedData} from "../controllers/webscp.controllers";
// import { gruposValidate } from "../validators/grupos.validation";


const router = Router()
// router.post("/grupos",gruposValidate, createGrupos);
router.get("/web", getScrapedData);
// router.get("/garden/viewActivity", getActivity);
// router.get("/grupos/:id", getOneGrupos);
// router.put("/grupos/:id", gruposValidate, updateGrupos);
// router.delete("/garden/:id", deleteGarden);


export default router;