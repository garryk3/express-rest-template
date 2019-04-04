import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import passport from 'passport';
import passportLocal from 'passport-local';
import connectEnsureLogin from 'connect-ensure-login';

import config from './config.mjs';
import Controller from './controllers/controller.mjs';
import Logger from './modules/logger.mjs';
import { findByUsername, findById } from './modules/db.mjs';

const app = express();
const Store = connectRedis(session);
const client = redis.createClient();
const logger = new Logger();
const controller = new Controller(logger);
const { redis: redisConfig, site: siteConfig } = config;
const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
    (username, password, cb) => {
        console.log('@@@@@@@@@');
        findByUsername(username, (err, user) => {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password !== password) { return cb(null, false); }
            return cb(null, user);
        });
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    // eslint-disable-next-line consistent-return
    findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

client.on('error', (err) => {
    logger.error(`[Redis] error: ${err}`);
});

app.use(compression());
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));

app.use(session({
    secret: 'api secret key',
    store: new Store({
        host: redisConfig.host,
        port: redisConfig.port,
        client,
        ttl: redisConfig.ttl
    }),
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log('!!!url: ', req.url);
    next();
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.send('success login');
});

app.get('/logout',
    (req, res) => {
        req.logout();
        res.send('success logout');
});

app.get('/login', (req, res) => {
    res.send('redirect to login!!!');
});


app.get('/test', connectEnsureLogin.ensureLoggedIn('/login'), (req, res) => {
    res.send('test success');
});

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
