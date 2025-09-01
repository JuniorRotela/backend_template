import { Router } from "express";
import { getOrdenOne, createOrdenProduccion, getOrdenProduccion, getOneOrdenProduccion, updateOrdenProduccion,
         getOrden, getOrdenProduccionView, getSerieOrden, getOrdenProduccionView2, getVerificar, getOneSerie, actualizarReservasHandler,
         getVerificarPVB, getSeriexd, 
         getSerieEtiqueta,
         putNs} from "../controllers/ordenProduccion.controllers";
import { ordenProduccionValidate } from "../validators/ordenProduccion.validation";
import {produccionUpdateSocket} from "../socket/produccionSocket";



const router = Router()
router.post("/ordenProduccion",ordenProduccionValidate ,createOrdenProduccion);
router.get("/ordenProduccion", getOrdenProduccion);
router.get("/serie/:orden", getSeriexd);
router.put("/ordenProduccion/reservas", actualizarReservasHandler);
router.get("/ordenProduccionview", getOrdenProduccionView);
router.get("/ordenProduccionview2", getOrdenProduccionView2);
router.get("/ultimaOrden", getOrden);
router.get("/ordenProduccion/:id", getOneOrdenProduccion);
router.get("/ordenProduccionxd/:orden",getOrdenOne );
router.get("/ordenProduccionSeries/:orden", getSerieOrden);
router.get("/verificarStock/:cod", getVerificar);
router.get("/verificarPvb/:cod", getVerificarPVB);
router.put("/ordenProduccion/:orden", updateOrdenProduccion);
// router.put("/ordenProduccion/:orden", produccionUpdateSocket);
router.get("/getOneChapas/:serie", getOneSerie);
router.get("/getSerieEtiqueta/:serie", getSerieEtiqueta);
router.put("/actualizarNS/:id", putNs);


export default router;
