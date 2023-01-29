import genre from '@routes/genre';
import media from '@routes/media';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/genre', genre);
app.use('/media', media);

export default app;
