// routes/login.routes.ts
import { Router } from 'express';

import { loginValidate } from '../validators/login.validation';
import { loginController } from '../controllers/login.controllers';

const router = Router();

router.post('/login', loginValidate, loginController);

export default router;