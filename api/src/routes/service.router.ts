import express from 'express';
import * as controller from '#controllers/service.controller.js';
import { validateData } from '#middleware/validateData.js';
import { newRecordSchema, recordUpdateSchema } from '#schemas/recordSchemas.js';

const router = express.Router();

router.get('/', controller.getRecords);
router.post('/', validateData(newRecordSchema), controller.createRecord);
router.put('/:id', validateData(recordUpdateSchema), controller.updateRecord);
router.get('/:id', controller.getRecordById);

export default router;
