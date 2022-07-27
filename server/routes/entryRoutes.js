import { Router } from 'express';
import { getEntries } from '../controllers/entryControllers.js';

const router = Router();

router.route('/').get(getEntries);

export default router;
