import { upload } from '../config/multerConfig.js';
import { validateCSV } from '../controllers/validateController.js';
import { updateCSV } from '../controllers/updateController.js';
import express from 'express'
const router = express.Router();

router.post('/validate', upload.single('file'), validateCSV)
router.post('/update', upload.single('file'), updateCSV)

export default router;