import express from 'express';

import Transport from '../modules/transport.mjs';
import V1 from './v1/v1.mjs';

class Controller {
    constructor(logger) {
        this.logger = logger;
        this.transport = new Transport(this.logger);
        this.router = express.Router();

        this.init = this.init.bind(this);
        this.versionConfig = [{
            path: '/v1',
            action: V1
        }];
    }

    createRoutes() {
        const params = {
            router: this.router,
            transport: this.transport,
            logger: this.logger
        };

        this.versionConfig.forEach((version) => {
            this.router.use(version.path, version.action(params));
        });
    }

    init() {
        try {
            this.createRoutes();
            this.logger.info('Controller init success');
            return this.router;
        } catch (error) {
            this.logger.error(`Controller init fail, error: ${error.message}`);
            return this.router;
        }
    }
}

export default Controller;
