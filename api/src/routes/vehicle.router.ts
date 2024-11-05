import express from 'express';
import * as controller from '#controllers/vehicle.controller';
import { validateData } from '#middleware/validateData';
import { vehicleUpdateSchema, newVehicleSchema } from '#schemas/vehicleSchemas';

const router = express.Router();

router.get('/', controller.getVehicles);
router.get('/:id', controller.getVehicleById);
router.post('/', validateData(newVehicleSchema), controller.createVehicle);
router.put('/:id', validateData(vehicleUpdateSchema), controller.updateVehicle);
router.delete('/:id', controller.deleteVehicle);

export default router;
