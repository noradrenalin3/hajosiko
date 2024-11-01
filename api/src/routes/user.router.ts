import express from 'express';
import * as controller from '#controllers/user.controller';

const router = express.Router();

router.post('/', controller.createUser);

export default router;
