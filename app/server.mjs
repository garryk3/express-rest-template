import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';

import config from './config.mjs';
import Controller from './controllers/controller.mjs';
import Logger from './modules/logger.mjs';

const app = express();
const Store = connectRedis(session);
const client = redis.createClient();
const logger = new Logger();
const controller = new Controller(logger);
const { redis: redisConfig, site: siteConfig } = config;

app.use(session({
    secret: 'ssshhhhh',
    store: new Store({
        host: redisConfig.host,
        port: redisConfig.port,
        client,
        ttl: redisConfig.ttl
    }),
    saveUninitialized: false,
    resave: false
}));

app.use(compression());
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));

app.use('/api', controller.init());

app.listen(siteConfig.port, () => {
    // eslint-disable-next-line no-console
    console.log(`We are live on ${siteConfig.host}:${siteConfig.port}`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});
