import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

import config from './config.mjs';
import Controller from './controllers/controller.mjs';
import Logger from './modules/logger.mjs';

const app = express();
const logger = new Logger();
const controller = new Controller(logger);

app.use(compression());
app.use(morgan('combined'));
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));

app.use('/api', controller.init());

app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`We are live on ${config.host}:${config.port}`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});
