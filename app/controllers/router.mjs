import express from 'express';

const ExpressRouter = express.Router;

class Router extends ExpressRouter {
    constructor(logger) {
        super();

        this.logger = logger;
    }

    static errorHandler() {
        // eslint-disable-next-line no-console
        console.log('error');
    }
}

export default Router;
