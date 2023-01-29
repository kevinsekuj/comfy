import getMediaByGenre from '@controllers/genreController';
import express from 'express';

const router = express.Router();

router.route('/:genreIDs/:page?/:pageNumber?').get(getMediaByGenre());

export default router;
