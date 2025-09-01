import { Router } from "express";
// import { createGarden, deleteGarden, getActivity, getGarden, getOneGarden, updateGarden } from "../controllers/garden.controllers";
// import { validateGarden } from "../validators/garnden.validation";
// import { createCategory, getCategory } from "../controllers/category.controllers";
import { userValidate} from "../validators/user.validation";
// import { createBrand, getBrand } from "../controllers/brand.controllers";
import { createUser, getOneUser, getUsers, getUserView, updateUser } from "../controllers/user.controllers";

const router = Router()
router.post("/user", userValidate, createUser);
router.get("/user", getUsers);
 router.get("/viewUser", getUserView);
// router.get("/user/:id", getOneUser);
router.put("/user/:id", updateUser);
// router.delete("/garden/:id", deleteGarden);


export default router;