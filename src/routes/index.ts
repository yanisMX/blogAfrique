import { Router } from 'express';
import AfricaRoute from './africa.route';
import AuthRoute from './auth.route';
import UserRoute from './user.route';

const router = Router();

router.use('/v1/blogAfrica', AfricaRoute);
router.use('/v1/user', UserRoute);
router.use('/v1/auth', AuthRoute);


export default router;