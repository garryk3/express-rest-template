import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import config from './config.mjs';
import Router from './controllers/router.mjs';

const app = express();
const router = new Router();

app.use(morgan('combined'));
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use(router);

app.get('/', (req, res) => {
    res.send('success');
});

app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`We are live on ${config.host}:${config.port}`);
});
