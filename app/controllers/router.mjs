import express from 'express';

class Router {
    static errorHandler() {
        // eslint-disable-next-line no-console
        console.log('error', this);
    }

    constructor(logger) {
        this.logger = logger;
        this.router = express.Router();
    }

    get instance() {
        return this.router;
    }

    use() {
        return this.router.use;
    }

    routeHandler(path, type, handler) {
        this.router.route(path)[type](handler);
    }
}

export default Router;
