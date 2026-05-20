import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import pagesRouter from './routes/pages.js';
import contactRouter from './routes/contact.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));

app.use('/', pagesRouter);
app.use('/contact', contactRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
