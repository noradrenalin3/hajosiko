import express from 'express';
import * as controller from '#controllers/car.controller';
import { validateData } from '#middleware/validateData';
import { carUpdateSchema, newCarSchema } from '#schemas/carSchemas';

const router = express.Router();

router.get('/', controller.getCars);
router.get('/:id', controller.getCarById);
router.post('/', validateData(newCarSchema), controller.createCar);
router.put('/:id', validateData(carUpdateSchema), controller.updateCar);
router.delete('/:id', controller.deleteCar);

export default router;
