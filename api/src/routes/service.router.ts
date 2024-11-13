import express from 'express';
import * as controller from '#controllers/service.controller';
import { validateData } from '#middleware/validateData';
import { newRecordSchema, recordUpdateSchema } from '#schemas/recordSchemas';

const router = express.Router();

router.get('/', controller.getRecords);
router.get('/summary', controller.getRecordsSummary);
router.post('/', validateData(newRecordSchema), controller.createRecord);
router.put('/:id', validateData(recordUpdateSchema), controller.updateRecord);
router.get('/:id', controller.getRecordById);
router.delete('/:id', controller.deleteRecord);

export default router;
