import getWeatherData from '@controllers/weatherController';
import express from 'express';

const router = express.Router();

router.route('/').get(getWeatherData());

export default router;
