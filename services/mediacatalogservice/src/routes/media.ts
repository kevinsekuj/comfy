import getMedia from '@controllers/mediaController';
import express from 'express';

const router = express.Router();

router.route(['/', '/:id']).get(getMedia());

export default router;
