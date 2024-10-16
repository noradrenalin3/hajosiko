import express from 'express';
import * as controller from '#controllers/service.controller.js';

const router = express.Router();

router.get('/', controller.getRecords);
router.post('/', controller.createRecord);
router.put('/:id', controller.updateRecord);

router.get('/:id', controller.getRecordById);

export default router;
