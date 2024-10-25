import express from 'express';
import * as controller from '#controllers/car.controller.js';
import { validateData } from '#middleware/validateData.js';
import { carUpdateSchema, newCarSchema } from '#schemas/carSchemas.js';

const router = express.Router();

router.get('/', controller.getCars);
router.get('/:id', controller.getCarById);
router.post('/', validateData(newCarSchema), controller.createCar);
router.put('/:id', validateData(carUpdateSchema), controller.updateCar);
router.delete('/:id', controller.deleteCar);

export default router;
