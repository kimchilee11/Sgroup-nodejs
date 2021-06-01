import express from 'express'
import { ControllerAuth } from './controller'

const router = express.Router();

router.post('/login', ControllerAuth.login);
router.post('/register', ControllerAuth.register);

export const authRouter = router;
