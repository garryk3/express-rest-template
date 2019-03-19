import express from 'express';
import passportLocal from 'passport-local';

import Transport from '../modules/transport.mjs';
import V1 from './v1/v1.mjs';
//import Auth from './auth/auth.mjs';

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

        //this.router.use('/login', Auth(params));

        this.versionConfig.forEach((version) => {
            this.router.use(version.path, version.action(params));
        });
    }

    init() {
        try {
            this.createRoutes();
            this.logger.info('[controller] init success');
            return this.router;
        } catch (error) {
            this.logger.error(`[controller] init fail, error: ${error.message}`);
            return this.router;
        }
    }
}

export default Controller;
