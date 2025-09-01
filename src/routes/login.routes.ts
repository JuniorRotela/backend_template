// routes/login.routes.ts
import { Router } from 'express';
import { loginController } from '../controllers/login.controllers';
import { loginValidate } from '../validators/login.validation';
import { verifyToken } from '../middleware/auth';
import { getUsers, getOneUser } from '../controllers/user.controllers';
// import { getActivity, getGarden, getOneGarden, createGarden, updateGarden, deleteGarden } from '../controllers/garden.controllers';

const router = Router();

router.post('/login', loginValidate, loginController);
router.get('/user', verifyToken, getUsers);
// router.get('/garden/viewActivity', verifyToken, getActivity);
router.get('/user/:id', verifyToken, getOneUser);
// router.put('/garden/:id', verifyToken, updateGarden);
// router.delete('/garden/:id', verifyToken, deleteGarden);

export default router;
