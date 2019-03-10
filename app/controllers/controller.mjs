import Transport from '../modules/transport.mjs';
import Router from './router.mjs';

import V1 from './v1/index.mjs';

class Controller {
    constructor(logger) {
        this.logger = logger;
        this.transport = new Transport(this.logger);
        this.router = new Router(this.logger);

        this.init = this.init.bind(this);
        this.versionConfig = [{
            path: '/v1',
            action: V1
        }];
    }

    init() {
        const params = {
            router: this.router,
            transport: this.transport,
            logger: this.logger
        };

        this.versionConfig.forEach((version) => {
            this.router.use(version.path, version.action(params));
        });
        this.logger.info('Controller init success');
        return this.router.instance;
    }
}

export default Controller;
