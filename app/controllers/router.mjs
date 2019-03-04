import express from 'express';

import Logger from '../modules/logger.mjs';
import Transport from '../modules/transport.mjs';

import V1 from './v1/index.mjs';

const ExpressRouter = express.Router;

class Router extends ExpressRouter {
    constructor(...args) {
        super(args);

        this.logger = new Logger();
        this.transport = new Transport(this.transport);
    }

    init() {
        this.use(V1(this.route, this.transport, this.logger));
    }
}

export default Router;
