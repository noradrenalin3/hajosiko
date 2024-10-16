import express from 'express';
import * as controller from '#controllers/car.controller.js';

const router = express.Router();

router.get('/', controller.getCars);
router.get('/:id', controller.getCarById);
router.post('/', controller.createCar);
router.put('/:id', controller.updateCar);

export default router;
