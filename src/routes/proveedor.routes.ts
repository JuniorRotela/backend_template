import { Router } from "express";
import { createProveedor, getProveedor, getOneProveedor, updateProveedor } from "../controllers/proveedor.controllers";
import { proveedorValidate } from "../validators/proveedor.validation";


const router = Router()
router.post("/proveedor", proveedorValidate, createProveedor);
router.get("/proveedor", getProveedor);
// router.get("/garden/viewActivity", getActivity);
router.get("/proveedor/:id", getOneProveedor);
router.put("/proveedor/:id", proveedorValidate, updateProveedor);
// router.delete("/garden/:id", deleteGarden);


export default router;